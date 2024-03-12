import { Pizza } from './pizza';

export interface PizzaOrder {
  pizzas?: Pizza[];
  userId?: string;
  isDelivery?: boolean;
}
