"use client"
import { useState, useEffect } from "react";

interface Todo {
    id: string;
    title: string;
    completed: boolean;
}

export function useTodos() {
    const [todos, setTodos] = useState<Todo[]>([]);

    // Fetch all todos
    const fetchTodos = async () => {
        try {
            const response = await fetch("/api/todos", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                },
            });
            const data = await response.json();
            setTodos(data);
        } catch (error) {
            console.error("Error fetching todos:", error);
        }
    };

    // Add a new todo
    const addTodo = async (title: string) => {
        try {
            const response = await fetch("/api/todos", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ title }),
            });
            if (response.ok) {
                fetchTodos(); // Refresh todos after adding a new one, usefull when adding a todo form is in the same page with the to do list.
            }
        } catch (error) {
            console.error("Error adding todo:", error);
        }
    };

    // Edit an existing todo
    const editTodo = async (id: string, title: string) => {
        try {
            const response = await fetch("/api/todos", {
                method: "PUT",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id, title }),
            });
            if (response.ok) {
                fetchTodos(); // Refresh todos after editing
            }
        } catch (error) {
            console.error("Error editing todo:", error);
        }
    };

    // Delete a todo
    const deleteTodo = async (id: string) => {
        try {
            const response = await fetch("/api/todos", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({ id }),
            });
            if (response.ok) {
                setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id)); // To match the data from the db without refreshing the page.
            }
        } catch (error) {
            console.error("Error deleting todo:", error);
        }
    };

    useEffect(() => {
        fetchTodos(); // Fetch todos on component mount
    }, []);

    return { todos, addTodo, editTodo, deleteTodo };
};
