import { PizzaOrder } from '../types/pizza-order';

export async function CreateDeliveryOrder(request: PizzaOrder): Promise<DeliveryOrderResponse> {
  // Call delivery functionality. Depending on the system, this could be an API, an sqs queue, or directly altering DynamoDB tables.

  const randomNumber = Math.round(Math.random() * 10);
  if (randomNumber <= 1) {
    throw new Error('The pizza delivery service is down.');
  } else {
    return { driverId: 'driver', timeEstimate: 900000 };
  }
}

export interface DeliveryOrderResponse {
  driverId: string;
  timeEstimate: number;
}
