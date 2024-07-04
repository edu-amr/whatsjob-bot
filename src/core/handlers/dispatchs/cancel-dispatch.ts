import { supabaseService } from "../../services/supabase-service"

export async function unsubscribeDispatch(phoneNumber: string, contactName: string) {
  await supabaseService.from("numeros").delete().eq("numero", phoneNumber);
  return `*${contactName}*, você foi removido da nossa lista para receber as vagas.`;
}
