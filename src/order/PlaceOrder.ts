import { IStorage } from "../common/storage/IStorage";
import { Coupon } from "./Coupon";
import { Cpf } from "./Cpf";
import { IDistanceCalculator } from "./IDistanceCalculator";
import { Item } from "./Item";
import { Order } from "./Order";
import { PlaceOrderInputDTO, PlaceOrderOutputDTO } from "./OrderDto";
import { OrderItem } from "./OrderItem";
import { ShippingCalculator } from "./ShippingCalculator";

const DISTRIBUTION_CENTER_ZIP_CODE = "11111-111"; // Fake

export class PlaceOrder {
  private distanceCalculator: IDistanceCalculator;
  private itemStorage: IStorage<Item>;
  private orderStorage: IStorage<Order>;
  private couponStorage: IStorage<Coupon>;

  constructor(
    distanceCalculator: IDistanceCalculator,
    itemStorage: IStorage<Item>,
    orderStorage: IStorage<Order>,
    couponStorage: IStorage<Coupon>
  ) {
    this.distanceCalculator = distanceCalculator;
    this.itemStorage = itemStorage;
    this.orderStorage = orderStorage;
    this.couponStorage = couponStorage;
  }

  public execute(input: PlaceOrderInputDTO): PlaceOrderOutputDTO {
    const customerCpf = new Cpf(input.cpf);
    const order = new Order(customerCpf);

    for (const orderItem of input.items) {
      const item = this.itemStorage
        .findAll()
        .find((item) => item.id === orderItem.id);

      if (!item) {
        throw new Error("Item not found");
      }

      order.addItem(new OrderItem(item.id, item.price, orderItem.amount));

      const distance = this.distanceCalculator.calculate(
        input.zipCode,
        DISTRIBUTION_CENTER_ZIP_CODE
      );

      const shippingCost = ShippingCalculator.calculateCost(
        distance,
        item.dimension
      );

      order.shippingCost += shippingCost * orderItem.amount;
    }

    if (input.couponName) {
      const coupon = this.couponStorage
        .findAll()
        .find((coupon) => coupon.name === input.couponName);

      if (coupon) {
        order.addCoupon(coupon);
      }
    }

    this.orderStorage.save(order);

    return {
      shippingCost: order.shippingCost,
      total: order.getTotal(),
    };
  }
}
