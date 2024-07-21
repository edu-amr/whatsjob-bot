export async function handleDefaultResponse(
  phoneNumber: string,
  contactName: string
): Promise<string[]> {
  return [
    `*${contactName}*, você deve digitar *menu* para usar o bot 😉.`
  ];
}
