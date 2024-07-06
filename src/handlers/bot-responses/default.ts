export async function handleDefaultResponse(phoneNumber: string, contactName: string): Promise<string[]> {
  return [
    `Olá *${contactName}* 👋, que bom ter você por aqui!`,
    "🤖 No que posso te ajudar? \r\n\r\n" +
      "*!vagas*: lista de vagas. \r\n" +
      "*!cancelar*: cancele o envio de mensagens automáticas. \r\n" +
      "*!cursos*: lista cursos em alta ou em promoção. \r\n" +
      "*!sobre*: sobre o projeto. \r\n" +
      "*!canais*: canais de tecnologia. \r\n" +
      "*!projetos*: ideias de projetos. \r\n" +
      "*!feedback*: formulário de feedback. \r\n" +
      "*!doacao*: faça uma doação.",
  ];
}