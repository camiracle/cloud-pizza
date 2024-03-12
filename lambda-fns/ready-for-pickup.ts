import { PizzaState } from './shared/types/pizza-state';

export const handler = async function (request: PizzaState): Promise<PizzaState> {
  console.log('send notification: pizza ready for pickup');
  return request;
};
