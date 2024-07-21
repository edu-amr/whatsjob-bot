export async function feedbackResponse(
  phoneNumber: string,
  contactName: string
): Promise<string[]> {
  return [
    `Agradecemos por querer fornecer seu feedback. Por favor, clique no link abaixo para acessar nosso formulário de feedback e nos ajudar a melhorar nossos serviços:\r\n\r\n` +
      `Formulário de Feedback: https://docs.google.com/forms/d/e/1FAIpQLScoYilCfnpASIg1154m3OEToDw1Hp_1mylFx9fl0BciNLx9yA/viewform?usp=sf_link \r\n\r\n` +
      `Obrigado pelo seu tempo e contribuição 😁!`,
  ];
}
