import { Knex } from "knex";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
export async function seed(knex: Knex): Promise<void> {

  /**
   * ?TRUNCATE?
   *  This SQL command removes all rows from the specified table (in this case, the todo table).
   *  It is a more efficient alternative to DELETE because it doesn't log individual row deletions or fire triggers (in most databases),
   *  and is typically much faster for large datasets.
   * ?CASCADE?
   * The CASCADE keyword ensures that any foreign key constraints that reference the table will also 
   * result in the deletion of related rows in other tables.
   */

  await knex.raw('TRUNCATE TABLE "todo" CASCADE');
  await knex.raw('TRUNCATE TABLE "user" CASCADE');

  // Insert sample data into 'user' table
  await knex('user').insert([
    {
      id: '11111111-1111-1111-1111-111111111111', // Example UUID (can use knex.fn.uuid() in PostgreSQL)
      username: 'johndoe',
      password_hash: 'hashedpassword1',
      created_at: Date.now(),  // Current timestamp
      name: 'John Doe',
      email: 'john.doe@example.com',
    },
    {
      id: '22222222-2222-2222-2222-222222222222',
      username: 'janedoe',
      password_hash: 'hashedpassword2',
      created_at: Date.now(),
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
    }
  ]);

  // Insert sample data into 'todo' table
  await knex('todo').insert([
    {
      id: '33333333-3333-3333-3333-333333333333',  // Example UUID (or knex.fn.uuid() in PostgreSQL)
      title: 'Buy groceries',
      completed: false,
      created_at: knex.fn.now(),
      user_id: '11111111-1111-1111-1111-111111111111', // Reference to 'user' table
    },
    {
      id: '44444444-4444-4444-4444-444444444444',
      title: 'Walk the dog',
      completed: true,
      created_at: knex.fn.now(),
      user_id: '22222222-2222-2222-2222-222222222222', // Reference to 'user' table
    },
    {
      id: '55555555-5555-5555-5555-555555555555',
      title: 'Complete the project',
      completed: false,
      created_at: knex.fn.now(),
      user_id: '11111111-1111-1111-1111-111111111111', // Reference to 'user' table
    }
  ]);
};