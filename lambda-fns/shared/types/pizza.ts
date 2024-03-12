// in a real world scenario, I imagine all of these settings would be stored in a database, maybe retrieved from a cache, as opposed to hard-coded.

export interface Pizza {
  size?: PizzaSize;
  toppings?: PizzaTopping[];
  crust?: Crust;
}

export interface PizzaTopping {
  ingredient: PizzaToppingIngredient;
  location?: PizzaToppingLocation;
}

export enum PizzaSize {
  Small = 'small',
  Medium = 'medium',
  Large = 'large',
  XLarge = 'xLarge',
}

export enum PizzaToppingLocation {
  RightHalf = 'rightHalf',
  LeftHalf = 'leftHalf',
  Whole = 'both',
}

export enum Crust {
  Pan = 'pan',
  HandTossed = 'handTossed',
  DeepDish = 'deepDish',
}

export enum PizzaToppingIngredient {
  // Meat
  Bacon = 'bacon',
  Ham = 'ham',
  Pepperoni = 'pepperoni',
  Beef = 'beef',

  // Veggies
  Mushroom = 'mushroom',
  Peppers = 'peppers',
  Olives = 'olives',
  Sausage = 'Sausage',
  Onions = 'Onions',

  // Forbidden fruit
  Pineapple = 'pineapple',
}
