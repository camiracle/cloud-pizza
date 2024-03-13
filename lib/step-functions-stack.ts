import * as cdk from '@aws-cdk/core';
import lambda = require('@aws-cdk/aws-lambda');
import sfn = require('@aws-cdk/aws-stepfunctions');
import tasks = require('@aws-cdk/aws-stepfunctions-tasks');
import * as logs from '@aws-cdk/aws-logs';
import { OrderStatus } from '../lambda-fns/shared/types/state-machine-response';

export class StepFunctionStack extends cdk.Stack {
  public readonly stateMachine: sfn.StateMachine; // Expose StateMachine instance

  constructor(scope: cdk.Construct, id: string, props: StepFunctionsStackProps) {
    super(scope, id, props);

    /**
     * Step Function Starts Here
     */

    const validatePizza = new tasks.LambdaInvoke(this, 'validate pizza order', {
      lambdaFunction: props.validateOrderLambda,
      resultPath: '$.orderResult',
      payloadResponseOnly: true,
    });

    const makePizza = new tasks.LambdaInvoke(this, 'add pizza to queue', {
      lambdaFunction: props.makePizzaLambda,
      payloadResponseOnly: true,
    });

    const deliverPizza = new tasks.LambdaInvoke(this, 'request pizza delivery', {
      lambdaFunction: props.requestDeliveryLambda,
      resultPath: '$.orderResult',
      outputPath: '$.orderResult',
      payloadResponseOnly: true,
    });

    const readyForPickup = new tasks.LambdaInvoke(this, 'ready for pickup', {
      lambdaFunction: props.readyForPickupLambda,
      resultPath: '$.orderResult',
      outputPath: '$.orderResult',
      payloadResponseOnly: true,
    });

    const succeed = new sfn.Succeed(this, 'pizza success!');

    // Pizza Order failure steps
    const fail = new sfn.Fail(this, "we can't make that pizza", {
      cause: "We can't complete your order.",
      error: 'Failed To Make Pizza',
    });

    const sendFailureNotification = new tasks.LambdaInvoke(this, 'send failure notification', {
      lambdaFunction: props.handleErrorLambda,
      resultPath: '$.orderResult',
      outputPath: '$.orderResult',
      payloadResponseOnly: true,
    }).next(fail);

    //Conditions
    const isOrderValid = sfn.Condition.not(
      sfn.Condition.stringEquals('$.orderResult.status', OrderStatus.NotAllowed)
    );
    const isDelivery = sfn.Condition.booleanEquals('$.isDelivery', true);

    //Express Step function definition
    const definition = sfn.Chain.start(validatePizza).next(
      new sfn.Choice(this, 'order valid?')
        .when(
          isOrderValid,
          makePizza
            .addCatch(sendFailureNotification)
            .next(
              new sfn.Choice(this, 'delivery requested?')
                .when(isDelivery, deliverPizza.addCatch(sendFailureNotification))
                .otherwise(readyForPickup)
                .afterwards()
                .next(succeed)
            )
        ) // Fail order
        .otherwise(fail)
    );

    const logGroup = new logs.LogGroup(this, 'PizzaStepFunctionLogGroup');

    this.stateMachine = new sfn.StateMachine(this, 'StateMachine', {
      definition,
      timeout: cdk.Duration.minutes(5),
      tracingEnabled: true,
      stateMachineType: sfn.StateMachineType.EXPRESS,
      logs: {
        destination: logGroup,
        level: sfn.LogLevel.ALL,
        includeExecutionData: true,
      },
    });
  }
}

interface StepFunctionsStackProps extends cdk.StackProps {
  validateOrderLambda: lambda.Function;
  makePizzaLambda: lambda.Function;
  requestDeliveryLambda: lambda.Function;
  readyForPickupLambda: lambda.Function;
  handleErrorLambda: lambda.Function;
}
