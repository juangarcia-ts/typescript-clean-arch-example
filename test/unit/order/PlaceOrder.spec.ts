import { MemoryStorage } from "../../../src/common/storage/MemoryStorage";
import { Coupon } from "../../../src/order/Coupon";
import { Dimension } from "../../../src/order/Dimension";
import { FakeDistanceCalculator } from "../../../src/order/FakeDistanceCalculator";
import { Item } from "../../../src/order/Item";
import { Order } from "../../../src/order/Order";
import { PlaceOrderInputDTO } from "../../../src/order/OrderDto";
import { PlaceOrder } from "../../../src/order/PlaceOrder";

describe("PlaceOrder", () => {
  const distanceCalculator = new FakeDistanceCalculator();
  const itemStorage = new MemoryStorage<Item>();
  const orderStorage = new MemoryStorage<Order>();
  const couponStorage = new MemoryStorage<Coupon>();
  const placeOrder = new PlaceOrder(
    distanceCalculator,
    itemStorage,
    orderStorage,
    couponStorage
  );

  const dto: PlaceOrderInputDTO = {
    cpf: "778.278.412-36",
    zipCode: "11111-111",
    items: [{ id: "1", amount: 2 }],
  };

  afterEach(() => {
    orderStorage.clear();
    couponStorage.clear();
  });

  describe("when an item does not exists on storage", () => {
    it("should throw an error", () => {
      expect(() => placeOrder.execute(dto)).toThrowError("Item not found");
    });
  });

  describe("when all items exist on storage", () => {
    beforeEach(() => {
      itemStorage.save(
        new Item("1", "Sample Item", 1000, new Dimension(10, 10, 10, 1))
      );
    });

    it("should place a new order and save it to storage", () => {
      placeOrder.execute(dto);
      const orders = orderStorage.findAll();
      expect(orders).toHaveLength(1);
    });

    it("should return total with shipping price", () => {
      const { total, shippingCost } = placeOrder.execute(dto);
      expect(shippingCost).toBe(20);
      expect(total).toBe(2020);
    });

    describe("when coupon not exists", () => {
      it("should not apply any discount", () => {
        const { total } = placeOrder.execute({
          ...dto,
          couponName: "NOT_FOUND",
        });
        expect(total).toBe(2020);
      });
    });

    describe("when coupon exists", () => {
      beforeEach(() => {
        couponStorage.save(new Coupon("VALE20", 20));
      });

      it("should apply proper discount to item cost", () => {
        const { total } = placeOrder.execute({ ...dto, couponName: "VALE20" });
        expect(total).toBe(1620);
      });
    });
  });
});
