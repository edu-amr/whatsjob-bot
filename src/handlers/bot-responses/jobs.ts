import { supabaseService } from "../../services/supabaseService";

export async function jobsResponse(phoneNumber: string, contactName: string): Promise<string[]> {
  const { data, error } = await supabaseService.from("vagas").select("titulo, link, empresa, senioridade, modalidade");

  if (error) {
    return [`Desculpe, *${contactName}*. Tivemos um problema ao buscar as vagas. Por favor, tente novamente mais tarde.`];
  }

  if (data.length === 0) {
    return [`*${contactName}*. Atualmente, não temos vagas disponíveis.`];
  }

  let message = `Essas são as vagas disponíveis:`;

  data.forEach((vaga: any) => {
    message += 
      `\r\n\r\n` +
      `🏢 Empresa: ${vaga.empresa}\r\n` +
      `🎓 Senioridade: ${vaga.senioridade}\r\n` +
      `💼 Vaga: ${vaga.titulo}\r\n` +
      `🚩 Modalidade: ${vaga.modalidade}\r\n` +
      `🔗 Link: ${vaga.link}`;
  });

  return [message];
}
