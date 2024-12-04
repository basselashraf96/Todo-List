import { Model } from "objection";
import { UserModel } from "./user";

export class TodoModel extends Model {
  static get tableName() {
    return "todo";
  }

  // Define the model's properties
  id!: string;
  title!: string;
  completed!: boolean;
  created_at!: number;
  user_id!: string; // Foreign key to the user

  // JSON Schema for validating the properties of a Todo
  static get jsonSchema() {
    return {
      type: "object",
      required: ["title", "user_id"], // 'title' and 'user_id' are required fields

      properties: {
        id: { type: "string" },
        title: { type: "string", maxLength: 255 },
        completed: { type: "boolean", default: false },
        created_at: { type: "integer" },
        user_id: { type: "string" }, // Foreign key to user
      },
    };
  }

  // Relationship mapping: A todo belongs to a user
  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: UserModel,
        join: {
          from: "todo.user_id",
          to: "user.id",
        },
      },
    };
  }
  override $beforeInsert() {
    this.id = crypto.randomUUID();
    this.created_at = Date.now();
  }
}
