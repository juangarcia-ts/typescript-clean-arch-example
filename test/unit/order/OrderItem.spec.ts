import { OrderItem } from "../../../src/order/OrderItem";

describe("OrderItem", () => {
  const item = new OrderItem("1", 750, 3);

  it("should calculate total", () => {
    expect(item.getTotal()).toBe(2250);
  });
});
