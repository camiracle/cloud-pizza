import { PizzaOrder } from './shared/types/pizza-order';
import { OrderStatus, StateMachineResponse } from './shared/types/state-machine-response';

export const handler = async function (errorMessage: string): Promise<StateMachineResponse> {
  // TODO: logic goes here to notify users via email and/or notifications

  console.log('Sending failure notifications');

  return { status: OrderStatus.Error };
};
