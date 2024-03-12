import {
  Crust,
  PizzaSize,
  PizzaToppingIngredient,
  PizzaToppingLocation,
} from '../lambda-fns/shared/types/pizza';
import { handler } from '../lambda-fns/request-pizza';
import { NoPineappleMessage, NoPizzaMessage } from '../lambda-fns/shared/error-messages';

test('Say no to pineapple', async () => {
  const request = {
    isDelivery: true,
    userId: 'abc123',
    pizzas: [
      {
        crust: Crust.HandTossed,
        size: PizzaSize.Medium,
        toppings: [
          {
            ingredient: PizzaToppingIngredient.Pineapple,
            location: PizzaToppingLocation.Whole,
          },
          {
            ingredient: PizzaToppingIngredient.Ham,
            location: PizzaToppingLocation.LeftHalf,
          },
        ],
      },
    ],
  };

  const result = await handler(request);
  expect(result.isValid).toBe(false);
  expect(result.errorMessage).toBe(NoPineappleMessage);
});

test('Request is invalid if no pizza', async () => {
  const request = {
    isDelivery: true,
    userId: 'abc123',
  };

  const result = await handler(request);
  expect(result.isValid).toBe(false);
  expect(result.errorMessage).toBe(NoPizzaMessage);
});

test('Pizzas without panapple are good to go', async () => {
  const request = {
    isDelivery: false,
    userId: 'abc123',
    pizzas: [
      {
        crust: Crust.HandTossed,
        size: PizzaSize.Medium,
        toppings: [
          {
            ingredient: PizzaToppingIngredient.Bacon,
            location: PizzaToppingLocation.Whole,
          },
          {
            ingredient: PizzaToppingIngredient.Sausage,
            location: PizzaToppingLocation.Whole,
          },
          {
            ingredient: PizzaToppingIngredient.Mushroom,
            location: PizzaToppingLocation.LeftHalf,
          },
          {
            ingredient: PizzaToppingIngredient.Onions,
            location: PizzaToppingLocation.RightHalf,
          },
        ],
      },
    ],
  };

  const result = await handler(request);
  expect(result.isValid).toBe(true);
  expect(result.errorMessage).toBeUndefined();
});
