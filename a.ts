import makeWASocket, { DisconnectReason, useMultiFileAuthState } from "@whiskeysockets/baileys";
import { Boom } from "@hapi/boom";

async function connectToWhatsApp() {
  const { state, saveCreds } = await useMultiFileAuthState("auth_info_baileys");

  const socket = makeWASocket({
    printQRInTerminal: true,
    auth: state,
  });

  socket.ev.on("connection.update", (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === "close") {
      const shouldReconnect = (lastDisconnect?.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut;

      if (shouldReconnect) connectToWhatsApp();

    } else if (connection === "open") {
      console.log("Connection opened");
    }
  });

  socket.ev.on("creds.update", saveCreds);

  socket.ev.on("messages.upsert", async (messageUpdate) => {
    const message = messageUpdate.messages[0];
    const sender = message.key.remoteJid;

    if (message.key.fromMe || sender?.endsWith("@g.us")) return;

    //await socket.sendMessage(sender as string, { text: "Hello there!" });
    console.log('ENVIE : ')
  });
}

// Run the main function
connectToWhatsApp();
