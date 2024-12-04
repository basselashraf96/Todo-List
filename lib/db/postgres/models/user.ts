import { Model } from "objection";
import { TodoModel } from "./todo";

export class UserModel extends Model {
  static get tableName() {
    return "user";
  }

  // Define the model's properties
  id!: string;
  username!: string;
  password_hash!: string;
  created_at!: number;
  name!: string;
  email!: string;

  static get jsonSchema() {
    return {
      type: "object",
      required: ["username", "password_hash", "name", "email"],

      properties: {
        id: { type: "string" },
        username: { type: "string", maxLength: 50 },
        password_hash: { type: "string", maxLength: 255 },
        created_at: { type: "integer" },
        name: { type: "string", maxLength: 255 },
        email: { type: "string", maxLength: 255 },
      },
    };
  }
  static get relationMappings() {
    return {
      todos: {
        relation: Model.HasManyRelation,
        modelClass: TodoModel,
        join: {
          from: "user.id",
          to: "todo.user_id",
        },
      },
    };
  }
  // Relationship mapping: A user can have many todos
  override $beforeInsert() {
    this.id = crypto.randomUUID();
    this.created_at = Date.now();
  }
}
