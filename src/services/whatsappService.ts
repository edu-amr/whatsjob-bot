import makeWASocket, { DisconnectReason, useMultiFileAuthState, WASocket, WAMessage } from '@whiskeysockets/baileys';
import { Boom } from '@hapi/boom';
let socket: WASocket | null = null;

async function connectToWhatsApp(handleIncomingMessage: (socket: WASocket, message: WAMessage) => Promise<void>) {
  const { state, saveCreds } = await useMultiFileAuthState('auth_info_baileys');

  socket = makeWASocket({
    printQRInTerminal: true,
    auth: state,
  });
  
  socket.ev.on('connection.update', (update) => {
    const { connection, lastDisconnect } = update;
    if (connection === 'close') {
      const shouldReconnect =
        (lastDisconnect?.error as Boom)?.output?.statusCode !== DisconnectReason.loggedOut;
      if (shouldReconnect) connectToWhatsApp(handleIncomingMessage);
    } else if (connection === 'open') {
      console.log('Connection opened');
    }
  });

  socket.ev.on('creds.update', saveCreds);

  socket.ev.on('messages.upsert', async (messageUpdate) => {
    if (socket) {
      const message = messageUpdate.messages[0];
      await handleIncomingMessage(socket, message);
    }
  });

  return socket;
}

function whatsappSocket(): WASocket {
  if (!socket) {
    throw new Error('WhatsApp socket is not initialized');
  }
  return socket;
}

export { connectToWhatsApp, whatsappSocket };