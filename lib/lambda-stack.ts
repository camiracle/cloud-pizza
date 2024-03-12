import * as cdk from '@aws-cdk/core';
import lambda = require('@aws-cdk/aws-lambda');

export class LambdaStack extends cdk.Stack {
  public readonly validateOrderLambda: lambda.Function;
  public readonly makePizzaLambda: lambda.Function;
  public readonly requestDeliveryLambda: lambda.Function;
  public readonly readyForPickup: lambda.Function;
  public readonly handleErrorLambda: lambda.Function;

  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    /**
     * Lambdas Start Here
     */

    this.validateOrderLambda = new lambda.Function(this, 'validateOrderLambdaHandler', {
      runtime: lambda.Runtime.NODEJS_16_X,
      code: lambda.Code.fromAsset('lambda-fns'),
      handler: 'validate-order.handler',
    });

    this.makePizzaLambda = new lambda.Function(this, 'makePizzaLambdaHandler', {
      runtime: lambda.Runtime.NODEJS_16_X,
      code: lambda.Code.fromAsset('lambda-fns'),
      handler: 'make-pizza.handler',
    });

    this.requestDeliveryLambda = new lambda.Function(this, 'requestDeliveryLambdaHandler', {
      runtime: lambda.Runtime.NODEJS_16_X,
      code: lambda.Code.fromAsset('lambda-fns'),
      handler: 'request-delivery.handler',
    });

    this.readyForPickup = new lambda.Function(this, 'readyForPickupHandler', {
      runtime: lambda.Runtime.NODEJS_16_X,
      code: lambda.Code.fromAsset('lambda-fns'),
      handler: 'ready-for-pickup.handler',
    });

    this.handleErrorLambda = new lambda.Function(this, 'handleErrorLambdaHandler', {
      runtime: lambda.Runtime.NODEJS_16_X,
      code: lambda.Code.fromAsset('lambda-fns'),
      handler: 'handle-error.handler',
    });
  }
}
