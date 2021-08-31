import express, { Express, Request, IRouterMatcher, Response } from "express";
import { Callback, HttpServer } from "./HttpServer";
import http from "http";

export class ExpressHttpServer implements HttpServer {
  server: Express;

  constructor() {
    this.server = express();
    this.server.use(express.json());
  }

  on(method: string, route: string, fn: Callback): void {
    const handler = this.getHandler(method);
    handler(
      this.transformUrlParams(route),
      async (req: Request, res: Response) => {
        const result = await fn(req.params, req.body);
        res.json(result);
      }
    );
  }

  async listen(port: number): Promise<http.Server> {
    return this.server.listen(port);
  }

  private getHandler(method: string): IRouterMatcher<any> {
    const handler = {
      GET: this.server.get,
      POST: this.server.post,
      PUT: this.server.put,
      PATCH: this.server.patch,
      DELETE: this.server.delete,
    }[method.toUpperCase()];
    return handler.bind(this.server);
  }

  private transformUrlParams(route: string): string {
    return route.replace(/\$\{/g, ":").replace(/\}/g, "");
  }
}
