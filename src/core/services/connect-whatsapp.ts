import makeWASocket, { DisconnectReason, useMultiFileAuthState, WASocket } from "@whiskeysockets/baileys";
import { Boom } from "@hapi/boom";

export let socket: WASocket | null = null;

export async function connectToWhatsApp(): Promise<WASocket> {
  const { state, saveCreds } = await useMultiFileAuthState("auth_info_baileys");

  socket = makeWASocket({
    printQRInTerminal: true,
    auth: state,
  });

  return new Promise((resolve, reject) => {
    socket!.ev.on("connection.update", (update) => {
      const { connection, lastDisconnect } = update;
      if (connection === "close") {
        const shouldReconnect = (lastDisconnect?.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut;

        console.log("Connection closed. Reconnecting:", shouldReconnect);
        if (shouldReconnect) {
          connectToWhatsApp().then(resolve).catch(reject);
        } else {
          reject(new Error("WhatsApp socket closed and not reconnecting"));
        }
      } else if (connection === "open") {
        console.log("Connection opened");
        resolve(socket!);
      }
    });

    socket!.ev.on("creds.update", saveCreds);
  });
}
