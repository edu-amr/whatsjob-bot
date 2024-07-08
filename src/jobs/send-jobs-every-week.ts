import { WASocket } from "@whiskeysockets/baileys";
import { CronJob } from "cron";
import { supabaseService } from "services/supabaseService";
import { delay } from "utils/delay";

async function sendBroadcastMessage(socket: WASocket) {
  const { data: numbersData, error: numbersError } = await supabaseService.from("duplicate_numeros").select("numero");

  if (numbersError) {
    console.error('Error fetching numbers from the database:', numbersError);
    return;
  }

  const { data: jobsData, error: jobsError } = await supabaseService.from("vagas").select("titulo, link, empresa, senioridade, modalidade");

  if (jobsError) {
    console.error('Error fetching jobs from the database:', jobsError);
    return;
  }

  if (!jobsData || jobsData.length === 0) {
    console.log('No job available at the moment.');
    return;
  }

  let message = `Here are the job openings!`;

  jobsData.forEach((job) => {
    message += 
      `\r\n\r\n` +
      `🏢 Company: ${job.empresa}\r\n` +
      `🎓 Seniority: ${job.senioridade}\r\n` +
      `💼 Job: ${job.titulo}\r\n` +
      `🚩 Modality: ${job.modalidade}\r\n` +
      `🔗 Link: ${job.link}`;
  });

  for (const entry of numbersData) {
    const number = entry.numero;
    try { 
      await socket?.sendMessage(number + "@s.whatsapp.net", { text: message });
      console.log('enviei para ele ')
      delay(4000);
    } catch (sendError) {
      console.error(`Error sending message to number ${number}:`, sendError);
    }
  }
}

const minutes = '*/30 * * * * *'
const week = '0 0 9 * * 1'

export async function initSendJobsEveryWeek(socket: WASocket) {
  const job = new CronJob(
    minutes,
    () => sendBroadcastMessage(socket),
    null,
    true,
    'America/Los_Angeles'
  );
  
  job.start();
}