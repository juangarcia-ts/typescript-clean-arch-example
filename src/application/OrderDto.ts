export interface OrderItemDto {
  id: string;
  amount: number;
}

export interface PlaceOrderInputDto {
  cpf: string;
  zipCode: string;
  items: OrderItemDto[];
  couponCode?: string;
}

export interface PlaceOrderOutputDto {
  shippingCost: number;
  total: number;
}
