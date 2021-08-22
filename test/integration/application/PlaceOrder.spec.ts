import { PlaceOrder } from "../../../src/application/PlaceOrder";
import { PlaceOrderInput } from "../../../src/application/PlaceOrderInput";
import { PostgresDatabase } from "../../../src/infrastructure/database/PostgresDatabase";
import { DatabaseRepositoryFactory } from "../../../src/infrastructure/factory/DatabaseRepositoryFactory";
import { DistanceCalculatorApiMemory } from "../../../src/infrastructure/gateway/memory/DistanceCalculatorApiMemory";

describe("PlaceOrder", () => {
  const repositoryFactory = new DatabaseRepositoryFactory();
  let distanceCalculator: DistanceCalculatorApiMemory;
  let placeOrder: PlaceOrder;

  beforeEach(() => {
    distanceCalculator = new DistanceCalculatorApiMemory();
    placeOrder = new PlaceOrder(repositoryFactory, distanceCalculator);
  });

  afterAll(async () => {
    const db = PostgresDatabase.getInstance();
    db.executeQuery("DELETE FROM public.order_item");
    db.executeQuery("DELETE FROM public.order");
  });

  const input: PlaceOrderInput = {
    cpf: "778.278.412-36",
    zipCode: "11111-111",
    items: [{ id: "3ee14b1b-74cf-4fe4-bc5a-d4c3c598d4fb", amount: 2 }],
  };

  it("should place order and return total with shipping price", async () => {
    const { total, shippingCost } = await placeOrder.execute(input);
    expect(shippingCost).toBe(20);
    expect(total).toBe(2020);
  });

  describe("when coupon not exists", () => {
    it("should not apply any discount", async () => {
      const { total } = await placeOrder.execute({
        ...input,
        couponCode: "NOT_FOUND",
      });
      expect(total).toBe(2020);
    });
  });

  describe("when coupon exists", () => {
    const db = PostgresDatabase.getInstance();

    beforeAll(async () => {
      await db.executeQuery(
        'INSERT INTO public.coupon ("code", "percentage") VALUES ($1, $2)',
        ["VALE20", 20]
      );
    });

    afterAll(async () => {
      await db.executeQuery("DELETE FROM public.coupon");
    });

    it("should apply proper discount to item cost", async () => {
      const { total } = await placeOrder.execute({
        ...input,
        couponCode: "VALE20",
      });
      expect(total).toBe(1620);
    });
  });
});
