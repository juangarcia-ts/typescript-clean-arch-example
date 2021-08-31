import request from "supertest";
import { Cpf } from "../../../../src/domain/entity/Cpf";
import { Order } from "../../../../src/domain/entity/Order";
import { OrderItem } from "../../../../src/domain/entity/OrderItem";
import { PostgresDatabase } from "../../../../src/infrastructure/database/PostgresDatabase";
import { DatabaseRepositoryFactory } from "../../../../src/infrastructure/factory/DatabaseRepositoryFactory";
import { ExpressHttpServer } from "../../../../src/infrastructure/http/ExpressHttpServer";
import { HapiHttpServer } from "../../../../src/infrastructure/http/HapiHttpServer";
import { Router } from "../../../../src/infrastructure/http/Router";

describe("HttpServer", () => {
  const cpf = new Cpf("766.582.760-80");
  const order = new Order(cpf, new Date("2021-01-01"));
  order.addItem(new OrderItem("3ee14b1b-74cf-4fe4-bc5a-d4c3c598d4fb", 800, 2));

  beforeAll(async () => {
    const repositoryFactory = new DatabaseRepositoryFactory();
    const orderRepository = repositoryFactory.createOrderRepository();
    await orderRepository.save(order);
  });

  afterAll(() => {
    const db = PostgresDatabase.getInstance();
    db.executeQuery("DELETE FROM public.order_item");
    db.executeQuery("DELETE FROM public.order");
  });

  describe("Express", () => {
    it("should handle an http request", async () => {
      const server = new ExpressHttpServer();
      const router = new Router(server);
      router.register();

      const app = await server.listen(3000);
      await request(app).get("/order/202100000001").expect(200);
    });
  });

  describe("Hapi", () => {
    it("should handle an http request", async () => {
      const server = new HapiHttpServer();
      const router = new Router(server);
      router.register();

      const app = await server.listen(3001);
      await request(app).get("/order/202100000001").expect(200);
    });
  });
});
