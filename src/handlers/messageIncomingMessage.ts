import { WASocket, WAMessage } from "@whiskeysockets/baileys";
import { menuResponse } from "./bot-responses/menu";
import { subscribeResponse } from "./bot-responses/subscribe";
import { aboutResponse } from "./bot-responses/about";
import { feedbackResponse } from "./bot-responses/feedback";
import { coursesResponse } from "./bot-responses/courses";
import { jobsResponse } from "./bot-responses/jobs";
import { donationResponse } from "./bot-responses/donation";
import { channelsResponse } from "./bot-responses/channels";
import { projectsResponse } from "./bot-responses/projects";
import { unsubscribeResponse } from "./bot-responses/cancel";
import { handleDefaultResponse } from "./bot-responses/default";
import { delay } from "../utils/delay";
import { postJobResponse } from "./bot-responses/post-job";

export enum MessageEnum {
  SUBSCRIBE = "Olá, gostaria de me cadastrar na lista para receber as vagas!",
  JOBS = "vagas",
  CANCEL = "cancelar",
  COURSES = "cursos",
  ABOUT = "sobre",
  PROJECTS = "projetos",
  FEEDBACK = "feedback",
  DONATION = "doacao",
  CHANNELS = "canais",
  POST_JOB = "postar",
  MENU = "menu",
}

const dispatchMap: Record<
  MessageEnum,
  (phoneNumber: string, contactName: string) => Promise<string[]>
  > = {
  [MessageEnum.MENU]: menuResponse,
  [MessageEnum.SUBSCRIBE]: subscribeResponse,
  [MessageEnum.CANCEL]: unsubscribeResponse,
  [MessageEnum.JOBS]: jobsResponse,
  [MessageEnum.ABOUT]: aboutResponse,
  [MessageEnum.FEEDBACK]: feedbackResponse,
  [MessageEnum.COURSES]: coursesResponse,
  [MessageEnum.PROJECTS]: projectsResponse,
  [MessageEnum.DONATION]: donationResponse,
  [MessageEnum.CHANNELS]: channelsResponse,
  [MessageEnum.POST_JOB]: postJobResponse,
};

export async function handleIncomingMessage(socket: WASocket, message: WAMessage) {
  const senderId = message.key.remoteJid;
  const phoneNumber = senderId?.split("@")[0] as string;
  const contactName = message.pushName as string;
  const messageContent = message.message?.extendedTextMessage?.text;

  if (!message.key.fromMe && senderId && !senderId.endsWith("@g.us") && messageContent) {
    const messageType = messageContent as MessageEnum;
    const dispatchFunction = dispatchMap[messageType];
    let responseMessages: string[];

    if (dispatchFunction) {
      responseMessages = await dispatchFunction(phoneNumber, contactName);
    } else {
      responseMessages = await handleDefaultResponse(phoneNumber, contactName);
    }

    for (const responseMessage of responseMessages) {
      await socket.sendMessage(senderId as string, { text: responseMessage });
      await delay(1500);
    }
  } else {
    console.log("Message does not meet criteria:", {
      fromMe: message.key.fromMe,
      senderId,
      extendedTextMessage: message.message?.extendedTextMessage?.text,
    });
  }
}
