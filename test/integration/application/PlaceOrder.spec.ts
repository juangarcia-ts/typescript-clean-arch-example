import { PlaceOrderInputDto } from "../../../src/application/OrderDto";
import { PlaceOrder } from "../../../src/application/PlaceOrder";
import { Coupon } from "../../../src/domain/entity/Coupon";
import { Dimension } from "../../../src/domain/entity/Dimension";
import { Item } from "../../../src/domain/entity/Item";
import { DistanceCalculatorApiMemory } from "../../../src/infrastructure/gateway/memory/DistanceCalculatorApiMemory";
import { CouponRepositoryMemory } from "../../../src/infrastructure/repository/memory/CouponRepositoryMemory";
import { ItemRepositoryMemory } from "../../../src/infrastructure/repository/memory/ItemRepositoryMemory";
import { OrderRepositoryMemory } from "../../../src/infrastructure/repository/memory/OrderRepositoryMemory";

describe("PlaceOrder", () => {
  let distanceCalculator: DistanceCalculatorApiMemory;
  let itemRepository: ItemRepositoryMemory;
  let orderRepository: OrderRepositoryMemory;
  let couponRepository: CouponRepositoryMemory;
  let placeOrder: PlaceOrder;

  const dto: PlaceOrderInputDto = {
    cpf: "778.278.412-36",
    zipCode: "11111-111",
    items: [{ id: "1", amount: 2 }],
  };

  beforeEach(() => {
    distanceCalculator = new DistanceCalculatorApiMemory();
  });

  describe("when an item does not exists on repository", () => {
    beforeEach(() => {
      itemRepository = new ItemRepositoryMemory([]);
      orderRepository = new OrderRepositoryMemory([]);
      couponRepository = new CouponRepositoryMemory([]);
      placeOrder = new PlaceOrder(
        distanceCalculator,
        itemRepository,
        orderRepository,
        couponRepository
      );
    });

    it("should throw an error", async () => {
      await expect(placeOrder.execute(dto)).rejects.toEqual(
        new Error("Item not found")
      );
    });
  });

  describe("when all items exist on repository", () => {
    const existingItems = [
      new Item("1", "Sample Item", 1000, new Dimension(10, 10, 10, 1)),
    ];

    beforeEach(() => {
      itemRepository = new ItemRepositoryMemory(existingItems);
      couponRepository = new CouponRepositoryMemory([]);
      orderRepository = new OrderRepositoryMemory([]);
      placeOrder = new PlaceOrder(
        distanceCalculator,
        itemRepository,
        orderRepository,
        couponRepository
      );
    });

    it("should place order and return total with shipping price", async () => {
      const { total, shippingCost } = await placeOrder.execute(dto);
      expect(shippingCost).toBe(20);
      expect(total).toBe(2020);
    });

    describe("when coupon not exists", () => {
      it("should not apply any discount", async () => {
        const { total } = await placeOrder.execute({
          ...dto,
          couponCode: "NOT_FOUND",
        });
        expect(total).toBe(2020);
      });
    });

    describe("when coupon exists", () => {
      const existingCoupons = [new Coupon("VALE20", 20)];

      beforeEach(() => {
        itemRepository = new ItemRepositoryMemory(existingItems);
        couponRepository = new CouponRepositoryMemory(existingCoupons);
        orderRepository = new OrderRepositoryMemory([]);
        placeOrder = new PlaceOrder(
          distanceCalculator,
          itemRepository,
          orderRepository,
          couponRepository
        );
      });

      it("should apply proper discount to item cost", async () => {
        const { total } = await placeOrder.execute({
          ...dto,
          couponCode: "VALE20",
        });
        expect(total).toBe(1620);
      });
    });
  });
});
