import { GetOrder } from "../../../src/application/GetOrder";
import { Cpf } from "../../../src/domain/entity/Cpf";
import { Order } from "../../../src/domain/entity/Order";
import { OrderItem } from "../../../src/domain/entity/OrderItem";
import { DatabaseRepositoryFactory } from "../../../src/infrastructure/factory/DatabaseRepositoryFactory";

describe("GetOrder", () => {
  const repositoryFactory = new DatabaseRepositoryFactory();
  let getOrder: GetOrder;

  beforeEach(() => {
    getOrder = new GetOrder(repositoryFactory);
  });

  describe("when order does not exist", () => {
    it("should throw an error", async () => {
      await expect(getOrder.execute("invalid_code")).rejects.toEqual(
        new Error("Order not found")
      );
    });
  });

  describe("when order is properly found", () => {
    const order = new Order(
      new Cpf("766.582.760-80"),
      new Date("2021-01-01"),
      1
    );

    order.addItem(
      new OrderItem("3ee14b1b-74cf-4fe4-bc5a-d4c3c598d4fb", 800, 2)
    );

    beforeEach(async () => {
      const orderRepository = repositoryFactory.createOrderRepository();
      await orderRepository.save(order);
    });

    it("should return order", async () => {
      const output = await getOrder.execute("202100000001");

      expect(output.code).toEqual("202100000001");
      expect(output.shippingCost).toEqual(order.shippingCost);
      expect(output.total).toEqual(order.getTotal());
      expect(output.orderItems).toEqual([
        {
          description: "Item #1",
          price: 800,
          amount: 2,
        },
      ]);
    });
  });
});
