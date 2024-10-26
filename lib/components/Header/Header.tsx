"use client";
import { useAuth } from "@lib/hooks/useAuth";

export function Header() {
  const { signedIn, signOut } = useAuth();
  return (
    <header className="p-5 flex justify-between w-full items-center bg-[#e1e1e1]">
      <h1 className="text-2xl font-bold">Todo List</h1>
      <div className="flex items-center gap-3">{signedIn && <button onClick={signOut}>Sign Out</button>}</div>
    </header>
  );
}
