import { HapiHttpServer } from "./infrastructure/http/HapiHttpServer";
import { Router } from "./infrastructure/http/Router";

async function bootstrap() {
  const httpServer = new HapiHttpServer();
  const router = new Router(httpServer);
  router.register();
  await httpServer.listen(3000);
  console.log("Listening on port 3000");
}

bootstrap();
