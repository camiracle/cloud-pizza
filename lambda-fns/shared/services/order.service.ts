import { PizzaOrder } from '../types/pizza-order';

export async function CreatePizzaOrder(request: PizzaOrder) {
  // this is where I'd have the calls and/or logic to create a pizza order via APIs, sqs, Dynamo, etc (depends on the system)
  console.log(`Initiating pizza request: ${request}`);

  if (Math.random() * 10 > 8) {
    throw new Error('The pizza order service is down.');
  } else {
    console.log('started cooking the pizza');
    setTimeout(() => {}, 2000); // cook pizza. It's fast.
    console.log('finished cooking the pizza');
  }

  return { success: true };
}
