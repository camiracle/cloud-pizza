import { PizzaState } from './shared/types/pizza-state';

export const handler = async function (request: PizzaState): Promise<PizzaState> {
  // call async service that creates an order in the pizza queue.

  if (Math.random() * 10 > 5) {
    throw new Error('The pizza order service is down.');
  } else {
    console.log('started cooking the pizza');
    setTimeout(() => {}, 2000);
    console.log('finished cooking the pizza');
  }

  return request;
};
