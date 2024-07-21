import { supabaseService } from "../../services/supabaseService";
import { SUBSCRIBE_TABLE } from "../../config/constants";

export async function subscribeResponse(
  phoneNumber: string,
  contactName: string
): Promise<string[]> {
  const { data, error } = await supabaseService
    .from(SUBSCRIBE_TABLE)
    .select("numero")
    .eq("numero", phoneNumber);

  if (error) {
    return [
      `Desculpe, *${contactName}*. Tivemos um problema ao processar sua inscrição. Por favor, tente novamente mais tarde 😕.`,
    ];
  }

  if (data.length > 0) {
    return [`*${contactName}*, você já está inscrito na nossa lista para receber as vagas 😁!`];
  }

  const { error: insertError } = await supabaseService
    .from(SUBSCRIBE_TABLE)
    .insert({ numero: phoneNumber });

  if (insertError) {
    return [
      `Desculpe, *${contactName}*. Tivemos um problema ao processar sua inscrição. Por favor, tente novamente mais tarde 😕.`,
    ];
  }

  return [
    `*${contactName}*, inscrevi você na nossa lista para receber as vagas 🎉! Você também pode digitar *menu* para usar o bot 🤖.`,
  ];
}
