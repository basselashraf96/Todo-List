import { Todo } from "@lib/util/types";
import { query } from "./db";

/**
 * Fetches all todos from the database.
 * 
 * The results are ordered by the 'created_at' field in ascending order.
 * 
 * @returns {Promise<Todo[]>} - A promise that resolves with the list of todos.
 */
export const getAllTodos = async (): Promise<Todo[]> => {
  const result = await query('SELECT * FROM todos ORDER BY created_at ASC');
  return result.rows as Todo[]; // Typecast the result as an array of Todo objects
};

/**
 * Inserts a new todo into the database.
 * 
 * Generates a unique ID for the new todo and sets 'completed' to false by default.
 * 
 * @param {string} id - The unique identifier for the new todo.
 * @param {string} title - The title of the new todo.
 * @returns {Promise<Todo>} - A promise that resolves with the newly created todo.
 */
export const addTodo = async (id: string, title: string): Promise<Todo> => {
  const result = await query('INSERT INTO todos (id, title, completed, created_at) VALUES ($1, $2, $3, NOW()) RETURNING *', [id, title, false]);
  return result.rows[0] as Todo;
};

/**
 * Updates an existing todo by its ID.
 * 
 * Searches for the todo by 'id' and updates its 'title' with the provided value.
 * 
 * @param {string} id - The unique identifier for the todo to update.
 * @param {string} title - The new title for the todo.
 * @returns {Promise<Todo>} - A promise that resolves with the updated todo.
 */
export const updateTodo = async (id: string, title: string): Promise<Todo> => {
  const result = await query('UPDATE todos SET title = $1 WHERE id = $2 RETURNING *', [title, id]);
  return result.rows[0] as Todo;
};

/**
 * Deletes a todo by its ID.
 * 
 * Searches for the todo by 'id' and deletes it from the database.
 * 
 * @param {string} id - The unique identifier for the todo to delete.
 * @returns {Promise<Todo>} - A promise that resolves with the deleted todo.
 */
export const deleteTodo = async (id: string): Promise<Todo> => {
  const result = await query('DELETE FROM todos WHERE id = $1 RETURNING *', [id]);
  return result.rows[0] as Todo;
};
