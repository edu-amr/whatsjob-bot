import express from "express";
import { connectToWhatsApp } from "./core/services/connect-whatsapp";
import { whatsappMessageHandler } from "./core/handlers/message-handler";
import { initSendJobsEvery15Days } from "./core/jobs/send-jobs-every-15-days";

async function bootstrap() {
  const port = process.env.PORT || 3000;
  const server = express().use(express.json());

  try {
    const whatsappSocket = await connectToWhatsApp();
    whatsappSocket.ev.on("messages.upsert", async (messageUpdate) => {
      const message = messageUpdate.messages[0];
      const sender = message.key.remoteJid;

      if (message.key.fromMe || sender?.endsWith("@g.us")) return;

      whatsappMessageHandler(sender as string, message)
    });

    initSendJobsEvery15Days()
    
    server.listen(port, () => console.log(`Server running on port ${port}`));
  } catch (error) {
    console.error("Failed to connect to WhatsApp:", error);
  }
}

bootstrap();
