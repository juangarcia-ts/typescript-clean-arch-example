import Hapi from "@hapi/hapi";
import { Callback, HttpServer } from "./HttpServer";
import http from "http";

export class HapiHttpServer implements HttpServer {
  server: Hapi.Server;

  constructor() {
    this.server = Hapi.server();
  }

  on(method: string, route: string, fn: Callback): void {
    this.server.route({
      method,
      path: this.transformUrlParams(route),
      handler: async (req: Hapi.Request) => {
        return fn(req.params, req.payload as any);
      },
    });
  }

  async listen(port: number): Promise<http.Server> {
    this.server.settings.port = port;
    await this.server.start();
    return this.server.listener;
  }

  private transformUrlParams(route: string): string {
    return route.replace(/\$/g, "");
  }
}
