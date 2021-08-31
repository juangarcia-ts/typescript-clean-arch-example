import { GetOrder } from "../../application/GetOrder";
import { DatabaseRepositoryFactory } from "../factory/DatabaseRepositoryFactory";
import { HttpServer } from "./HttpServer";

export class Router {
  private server: HttpServer;

  constructor(server: HttpServer) {
    this.server = server;
  }

  register(): void {
    this.server.on(
      "GET",
      "/order/${code}",
      async (params?: Record<string, any>) => {
        const getOrder = new GetOrder(new DatabaseRepositoryFactory());
        const order = await getOrder.execute(params?.code);
        return order;
      }
    );
  }
}
