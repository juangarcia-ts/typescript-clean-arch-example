export interface OrderItemDTO {
  id: string;
  amount: number;
}

export interface PlaceOrderInputDTO {
  cpf: string;
  zipCode: string;
  items: OrderItemDTO[];
  couponName?: string;
}

export interface PlaceOrderOutputDTO {
  shippingCost: number;
  total: number;
}
