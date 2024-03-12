import * as cdk from '@aws-cdk/core';
import lambda = require('@aws-cdk/aws-lambda');
import sfn = require('@aws-cdk/aws-stepfunctions');
import tasks = require('@aws-cdk/aws-stepfunctions-tasks');
import * as logs from '@aws-cdk/aws-logs';

export class StepFunctionStack extends cdk.Stack {
  public readonly stateMachine: sfn.StateMachine; // Expose StateMachine instance

  constructor(scope: cdk.Construct, id: string, props: StepFunctionsStackProps) {
    super(scope, id, props);

    /**
     * Step Function Starts Here
     */

    const validatePizza = new tasks.LambdaInvoke(this, 'Validate pizza order', {
      lambdaFunction: props.validateOrderLambda,
      resultPath: '$.orderValidation',
      payloadResponseOnly: true,
    });

    const makePizza = new tasks.LambdaInvoke(this, 'add pizza to queue', {
      lambdaFunction: props.makePizzaLambda,
      payloadResponseOnly: true,
    }); //.addCatch(sendFailureNotification, { errors: ['States.ALL'] });

    const deliverPizza = new tasks.LambdaInvoke(this, 'request pizza delivery', {
      lambdaFunction: props.requestDeliveryLambda,
      payloadResponseOnly: true,
    }); //.addCatch(sendFailureNotification, { errors: ['States.ALL'] });

    const readyForPickup = new tasks.LambdaInvoke(this, 'ready for pickup', {
      lambdaFunction: props.readyForPickupLambda,
      payloadResponseOnly: true,
    });

    const succeed = new sfn.Succeed(this, 'Pizza success!');

    // Pizza Order failure steps
    const sendFailureNotification = new tasks.LambdaInvoke(this, 'Send failure notification', {
      lambdaFunction: props.handleErrorLambda,
      payloadResponseOnly: true,
    });

    const fail = new sfn.Fail(this, "We Can't make that pizza", {
      cause: 'The pizza request is invalid or not allowed',
      error: 'Failed To Make Pizza',
    });

    //Conditions
    const isOrderValid = sfn.Condition.booleanEquals('$.orderValidation.isOrderValid', true);
    const isDelivery = sfn.Condition.booleanEquals('$.isDelivery', true);

    //Express Step function definition
    const definition = sfn.Chain.start(validatePizza).next(
      new sfn.Choice(this, 'order valid?')
        .when(
          isOrderValid,
          makePizza.next(
            new sfn.Choice(this, 'delivery requested?')
              .when(isDelivery, deliverPizza)
              .otherwise(readyForPickup)
              .afterwards()
              .next(succeed)
          )
        ) // Fail order
        .otherwise(sendFailureNotification.next(fail))
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
