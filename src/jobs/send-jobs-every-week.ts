import { WASocket } from "@whiskeysockets/baileys";
import { CronJob } from "cron";
import { supabaseService } from "services/supabaseService";
import { delay } from "utils/delay";

async function sendBroadcastMessage(socket: WASocket) {
  const { data: numbersData, error: numbersError } = await supabaseService.from("duplicate_numeros").select("numero");

  if (numbersError) {
    console.error('Erro ao buscar números do banco de dados:', numbersError);
    return;
  }

  const { data: jobsData, error: jobsError } = await supabaseService.from("vagas").select("titulo, link, empresa, senioridade, modalidade");

  if (jobsError) {
    console.error('Erro ao buscar vagas do banco de dados:', jobsError);
    return;
  }

  if (!jobsData || jobsData.length === 0) {
    console.log('Nenhuma vaga disponível no momento.');
    return;
  }

  let message = `Seguem as vagas!`;

  jobsData.forEach((job) => {
    message += 
      `\r\n\r\n` +
      `🏢 Empresa: ${job.empresa}\r\n` +
      `🎓 Senioridade: ${job.senioridade}\r\n` +
      `💼 Vaga: ${job.titulo}\r\n` +
      `🚩 Modalidade: ${job.modalidade}\r\n` +
      `🔗 Link: ${job.link}`;
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

const segundos = '*/10 * * * * *'
const semana = '0 0 9 * * 1'

export async function initSendJobsEveryWeek(socket: WASocket) {
  const job = new CronJob(
    segundos,
    () => sendBroadcastMessage(socket),
    null,
    true,
    'America/Los_Angeles'
  );
  
  job.start();
}
