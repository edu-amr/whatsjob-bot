import { WAMessage } from "@whiskeysockets/baileys";
import { MessageEnum } from "../../../types/enums";
import { socket } from "../services/connect-whatsapp";
import { delay } from "../utils/delay";
import { subscribeDispatch } from "./dispatchs/subscribe-dispatch";
import { aboutDispatch } from "./dispatchs/about-dispatch";
import { feedbackDispatch } from "./dispatchs/feedback-dispatch";
import { coursesDispatch } from "./dispatchs/courses-dispatch";
import { jobsDispatch } from "./dispatchs/jobs-dispatch";
import { donationDispatch } from "./dispatchs/donation-dispatch";
import { channelsDispatch } from "./dispatchs/channels-dispatch";
import { projectsDispatch } from "./dispatchs/projects-dispatch";
import { unsubscribeDispatch } from "./dispatchs/cancel-dispatch";

const dispatchMap: Record<MessageEnum, (phoneNumber: string, contactName: string) => Promise<string>> = {
  [MessageEnum.SUBSCRIBE]: subscribeDispatch,
  [MessageEnum.CANCEL]: unsubscribeDispatch,
  [MessageEnum.JOBS]: jobsDispatch,
  [MessageEnum.ABOUT]: aboutDispatch,
  [MessageEnum.FEEDBACK]: feedbackDispatch,
  [MessageEnum.COURSES]: coursesDispatch,
  [MessageEnum.PROJECTS]: projectsDispatch,
  [MessageEnum.DONATION]: donationDispatch,
  [MessageEnum.CHANNELS]: channelsDispatch,
};

export async function whatsappMessageHandler(sender: string, msg: WAMessage) {
  const senderId = msg.key.remoteJid;
  const phoneNumber = senderId?.split("@")[0] as string;
  const contactName = msg.pushName as string;

  const messageType = msg.message?.conversation as MessageEnum;
  const dispatchFunction = dispatchMap[messageType];

  if (dispatchFunction) {
    const responseMessage = await dispatchFunction(phoneNumber, contactName);
    await socket?.sendMessage(sender as string, { text: responseMessage });
  } else {
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
      
    await socket?.sendMessage(sender as string, {
      text: `Olá *${contactName}* 👋, que bom ter você por aqui!`,
    });
    await delay(3000);
    await socket?.sendMessage(sender as string, { text: defaultMessage });
  }
}
