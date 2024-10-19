import { AddTodo } from "@lib/components";

const AddTodoPage = () => {
  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4">To-Do List</h1>
      <AddTodo />
    </div>
  );
};

export default AddTodoPage;
