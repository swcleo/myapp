import { Pool } from "pg";
import config from "config";

const pool = new Pool(config.get("db"));

export function query(text, params, callback) {
  return pool.query(text, params, callback);
}
