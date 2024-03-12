import { PizzaOrder } from './pizza-order';

export interface PizzaState extends PizzaOrder {
  isValid: boolean;
  errorMessage: string;
}
