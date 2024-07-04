import { socket } from "@/core/services/connect-whatsapp";
import { delay } from "../../utils/delay";

export async function handleDefaultMessage(contactName: string) {
  const defaultMessage =
    "🤖 No que posso te ajudar? \r\n\r\n" +
    "*!vagas*: lista de vagas. \r\n" +
    "*!cancelar*: cancele o envio de mensagens automáticas. \r\n" +
    "*!cursos*: lista cursos em alta ou em promoção. \r\n" +
    "*!sobre*: sobre o projeto. \r\n" +
    "*!canais*: canais de tecnologia. \r\n" +
    "*!projetos*: ideias de projetos. \r\n" +
    "*!feedback*: formulário de feedback. \r\n" +
    "*!doacao*: faça uma doação.";

  const greetingMessage = `Olá *${contactName}* 👋, que bom ter você por aqui!`;

  await socket?.sendMessage(contactName as string, {
    text: greetingMessage,
  });
  await delay(3000);
  return defaultMessage;
}
