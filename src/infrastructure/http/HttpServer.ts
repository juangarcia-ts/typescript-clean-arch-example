import http from "http";

export type Callback = (
  params?: Record<string, any>,
  body?: Record<string, any>
) => Promise<any>;

export interface HttpServer {
  on(method: string, route: string, fn: Callback): void;
  listen(port: number): Promise<http.Server>;
}
