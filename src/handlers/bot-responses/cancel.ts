import { SUBSCRIBE_TABLE } from "../../config/constants";
import { supabaseService } from "../../services/supabaseService";

export async function unsubscribeResponse(phoneNumber: string, contactName: string) {
  await supabaseService.from(SUBSCRIBE_TABLE).delete().eq("numero", phoneNumber);
  return [`*${contactName}*, removemos você da nossa lista de envio de vagas automáticas 😁.`];
}
