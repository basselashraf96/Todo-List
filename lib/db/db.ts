import { DbQueryParam } from "@lib/util/types";
import { Pool } from "pg";

/**
 *
 * Executes a SQL query against the PostgreSQL database.
 * This function uses a connection pool to efficiently manage multiple database connections.
 *
 * @param {string} text - The SQL query to execute. Use parameterized queries (e.g., `SELECT * FROM table WHERE id = $1`) to prevent SQL injection.
 * @param {Array<any>} [params] - An optional array of values to safely replace placeholders in the query.
 * @returns {Promise<any>} - A promise that resolves with the query result or rejects with an error.
 *
 * @example
 * const result = await query('SELECT * FROM users WHERE id = $1', [userId]);
 * console.log(result.rows); // Logs the result rows
 *
 */
const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_NAME,
  password: process.env.DB_PASSWORD,
  port: Number(process.env.DB_PORT),
});

export const query = (text: string, params?: DbQueryParam[]) => {
  return pool.query(text, params);
};
