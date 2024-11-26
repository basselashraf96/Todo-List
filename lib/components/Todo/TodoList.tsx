"use client";

import { useTodos } from "@lib/hooks";
import Link from "next/link";
import { Oval } from "react-loader-spinner";

export function TodoList() {
  const { todos, deleteTodo, isLoading } = useTodos();

  return (
    <ul>
      {todos.length ? (
        todos.map((todo) => (
          <li key={todo.id} className="flex items-center w-52 justify-between">
            <span className="mr-2">{todo.title}</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => deleteTodo(todo.id)}
                className="text-red-500"
              >
                Delete
              </button>
              <Link href={`/addTodo?id=${todo.id}&title=${todo.title}`}>
                <button className="text-blue-500">Edit</button>
              </Link>
            </div>
          </li>
        ))
      ) : (
        <h1 className="text-white">
          {isLoading ? <Oval /> : "there are no todos yet"}
        </h1>
      )}
      <Link href="/addTodo">
        <button className="border-2 p-3 mt-2 border-black rounded-xl">Add To Do</button>
      </Link>
    </ul>
  );
}
