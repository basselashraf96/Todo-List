import { Model } from "objection";
import { User } from "./user";

export class Todo extends Model {
  static get tableName() {
    return "todo";
  }

  // Define the model's properties
  id!: string;
  title!: string;
  completed!: boolean;
  created_at!: string;
  user_id!: string; // Foreign key to the user

  // JSON Schema for validating the properties of a Todo
  static get jsonSchema() {
    return {
      type: "object",
      required: ["title", "user_id"], // 'title' and 'user_id' are required fields

      properties: {
        id: { type: "string", format: "uuid" },
        title: { type: "string", maxLength: 255 },
        completed: { type: "boolean", default: false },
        created_at: { type: "string", format: "date-time" },
        user_id: { type: "string", format: "uuid" }, // Foreign key to user
      },
    };
  }

  // Relationship mapping: A todo belongs to a user
  static get relationMappings() {
    return {
      user: {
        relation: Model.BelongsToOneRelation,
        modelClass: User,
        join: {
          from: "todo.user_id",
          to: "user.id",
        },
      },
    };
  }
}
