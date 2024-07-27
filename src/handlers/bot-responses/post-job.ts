export async function postJobResponse(phoneNumber: string, contactName: string): Promise<string[]> {
  return [
    `Obrigado pelo interesse de querer postar uma vaga 😊. Por favor, clique no link abaixo para acessar nosso formulário de submissão de vagas e nos ajudar a divulgar novas oportunidades:\r\n\r\n` +
      `Formulário de Submissão de Vagas: https://docs.google.com/forms/d/e/1FAIpQLSfxwXrOf-hxO1HDrYp4EUfL6o8lfp8nDe43DzpAo6G4DzmhkA/viewform \r\n\r\n` +
      `Agradecemos sua contribuição e colaboração!`,
  ];
}
