export interface StateMachineResponse {
  driverName?: string;
  timeEstimate?: number;
  status: OrderStatus;
  errorMessage?: string;
}

export enum OrderStatus {
  OutForDelivery = 'out for delivery',
  ReadyForPickup = 'ready for pickup',
  Error = 'error',
  Allowed = 'allowed',
  NotAllowed = 'not allowed',
}
