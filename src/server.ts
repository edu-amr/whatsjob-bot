import path from "path";
import express, { Request, Response, NextFunction, ErrorRequestHandler } from "express";
import { router } from "routes";
import { port } from "config/constants";
import { initSendJobsEveryWeek } from "./jobs/send-jobs-every-week";
import { handleIncomingMessage } from "./handlers/messageIncomingMessage";
import { connectToWhatsApp, whatsappSocket } from "./services/whatsappService";

async function bootstrap() {
  const server = express()
    .use(express.json())
    .use(router)
    //.use(express.static(path.resolve(__dirname, "..", "public")))

  await connectToWhatsApp(handleIncomingMessage);
  await initSendJobsEveryWeek(whatsappSocket());

  server.listen(port, () => console.log(`Server running on port ${port}`));
}

bootstrap();
