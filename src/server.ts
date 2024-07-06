import express from "express";
import { connectToWhatsApp } from "./services/whatsappService";
import { handleIncomingMessage } from "handlers/messageIncomingMessage";

async function bootstrap() {
  const port = process.env.PORT || 3000;
  const server = express().use(express.json());

  await connectToWhatsApp(handleIncomingMessage);
  
  server.listen(port, () => console.log(`Server running on port ${port}`));
}

bootstrap();