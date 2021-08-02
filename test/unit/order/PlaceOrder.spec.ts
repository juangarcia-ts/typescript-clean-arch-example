import { deepEqual, instance, mock, verify } from "ts-mockito";
import { MemoryStorage } from "../../../src/common/storage/MemoryStorage";
import { Coupon } from "../../../src/order/Coupon";
import { Order } from "../../../src/order/Order";
import { PlaceOrderDTO } from "../../../src/order/OrderDto";
import { PlaceOrder } from "../../../src/order/PlaceOrder";

describe("PlaceOrder", () => {
  const orderStorage = new MemoryStorage<Order>();
  const couponStorage = new MemoryStorage<Coupon>();
  const placeOrder = new PlaceOrder(orderStorage, couponStorage);

  const dto: PlaceOrderDTO = {
    cpf: "778.278.412-36",
    items: [{ description: "Sample Item", amount: 2, price: 1000 }],
  };

  afterEach(() => {
    orderStorage.clear();
    couponStorage.clear();
  });

  it("should place a new order and save it to storage", () => {
    placeOrder.execute(dto);
    const orders = orderStorage.findAll();
    expect(orders).toHaveLength(1);
    expect(orders[0].getTotal()).toBe(2000);
  });

  describe("when coupon is not valid", () => {
    it("should not apply any discount", () => {
      const { total } = placeOrder.execute({ ...dto, couponName: "NOT_FOUND" });
      expect(total).toBe(2000);
    });
  });

  describe("when coupon is valid", () => {
    beforeEach(() => {
      couponStorage.save(new Coupon("VALE20", 20));
    });

    it("should apply proper discount", () => {
      const { total } = placeOrder.execute({ ...dto, couponName: "VALE20" });
      expect(total).toBe(1600);
    });
  });
});
