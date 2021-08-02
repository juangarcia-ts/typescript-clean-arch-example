import { deepEqual, instance, mock, verify } from "ts-mockito";
import { MemoryStorage } from "../../../src/common/storage/MemoryStorage";
import { Coupon } from "../../../src/order/Coupon";
import { Cpf } from "../../../src/order/Cpf";
import { Order } from "../../../src/order/Order";
import { PlaceOrderDTO } from "../../../src/order/OrderDto";
import { OrderItem } from "../../../src/order/OrderItem";
import { PlaceOrder } from "../../../src/order/PlaceOrder";

describe("Order", () => {
  const cpf = new Cpf("766.582.760-80");
  const order = new Order(cpf);

  it("should get total with proper discount", () => {
    order.addItem(new OrderItem("Item #1", 1000, 2));
    order.addItem(new OrderItem("Item #2", 300, 3));
    order.addItem(new OrderItem("Item #3", 100, 1));
    order.addCoupon(new Coupon("COUPON10", 10));
    expect(order.getTotal()).toBe(2700);
  });
});
