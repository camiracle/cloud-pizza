import { CreateDeliveryOrder, DeliveryOrderResponse } from './shared/services/delivery.service';
import { PizzaOrder } from './shared/types/pizza-order';

export const handler = async function (request: PizzaOrder): Promise<DeliveryOrderResponse> {
  return await CreateDeliveryOrder(request);
};
