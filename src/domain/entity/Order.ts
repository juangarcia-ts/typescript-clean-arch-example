import { Coupon } from "./Coupon";
import { Cpf } from "./Cpf";
import { OrderItem } from "./OrderItem";

export class Order {
  public cpf: Cpf;
  public items: OrderItem[];
  public coupon?: Coupon;
  public shippingCost: number;

  constructor(cpf: Cpf) {
    this.cpf = cpf;
    this.items = [];
    this.shippingCost = 0;
  }

  public addItem(item: OrderItem): void {
    this.items.push(item);
  }

  public addCoupon(coupon: Coupon) {
    if (coupon.isExpired()) {
      throw new Error("Expired coupon");
    }

    this.coupon = coupon;
  }

  public getTotal(): number {
    let total = this.items.reduce((prev, curr) => {
      return prev + curr.getTotal();
    }, 0);

    if (this.coupon) {
      total -= (total * this.coupon.percentage) / 100;
    }

    return total + this.shippingCost;
  }
}
