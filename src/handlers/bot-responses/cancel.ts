import { supabaseService } from "../../services/supabaseService";

export async function unsubscribeResponse(phoneNumber: string, contactName: string) {
  await supabaseService.from("numeros").delete().eq("numero", phoneNumber);
  return [`*${contactName}*, você foi removido da nossa lista para receber as vagas.`];
}
