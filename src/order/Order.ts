import { Coupon } from "./Coupon";
import { Cpf } from "./Cpf";
import { OrderItem } from "./OrderItem";

export class Order {
  public cpf: Cpf;
  public items: OrderItem[];
  public coupon?: Coupon;

  constructor(cpf: Cpf) {
    this.cpf = cpf;
    this.items = [];
  }

  public addItem(item: OrderItem): void {
    this.items.push(item);
  }

  public addCoupon(coupon: Coupon) {
    this.coupon = coupon;
  }

  public getTotal(): number {
    const total = this.items.reduce((prev, curr) => {
      return prev + curr.getTotal();
    }, 0);

    if (!this.coupon) {
      return total;
    }

    return total - (total * this.coupon.discountPercentage) / 100;
  }
}
