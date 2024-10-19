export type DbQueryParam = string | number | boolean | null;

export interface Todo {
    id: string;
    title: string;
    completed: boolean;
    created_at: Date; // assuming 'created_at' is a timestamp
  }