import { TodoList } from "@lib/components";

const HomePage = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">To-Do List</h1>
      <TodoList />
    </div>
  );
};

export default HomePage;
