import { PizzaState } from './shared/types/pizza-state';

export const handler = async function (request: PizzaState): Promise<PizzaState> {
  console.log('requested delivery');
  return request;
};
