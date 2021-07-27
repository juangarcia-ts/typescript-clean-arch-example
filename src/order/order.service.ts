import { CpfUtils } from "../common/utils/cpf.utils";
import { Order } from "./order.entity";
import { OrderRepository } from "./order.repository";

export class OrderService {
  private readonly repository: OrderRepository;

  constructor(repository: OrderRepository) {
    this.repository = repository;
  }

  public create(cpf: string, order: Order, discount?: number): void {
    const isCpfValid = CpfUtils.validate(cpf);

    if (!isCpfValid) {
      throw new Error("Invalid CPF");
    }

    const orderToInsert = { ...order };

    if (discount) {
      orderToInsert.price = this.calculatePriceWithDiscount(
        order.price,
        discount
      );
    }

    this.repository.create(orderToInsert);
  }

  private calculatePriceWithDiscount(price: number, discount: number): number {
    return price - (price * discount) / 100;
  }
}
