import { supabaseService } from "../../services/supabaseService";

const table = process.env.ENVIRONMENT == "dev" ? "duplicate_numeros": "numeros" 

export async function unsubscribeResponse(phoneNumber: string, contactName: string) {
  await supabaseService.from("numeros").delete().eq("numero", phoneNumber);
  return [`*${contactName}*, você foi removido da nossa lista para receber as vagas.`];
}
