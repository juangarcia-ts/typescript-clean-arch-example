import { Cpf } from "../domain/entity/Cpf";
import { Order } from "../domain/entity/Order";
import { OrderItem } from "../domain/entity/OrderItem";
import { DistanceCalculatorApi } from "../domain/gateway/DistanceCalculatorApi";
import { CouponRepository } from "../domain/repository/CouponRepository";
import { ItemRepository } from "../domain/repository/ItemRepository";
import { OrderRepository } from "../domain/repository/OrderRepository";
import { ShippingCalculator } from "../domain/service/ShippingCalculator";
import { PlaceOrderInputDto, PlaceOrderOutputDto } from "./OrderDto";

const DISTRIBUTION_CENTER_ZIP_CODE = "11111-111"; // Fake

export class PlaceOrder {
  private distanceCalculator: DistanceCalculatorApi;
  private itemRepository: ItemRepository;
  private orderRepository: OrderRepository;
  private couponRepository: CouponRepository;

  constructor(
    distanceCalculator: DistanceCalculatorApi,
    itemRepository: ItemRepository,
    orderRepository: OrderRepository,
    couponRepository: CouponRepository
  ) {
    this.distanceCalculator = distanceCalculator;
    this.itemRepository = itemRepository;
    this.orderRepository = orderRepository;
    this.couponRepository = couponRepository;
  }

  public async execute(
    input: PlaceOrderInputDto
  ): Promise<PlaceOrderOutputDto> {
    const customerCpf = new Cpf(input.cpf);
    const order = new Order(customerCpf);

    for (const orderItem of input.items) {
      const item = await this.itemRepository.findOneById(orderItem.id);

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

    if (input.couponCode) {
      const coupon = await this.couponRepository.findOneByCode(
        input.couponCode
      );

      if (coupon) {
        order.addCoupon(coupon);
      }
    }

    await this.orderRepository.save(order);

    return {
      shippingCost: order.shippingCost,
      total: order.getTotal(),
    };
  }
}
