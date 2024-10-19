"use client";

import { useTodos } from "@lib/hooks";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Oval } from "react-loader-spinner";

export function AddTodo() {
  const { addTodo, editTodo, isLoading } = useTodos();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [title, setTitle] = useState<string>(searchParams.get("title") || "");
  const id = searchParams.get("id");

  const handleSubmit = async () => {
    if (title.length === 0) return;

    try {
      if (id) {
        await editTodo(id, title); // Editing existing todo
      } else {
        await addTodo(title); // Adding new todo
      }
      router.push("/"); // Navigate back to the main page after successful operation
    } catch (error) {
      console.error("Error while handling todo:", error);
    }
  };

  return (
    <div className="flex items-center">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Add a new task"
        className="border p-2 flex-grow text-black"
        disabled={isLoading}
      />
      <button
        onClick={handleSubmit}
        className="bg-blue-500 text-white p-2 ml-2 rounded flex items-center justify-center"
        disabled={isLoading}
      >
        {isLoading ? (
          <Oval
            height={20}
            width={20}
            color="#ffffff"
            wrapperStyle={{}}
            visible={true}
          />
        ) : id ? (
          "Edit Task"
        ) : (
          "Add Task"
        )}
      </button>
    </div>
  );
}
