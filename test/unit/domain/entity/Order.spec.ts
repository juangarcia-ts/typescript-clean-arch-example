import { Coupon } from "../../../../src/domain/entity/Coupon";
import { Cpf } from "../../../../src/domain/entity/Cpf";
import { Order } from "../../../../src/domain/entity/Order";
import { OrderItem } from "../../../../src/domain/entity/OrderItem";

describe("Order", () => {
  const cpf = new Cpf("766.582.760-80");

  it("should get total with proper discount", () => {
    const order = new Order(cpf);
    order.addItem(new OrderItem("1", 1000, 2));
    order.addItem(new OrderItem("2", 300, 3));
    order.addItem(new OrderItem("3", 100, 1));
    order.addCoupon(new Coupon("COUPON10", 10));
    expect(order.getTotal()).toBe(2700);
  });

  describe("when coupon is expired", () => {
    const expiredCoupon = new Coupon("COUPON20", 20, new Date("2020-01-01"));

    it("should throw error and not add discount", () => {
      const order = new Order(cpf);
      order.addItem(new OrderItem("Item", 1000, 1));

      expect(() => order.addCoupon(expiredCoupon)).toThrowError(
        "Expired coupon"
      );
      expect(order.getTotal()).toBe(1000);
    });
  });

  describe("when shipping cost is included", () => {
    const order = new Order(cpf);
    order.addItem(new OrderItem("1", 1000, 3));
    order.addCoupon(new Coupon("COUPON10", 10));
    order.shippingCost = 200;

    it("should calculate total with shipping", () => {
      expect(order.getTotal()).toBe(2900);
    });
  });
});
