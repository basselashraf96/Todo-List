import { Knex } from "knex";

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function up(knex: Knex): Promise<void> {
   return knex.schema
     .createTable('user', (table) => {
       table.uuid('id').primary(); // Primary key
       table.string('username', 50).notNullable().unique(); // Username (unique, not null)
       table.string('password_hash', 255).notNullable(); // Password hash (not null)
       table.timestamp('created_at').defaultTo(knex.fn.now()); // Created at timestamp (default to current timestamp)
       table.string('name', 255).notNullable(); // Name (not null)
       table.string('email', 255).notNullable(); // Email (not null)
     })
     .createTable('todo', (table) => {
       table.uuid('id').primary(); // Primary key
       table.string('title', 255).notNullable(); // Title column (not null)
       table.boolean('completed').defaultTo(false).notNullable(); // Completed column (default to false)
       table.timestamp('created_at').defaultTo(knex.fn.now()); // Created at timestamp (default to now)
       
       // Define the user_id column as not nullable
       table.uuid('user_id').notNullable(); // User ID (not nullable)
 
       // Foreign key constraint
       table.foreign('user_id').references('id').inTable('user').onDelete('CASCADE'); // Reference to user table
     });
 };
 

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
export async function down(knex: Knex): Promise<void> {
   return knex.schema
   .dropTableIfExists('todo') // Drop the 'todo' table first (which references 'user')
   .dropTableIfExists('user'); // Drop the 'user' table after the dependent table is removed
};
