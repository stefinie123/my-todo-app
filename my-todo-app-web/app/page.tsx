import apiClientInstance, { ToDo } from "../lib/api-client";

const TodoItem = ( props: { todo: ToDo }) => (
  <div>
    <h2>{props.todo.task}</h2>
  </div>
);

export default async function Home() {

  const todos = await apiClientInstance.getTodos();
  
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left">
        {todos.map((todo: ToDo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
        {todos.length == 0 && "No ToDos Found"}
      </div>
    </main>
  );
}

