export interface PlaceOrderInput {
  cpf: string;
  zipCode: string;
  items: { id: string; amount: number }[];
  couponCode?: string;
}
