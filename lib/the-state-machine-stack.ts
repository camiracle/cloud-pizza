import * as cdk from '@aws-cdk/core';
import { StepFunctionStack } from './step-functions-stack';
import { ApiGatewayStack } from './api-gateway-stack';
import { LambdaStack } from './lambda-stack';

export class TheStateMachineStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const lambdaStack = new LambdaStack(this, 'LambdaStack');
    const stepFunctionStack = new StepFunctionStack(this, 'StepFunctionStack', {
      validateOrderLambda: lambdaStack.validateOrderLambda,
      makePizzaLambda: lambdaStack.makePizzaLambda,
      requestDeliveryLambda: lambdaStack.requestDeliveryLambda,
      readyForPickupLambda: lambdaStack.readyForPickup,
      handleErrorLambda: lambdaStack.handleErrorLambda,
    });
    new ApiGatewayStack(this, 'ApiGatewayStack', {
      stateMachine: stepFunctionStack.stateMachine,
    });
  }
}
