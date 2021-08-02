export interface OrderItemDTO {
  description: string;
  price: number;
  amount: number;
}

export interface PlaceOrderDTO {
  cpf: string;
  items: OrderItemDTO[];
  couponName?: string;
}
