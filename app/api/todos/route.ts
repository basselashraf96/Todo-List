import { dbCreateTodo, dbDeleteTodo, dbFetchTodos, dbUpdateTodo } from "@lib/db";
import { NextResponse } from "next/server";
import { v4 as uuidv4 } from "uuid";

/**
 * GET /api/todos
 *
 * Fetches all todos for a specific user from the database.
 * The results are ordered by the 'created_at' field in ascending order.
 *
 * @param {Request} request - The incoming request object, containing headers with 'user-id'.
 * @returns {Promise<NextResponse>} - JSON response containing the list of todos or an error message.
 */
export async function GET(request: Request): Promise<NextResponse> {
  const userId = request.headers.get("user-id"); // Ensure 'user-id' is passed in headers
  if (!userId) {
    return NextResponse.json({ error: "Missing 'user-id' header" }, { status: 401 });
  }

  try {
    const getTodos = await dbFetchTodos(userId);
    return NextResponse.json(getTodos);
  } catch (error) {
    return NextResponse.json({ message: "Error fetching todos", error }, { status: 500 });
  }
}

/**
 * POST /api/todos
 *
 * Inserts a new todo into the database for a specific user.
 * Generates a unique UUID for the 'id' field and sets 'completed' to false by default.
 *
 * @param {Request} request - The incoming request object, containing the todo title and user ID in JSON format.
 * @returns {Promise<NextResponse>} - JSON response containing the new todo item or an error message.
 */
export async function POST(request: Request): Promise<NextResponse> {
  const { title, userId }: { title: string; userId: string } = await request.json();

  try {
    const newTodo = await dbCreateTodo(uuidv4(), title, userId);
    return NextResponse.json(newTodo);
  } catch (error) {
    return NextResponse.json({ message: "Error creating todo", error }, { status: 500 });
  }
}

/**
 * PUT /api/todos
 *
 * Updates an existing todo by its ID and user ID.
 * Searches for the todo by 'id' and 'user_id' and updates its 'title' with the provided value.
 *
 * @param {Request} request - The incoming request object, containing the 'id', 'title', and 'userId' in JSON format.
 * @returns {Promise<NextResponse>} - JSON response containing the updated todo or an error message.
 */
export async function PUT(request: Request): Promise<NextResponse> {
  const { id, title, userId }: { id: string; title: string; userId: string } = await request.json();
  try {
    const updatedTodo = await dbUpdateTodo(id, title, userId);
    return NextResponse.json(updatedTodo);
  } catch (error) {
    return NextResponse.json({ message: "Error updating todo", error }, { status: 500 });
  }
}

/**
 * DELETE /api/todos
 *
 * Deletes a todo by its ID and user ID.
 * Searches for the todo by 'id' and 'user_id' and deletes it from the database.
 *
 * @param {Request} request - The incoming request object, containing the 'id' and 'userId' in JSON format.
 * @returns {Promise<NextResponse>} - JSON response containing the deleted todo or an error message.
 */
export async function DELETE(request: Request): Promise<NextResponse> {
  const { id, userId }: { id: string; userId: string } = await request.json();
  try {
    const deletedTodo = await dbDeleteTodo(id, userId);
    return NextResponse.json(deletedTodo);
  } catch (error) {
    return NextResponse.json({ message: "Error deleting todo", error }, { status: 500 });
  }
}
