import { PizzaState } from './shared/types/pizza-state';

export const handler = async function (request: PizzaState): Promise<PizzaState> {
  // TODO: logic goes here to notify users via email and/or notifications

  console.log('Sending failure notifications');

  return request;
};
