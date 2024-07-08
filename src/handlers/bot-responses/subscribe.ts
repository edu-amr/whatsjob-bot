import { supabaseService } from "../../services/supabaseService";

const table = process.env.ENVIRONMENT == "dev" ? "duplicate_numeros": "numeros" 

export async function subscribeResponse(
  phoneNumber: string,
  contactName: string
): Promise<string[]> {
  const { data, error } = await supabaseService
    .from(table)
    .select("numero")
    .eq("numero", phoneNumber);

  if (error) {
    return [
      `Desculpe, *${contactName}*. Tivemos um problema ao processar sua inscrição. Por favor, tente novamente mais tarde.`,
    ];
  }

  if (data.length > 0) {
    return [`Olá *${contactName}*, você já está inscrito na nossa lista para receber as vagas!`];
  }

  const { error: insertError } = await supabaseService
    .from("numeros")
    .insert({ numero: phoneNumber });

  if (insertError) {
    return [
      `Desculpe, *${contactName}*. Tivemos um problema ao processar sua inscrição. Por favor, tente novamente mais tarde.`,
    ];
  }

  return [
    `Olá *${contactName}*, tudo bem? Inscrevi você na nossa lista para receber as vagas! Se quiser se desinscrever é só digitar *!cancelar*`,
  ];
}
