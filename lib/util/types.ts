export type DbQueryParam = string | number | boolean | null;

/**
 * To do Interface
 */
export interface Todo {
  id: string;
  title: string;
  completed: boolean;
  created_at: Date;
}

/**
 * User Interface for Database
 */
export interface User {
  id: string;
  name: string;
  email: string;
  username: string;
  password_hash: string;
  created_at: Date;
}

/**
 * Input structure for user creation
 */
export interface UserInput {
  name: string;
  email: string;
  username: string;
  password: string;
  confirmPassword: string;
}
