export class OrderItem {
  public description: string;
  public price: number;
  public amount: number;

  constructor(description: string, price: number, amount: number) {
    this.description = description;
    this.price = price;
    this.amount = amount;
  }

  public getTotal(): number {
    return this.price * this.amount;
  }
}
