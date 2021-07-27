import { mock, instance, verify, deepEqual, resetCalls } from "ts-mockito";
import { Order } from "../../../src/order/order.entity";
import { OrderRepository } from "../../../src/order/order.repository";
import { OrderService } from "../../../src/order/order.service";

describe("OrderService", () => {
  const repository = mock(OrderRepository);
  const service = new OrderService(instance(repository));

  describe("#create", () => {
    const order: Order = {
      description: "Order #1",
      price: 20,
      amount: 2,
    };

    afterEach(() => {
      resetCalls(repository);
    });

    describe("when customer has an invalid cpf", () => {
      const cpf = "000.000.000-00";

      it("should throw an exception", () => {
        expect(() => service.create(cpf, order)).toThrowError("Invalid CPF");
      });
    });

    describe("when customer has a valid cpf", () => {
      const cpf = "661.930.650-08";

      describe("and no discount is applied", () => {
        it("should create order as it is", () => {
          service.create(cpf, order);
          verify(repository.create(deepEqual(order))).once();
        });
      });

      describe("and a discount is applied", () => {
        const discount = 10;
        const expectedPriceAfterDiscount = 18;

        it("should create order with reduced price", () => {
          service.create(cpf, order, discount);

          verify(
            repository.create(
              deepEqual({ ...order, price: expectedPriceAfterDiscount })
            )
          ).once();
        });
      });
    });
  });
});
