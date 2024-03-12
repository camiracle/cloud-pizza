import { CreatePizzaOrder } from './shared/services/order.service';
import { PizzaOrder } from './shared/types/pizza-order';

export const handler = async function (request: PizzaOrder) {
  await CreatePizzaOrder(request);
  return request;
};
