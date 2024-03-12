import * as cdk from '@aws-cdk/core';
import lambda = require('@aws-cdk/aws-lambda');
import sfn = require('@aws-cdk/aws-stepfunctions');
import tasks = require('@aws-cdk/aws-stepfunctions-tasks');

export class StepFunctionStack extends cdk.Stack {
  public readonly stateMachine: sfn.StateMachine; // Expose StateMachine instance

  constructor(scope: cdk.Construct, id: string, props: StepFunctionsStackProps) {
    super(scope, id, props);

    /**
     * Step Function Starts Here
     */

    const validatePizza = new tasks.LambdaInvoke(this, 'validate pizza order', {
      lambdaFunction: props.validateOrderLambda,
      inputPath: '$.pizzaRequest',
      resultPath: '$.pizzaValidity',
      payloadResponseOnly: true,
    });

    const makePizza = new tasks.LambdaInvoke(this, 'Add pizza to queue', {
      lambdaFunction: props.makePizzaLambda,
    });

    const deliverPizza = new tasks.LambdaInvoke(this, 'Request pizza delivery', {
      lambdaFunction: props.requestDeliveryLambda,
    });

    const readyForPickup = new tasks.LambdaInvoke(this, 'Ready for pickup', {
      lambdaFunction: props.readyForPickupLambda,
    });

    const succeed = new sfn.Succeed(this, 'Pizza success!');

    // Pizza Order failure steps
    const sendFailureNotification = new tasks.LambdaInvoke(this, 'Send failure notification', {
      lambdaFunction: props.handleErrorLambda,
      inputPath: '$.pizzaValidity',
      payloadResponseOnly: true,
    });

    const fail = new sfn.Fail(this, "We Can't make that pizza", {
      cause: sfn.JsonPath.stringAt('$.pizzaValidity.errorMessage'),
      error: 'Failed To Make Pizza',
    });

    //Conditions
    const isOrderValid = sfn.Condition.booleanEquals('$.pizzaValidity.isValid', true);
    const isDelivery = sfn.Condition.booleanEquals('$.pizzaRequest.isDelivery', true);

    //Express Step function definition
    const definition = sfn.Chain.start(validatePizza).next(
      new sfn.Choice(this, 'order valid?')
        .when(
          isOrderValid,
          makePizza
            .next(
              new sfn.Choice(this, 'delivery requested?')
                .when(isDelivery, deliverPizza)
                .otherwise(readyForPickup)
            )
            .next(succeed)
        ) // Fail order
        .otherwise(sendFailureNotification.next(fail))
    );

    this.stateMachine = new sfn.StateMachine(this, 'StateMachine', {
      definition,
      timeout: cdk.Duration.minutes(5),
      tracingEnabled: true,
      stateMachineType: sfn.StateMachineType.EXPRESS,
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
