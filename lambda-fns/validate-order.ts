import { NoPineappleMessage, NoPizzaMessage } from './shared/error-messages';
import { Pizza, PizzaToppingIngredient as PizzaToppingType } from './shared/types/pizza';
import { PizzaOrder } from './shared/types/pizza-order';
import { PizzaState } from './shared/types/pizza-state';

export const handler = async function (request?: PizzaOrder): Promise<PizzaState> {
  console.log('Requested Pizza :', JSON.stringify(request, undefined, 2));
  let response = JSON.parse(JSON.stringify(request));
  response.isValid = true;

  const pizzas = request?.pizzas;

  // Validate request
  if (!pizzas || pizzas.length == 0) {
    response.isValid = false;
    response.errorMessage = NoPizzaMessage;
  }
  if (pizzas?.find((p) => p.toppings?.find((t) => t.ingredient === PizzaToppingType.Pineapple))) {
    response.isValid = false;
    response.errorMessage = NoPineappleMessage;
  }

  return response;
};
