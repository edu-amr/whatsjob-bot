export async function aboutResponse(): Promise<string[]> {
  const siteLink = "https://whatsjob-site.vercel.app/";
  const githubLink = "https://github.com/edu-amr";

  return [
    `🤖 Este é um projeto de bot open source que visa ajudar desenvolvedores a conseguir vagas de emprego focadas em TI.\r\n\r\n` +
      `💡 O bot fornece uma lista de vagas atualizadas, informações sobre cursos em alta, ideias de projetos, canais de tecnologia e muito mais.\r\n\r\n` +
      `🌟 Nosso objetivo é facilitar o acesso a oportunidades de trabalho e aprendizado, contribuindo para o crescimento profissional da comunidade de desenvolvedores.\r\n\r\n` +
      `🔗 Caso queira acessar nosso site e acompanhar o projeto, visite: ${siteLink} \r\n\r\n` +
      `💻 Para acessar o GitHub do criador, visite: ${githubLink} \r\n\r\n` +
      `🚀 Esperamos que você encontre muitas oportunidades e recursos úteis através deste serviço!\r\n\r\n` +
      `Obrigado por usar nosso bot!`,
  ];
}
