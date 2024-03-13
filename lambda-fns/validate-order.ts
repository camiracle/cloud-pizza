import { PineappleNotAllowedMessage, MissingPizzaMessage } from './shared/error-messages';
import { PizzaToppingIngredient as PizzaToppingType } from './shared/types/pizza';
import { PizzaOrder } from './shared/types/pizza-order';
import { OrderStatus, StateMachineResponse } from './shared/types/state-machine-response';

export const handler = async function (request?: PizzaOrder): Promise<StateMachineResponse> {
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

  const result: StateMachineResponse = {
    status: isOrderValid ? OrderStatus.Allowed : OrderStatus.NotAllowed,
    errorMessage,
  };
  return result;
};
