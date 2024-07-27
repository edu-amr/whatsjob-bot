import { WASocket } from "@whiskeysockets/baileys";
import { CronJob } from "cron";
import { JOBS_TABLE, SUBSCRIBE_TABLE } from "../config/constants";
import { supabaseService } from "../services/supabaseService";
import { delay } from "../utils/delay";

async function sendBroadcastMessage(socket: WASocket) {
  const { data: numbersData, error: numbersError } = await supabaseService
    .from(SUBSCRIBE_TABLE)
    .select("numero");

  if (numbersError) {
    console.error("Erro ao buscar números do banco de dados:", numbersError);
    return;
  }

  const { data: jobsData, error: jobsError } = await supabaseService
    .from(JOBS_TABLE)
    .select("titulo, link, modalidade");

  if (jobsError) {
    console.error("Erro ao buscar vagas do banco de dados:", jobsError);
    return;
  }

  if (!jobsData || jobsData.length === 0) {
    console.log("Nenhuma vaga disponível no momento.");
    return;
  }

  let message = `Seguem as vagas!`;

  jobsData.forEach((vaga: any) => {
    message +=
      `\r\n\r\n` + `🌎 Modalidade: ${vaga.modalidade}\r\n` + `📍 ${vaga.titulo}: ${vaga.link}`;
  });

  for (const entry of numbersData) {
    const number = entry.numero;
    try {
      await socket?.sendMessage(number + "@s.whatsapp.net", { text: message });
      delay(4000);
    } catch (sendError) {
      console.error(`Erro ao enviar mensagem para o número ${number}:`, sendError);
    }
  }
}

const segundos = "*/10 * * * * *";
const semana = "0 0 9 * * 1";

export async function initSendJobsEveryWeek(socket: WASocket) {
  const job = new CronJob(
    semana,
    () => sendBroadcastMessage(socket),
    null,
    true,
    "America/Los_Angeles"
  );

  job.start();
}
