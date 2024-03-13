import { CreateDeliveryOrder } from './shared/services/delivery.service';
import { PizzaOrder } from './shared/types/pizza-order';

export const handler = async function (request: PizzaOrder) {
  return await CreateDeliveryOrder(request);
};
