import "./aside.styles.scss";
import TodoList from "./components/todo-list";

export default async function Aside() {
  const { todos } = await getTodos();

  return (
    <>
      <div className="my-5 px-6">
        <h2 className="text-2xl font-semibold">To-Do List App</h2>
      </div>
      
      <TodoList todos={todos} />
    </>
  );
}

const getTodos = async () => {
  let todos = await fetch("http://localhost:3000/api/todos/list");
  return todos.json();
};