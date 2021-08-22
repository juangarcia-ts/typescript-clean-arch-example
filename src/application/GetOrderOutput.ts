export interface GetOrderOutput {
  code: string;
  shippingCost: number;
  total: number;
  orderItems: { description: string; price: number; amount: number }[];
}
