import { PizzaOrder } from './shared/types/pizza-order';
import { OrderStatus, StateMachineResponse } from './shared/types/state-machine-response';

export const handler = async function (request: PizzaOrder): Promise<StateMachineResponse> {
  console.log('send notification: pizza ready for pickup');
  return { status: OrderStatus.ReadyForPickup };
};
