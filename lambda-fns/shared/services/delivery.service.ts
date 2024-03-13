import { PizzaOrder } from '../types/pizza-order';
import { OrderStatus, StateMachineResponse } from '../types/state-machine-response';

export async function CreateDeliveryOrder(request: PizzaOrder): Promise<StateMachineResponse> {
  // Call delivery functionality. Depending on the system, this could be an API, an sqs queue, or directly altering DynamoDB tables.

  const randomNumber = Math.round(Math.random() * 10);
  if (randomNumber <= 1) {
    throw new Error('The pizza delivery service is down.');
  } else {
    return { driverName: 'Bob', timeEstimate: 900000, status: OrderStatus.OutForDelivery };
  }
}
