import path from "path";
import express, { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { router } from "routes";
import { port } from "config/constants";
import { initSendJobsEveryWeek } from "./jobs/send-jobs-every-week";
import { handleIncomingMessage } from "./handlers/messageIncomingMessage";
import { connectToWhatsApp, whatsappSocket } from "./services/whatsappService";
import * as Sentry from "@sentry/node";
import { nodeProfilingIntegration } from "@sentry/profiling-node";

async function bootstrap() {
  const server = express()
    .use(express.json())
    .use(router)
    .use(express.static(path.resolve(__dirname, "..", "public")))
    .use(function onError(
      err: ErrorRequestHandler,
      req: Request,
      res: Response,
      next: NextFunction
    ) {
      res.statusCode = 500;
      res.end(res.sentry + "\n");
    });

  Sentry.init({
    dsn: "https://cb6df998b6adfb0aeaf704e0f045a290@o4505638921175040.ingest.us.sentry.io/4507671412211712",
    integrations: [nodeProfilingIntegration()],
    tracesSampleRate: 1.0,
    profilesSampleRate: 1.0,
  });

  Sentry.setupExpressErrorHandler(server);

  // await connectToWhatsApp(handleIncomingMessage);
  // await initSendJobsEveryWeek(whatsappSocket());

  server.listen(port, () => console.log(`Server running on port ${port}`));
}

bootstrap();
