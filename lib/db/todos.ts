import { Todo } from "@lib/util/types";
import { query } from "./db";

/**
 * Fetches all todos for a specific user from the database.
 *
 * The results are ordered by the 'created_at' field in ascending order.
 *
 * @param {string} userId - The unique identifier for the user.
 * @returns {Promise<Todo[]>} - A promise that resolves with the list of todos.
 */
export const dbFetchTodos = async (userId: string): Promise<Todo[]> => {
  const result = await query(`SELECT * FROM "todo" WHERE user_id = $1 ORDER BY created_at ASC`, [userId]);
  return result.rows as Todo[]; // Typecast the result as an array of Todo objects
};

/**
 * Inserts a new todo into the database for a specific user.
 *
 * Generates a unique ID for the new todo and sets 'completed' to false by default.
 *
 * @param {string} id - The unique identifier for the new todo.
 * @param {string} title - The title of the new todo.
 * @param {string} userId - The unique identifier for the user.
 * @returns {Promise<Todo>} - A promise that resolves with the newly created todo.
 */
export const dbCreateTodo = async (id: string, title: string, userId: string): Promise<Todo> => {
  const result = await query(`INSERT INTO "todo" (id, title, completed, created_at, user_id) VALUES ($1, $2, $3, NOW(), $4) RETURNING *`, [
    id,
    title,
    false,
    userId,
  ]);
  return result.rows[0] as Todo;
};

/**
 * Updates an existing todo by its ID and user ID.
 *
 * Searches for the todo by 'id' and 'user_id' and updates its 'title' with the provided value.
 *
 * @param {string} id - The unique identifier for the todo to update.
 * @param {string} title - The new title for the todo.
 * @param {string} userId - The unique identifier for the user.
 * @returns {Promise<Todo>} - A promise that resolves with the updated todo.
 */
export const dbUpdateTodo = async (id: string, title: string, userId: string): Promise<Todo> => {
  const result = await query(`UPDATE "todo" SET title = $1 WHERE id = $2 AND user_id = $3 RETURNING *`, [title, id, userId]);
  return result.rows[0] as Todo;
};

/**
 * Deletes a todo by its ID and user ID.
 *
 * Searches for the todo by 'id' and 'user_id' and deletes it from the database.
 *
 * @param {string} id - The unique identifier for the todo to delete.
 * @param {string} userId - The unique identifier for the user.
 * @returns {Promise<Todo>} - A promise that resolves with the deleted todo.
 */
export const dbDeleteTodo = async (id: string, userId: string): Promise<Todo> => {
  const result = await query(`DELETE FROM "todo" WHERE id = $1 AND user_id = $2 RETURNING *`, [id, userId]);
  return result.rows[0] as Todo;
};
