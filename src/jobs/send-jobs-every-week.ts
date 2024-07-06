import { CronJob } from "cron";
import { supabaseService } from "../services/supabase-service";
import { socket } from "../services/connect-whatsapp"; // Certifique-se de importar corretamente
import { delay } from "../utils/delay";

async function sendBroadcastMessage() {
  const { data: numbersData, error: numbersError } = await supabaseService.from("numeros_duplicate").select("numero");

  if (numbersError) {
    console.error('Erro ao buscar números do banco de dados:', numbersError);
    return;
  }

  const { data: vagasData, error: vagasError } = await supabaseService.from("vagas").select("titulo, link, empresa, senioridade, modalidade");

  if (vagasError) {
    console.error('Erro ao buscar vagas do banco de dados:', vagasError);
    return;
  }

  if (!vagasData || vagasData.length === 0) {
    console.log('Nenhuma vaga disponível no momento.');
    return;
  }

  let message = `Seguem as vagas!`;

  vagasData.forEach((vaga) => {
    message += 
      `\r\n\r\n` +
      `🏢 Empresa: ${vaga.empresa}\r\n` +
      `🎓 Senioridade: ${vaga.senioridade}\r\n` +
      `💼 Vaga: ${vaga.titulo}\r\n` +
      `🚩 Modalidade: ${vaga.modalidade}\r\n` +
      `🔗 Link: ${vaga.link}`;
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

export function initSendJobsEveryWeek() {
  const job = new CronJob(
    '0 0 9 * * 1', // Executa toda segunda-feira às 9:00 da manhã
    () => sendBroadcastMessage(),
    null,
    true,
    'America/Los_Angeles'
  );
  
  job.start();
}
