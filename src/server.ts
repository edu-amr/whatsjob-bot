import express from "express";
import { connectToWhatsApp, whatsappSocket } from "./services/whatsappService";
import { handleIncomingMessage } from "handlers/messageIncomingMessage";
import { initSendJobsEveryWeek } from "jobs/send-jobs-every-week";

async function bootstrap() {
  const port = process.env.PORT || 3000;
  const server = express().use(express.json());

  await connectToWhatsApp(handleIncomingMessage);
  await initSendJobsEveryWeek(whatsappSocket());
  
  server.listen(port, () => console.log(`Server running on port ${port}`));
}

bootstrap();