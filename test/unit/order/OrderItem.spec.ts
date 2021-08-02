import { deepEqual, instance, mock, verify } from "ts-mockito";
import { MemoryStorage } from "../../../src/common/storage/MemoryStorage";
import { Coupon } from "../../../src/order/Coupon";
import { Order } from "../../../src/order/Order";
import { PlaceOrderDTO } from "../../../src/order/OrderDto";
import { OrderItem } from "../../../src/order/OrderItem";
import { PlaceOrder } from "../../../src/order/PlaceOrder";

describe("OrderItem", () => {
  const item = new OrderItem("Description", 750, 3);

  it("should calculate total", () => {
    expect(item.getTotal()).toBe(2250);
  });
});
