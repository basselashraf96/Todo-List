import { Model } from "objection";
import { Todo } from "./todo";

export class User extends Model {
  static get tableName() {
    return "user";
  }

  // Define the model's properties
  id!: string;
  username!: string;
  password_hash!: string;
  created_at!: string;
  name!: string;
  email!: string;

  static get jsonSchema() {
    return {
      type: "object",
      required: ["username", "password_hash", "name", "email"],

      properties: {
        id: { type: "string", format: "uuid" },
        username: { type: "string", maxLength: 50 },
        password_hash: { type: "string", maxLength: 255 },
        created_at: { type: "string", format: "date-time" },
        name: { type: "string", maxLength: 255 },
        email: { type: "string", format: "email", maxLength: 255 },
      },
    };
  }

  // Relationship mapping: A user can have many todos
  static get relationMappings() {
    return {
      todos: {
        relation: Model.HasManyRelation,
        modelClass: Todo,
        join: {
          from: "user.id",
          to: "todo.user_id",
        },
      },
    };
  }

}