"use client";
import { TOKEN } from "@lib/util/config";
import { useState, useEffect } from "react";

interface Todo {
  id: string;
  title: string;
  completed: boolean;
}

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  // Fetch all todos
  const fetchTodos = async () => {
    setIsLoading(true);
    const token = sessionStorage.getItem(TOKEN);
    try {
      const response = await fetch("/api/todos", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.json();
      setTodos(data); // Set todos with fetched data
    } catch (error) {
      console.error("Error fetching todos:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Add a new todo
  const addTodo = async (title: string) => {
    setIsLoading(true);
    const token = sessionStorage.getItem(TOKEN);
    try {
      const response = await fetch("/api/todos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ title }),
      });
      if (response.ok) {
        fetchTodos(); // Refresh todos after adding a new one
      }
    } catch (error) {
      console.error("Error adding todo:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Edit an existing todo
  const editTodo = async (id: string, title: string) => {
    setIsLoading(true);
    const token = sessionStorage.getItem(TOKEN);
    try {
      const response = await fetch("/api/todos", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id, title }),
      });
      if (response.ok) {
        fetchTodos(); // Refresh todos after editing
      }
    } catch (error) {
      console.error("Error editing todo:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Delete a todo
  const deleteTodo = async (id: string) => {
    setIsLoading(true);
    const token = sessionStorage.getItem(TOKEN);
    try {
      const response = await fetch("/api/todos", {
        method: "DELETE",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ id }),
      });
      if (response.ok) {
        setTodos((prevTodos) => prevTodos.filter((todo) => todo.id !== id)); // Remove the deleted todo from the state
      }
    } catch (error) {
      console.error("Error deleting todo:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchTodos(); // Fetch todos on component mount
  }, []);

  return { todos, addTodo, editTodo, deleteTodo, isLoading };
}
