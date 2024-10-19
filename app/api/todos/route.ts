import { dbCreateTodo, dbDeleteTodo, dbFetchTodos, dbUpdateTodo } from '@lib/db';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

/**
 * GET /api/todos
 * 
 * Fetches all todos from the database.
 * The results are ordered by the 'created_at' field in ascending order.
 * 
 * @returns {Promise<NextResponse>} - JSON response containing the list of todos or an error message.
 */
export async function GET(): Promise<NextResponse> {
    try {
        const getTodos = await dbFetchTodos();
        return NextResponse.json(getTodos);
    } catch (error) {
        return NextResponse.json({ message: 'Error fetching todos', error }, { status: 500 });
    }
}

/**
 * POST /api/todos
 * 
 * Inserts a new todo into the database.
 * Generates a unique UUID for the 'id' field and sets 'completed' to false by default.
 * 
 * @param {Request} request - The incoming request object, containing the todo title in JSON format.
 * @returns {Promise<NextResponse>} - JSON response containing the new todo item or an error message.
 */
export async function POST(request: Request): Promise<NextResponse> {
    const { title }: { title: string } = await request.json();
    try {
        const newTodo = await dbCreateTodo(uuidv4(), title);
        return NextResponse.json(newTodo);
    } catch (error) {
        return NextResponse.json({ message: 'Error creating todo', error }, { status: 500 });
    }
}

/**
 * PUT /api/todos
 * 
 * Searches for the todo by 'id' and updates its 'title' with the provided value.
 * 
 * @param {Request} request - The incoming request object, containing the 'id' and 'title' to update in JSON format.
 * @returns {Promise<NextResponse>} - JSON response containing the updated todo or an error message.
 */
export async function PUT(request: Request): Promise<NextResponse> {
    const { id, title }: { id: string, title: string } = await request.json();
    try {
        const updatedTodo = await dbUpdateTodo(id, title);
        return NextResponse.json(updatedTodo);
    } catch (error) {
        return NextResponse.json({ message: 'Error updating todo', error }, { status: 500 });
    }
}

/**
 * DELETE /api/todos
 * 
 * Deletes a todo by its 'id'.
 * 
 * @param {Request} request - The incoming request object, containing the 'id' of the todo to delete in JSON format.
 * @returns {Promise<NextResponse>} - JSON response containing the deleted todo or an error message.
 */
export async function DELETE(request: Request): Promise<NextResponse> {
    const { id }: { id: string } = await request.json();
    try {
        const deletedTodo = await dbDeleteTodo(id);
        return NextResponse.json(deletedTodo);
    } catch (error) {
        return NextResponse.json({ message: 'Error deleting todo', error }, { status: 500 });
    }
}
