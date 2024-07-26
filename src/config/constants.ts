export const SUBSCRIBE_TABLE = process.env.ENVIRONMENT == "dev" ? "numeros_duplicate" : "numeros";
export const JOBS_TABLE = process.env.ENVIRONMENT == "dev" ? "vagas_duplicate" : "vagas";