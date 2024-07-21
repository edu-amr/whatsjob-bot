export const SUBSCRIBE_TABLE = process.env.ENVIRONMENT == "dev" ? "duplicate_numeros" : "numeros";
export const JOBS_TABLE = process.env.ENVIRONMENT == "dev" ? "duplicate_vagas" : "vagas";