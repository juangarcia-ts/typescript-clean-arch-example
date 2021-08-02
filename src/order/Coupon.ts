export class Coupon {
  public name: string;
  public discountPercentage: number;

  constructor(name: string, discountPercentage: number) {
    this.name = name;
    this.discountPercentage = discountPercentage;
  }
}
