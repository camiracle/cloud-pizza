import { PineappleNotAllowedMessage, MissingPizzaMessage } from './shared/error-messages';
import { Pizza, PizzaToppingIngredient as PizzaToppingType } from './shared/types/pizza';
import { PizzaOrder } from './shared/types/pizza-order';
import { PizzaState } from './shared/types/pizza-state';

export const handler = async function (request?: PizzaOrder): Promise<ValidateOrderResponse> {
  console.log('Requested Pizza :', JSON.stringify(request, undefined, 2));

  const pizzas = request?.pizzas;
  let isOrderValid = true;
  let errorMessage;

  // Validate request
  if (!pizzas || pizzas.length == 0) {
    isOrderValid = false;
    errorMessage = MissingPizzaMessage;
  }
  if (pizzas?.find((p) => p.toppings?.find((t) => t.ingredient === PizzaToppingType.Pineapple))) {
    isOrderValid = false;
    errorMessage = PineappleNotAllowedMessage;
  }

  const result = { isOrderValid: isOrderValid, errorMessage: errorMessage };
  console.log(result);

  return result;
};

interface ValidateOrderResponse {
  isOrderValid: boolean;
  errorMessage?: string;
}
