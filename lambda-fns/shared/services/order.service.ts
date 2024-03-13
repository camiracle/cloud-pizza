import { PizzaOrder } from '../types/pizza-order';

export async function CreatePizzaOrder(request: PizzaOrder) {
  // Call pizza creation functionality. Depending on the system, this could be an API, an sqs queue, or directly altering DynamoDB tables.

  console.log(`Initiating pizza request: ${request}`);

  const randomNumber = Math.round(Math.random() * 10);
  if (randomNumber <= 1) {
    throw new Error('The pizza order service is down.');
  } else {
    console.log('started cooking the pizza');
    // cooking pizza. It's fast.
    console.log('finished cooking the pizza');
  }

  return { success: true };
}
