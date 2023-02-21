import MoreIcon from "../../../public/svg/more.svg";
import Tasks from "@/app/components/tasks";

async function getTodo(id) {
  const res = await fetch(`http://localhost:3000/api/todos/${id}`);

  return await res.json();
}

export default async function TasksPage({ params: { todoid } }) {
  const { todo, tasks } = await getTodo(todoid);

  return (
    <div className="container my-14 max-w-3xl mx-auto lg:px-6">
      <header className="task-list-header">
        <h2>{todo.name}</h2>
        <button type="button" className="icon-button">
          <MoreIcon className="w-5 h-5" />
        </button>
      </header>

      <section>
        <Tasks tasks={tasks} todoId={todoid} />
      </section>
    </div>
  );
}
