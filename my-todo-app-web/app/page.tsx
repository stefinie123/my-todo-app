import Link from "next/link";
import apiClientInstance, { ToDo } from "../lib/api-client";

const TodoItem = ( props: { todo: ToDo }) => (
  <div className="border border-gray-300 p-4 my-4 rounded bg-gray-100 shadow-md">
    <h2 className="border-b border-gray-400 pb-2 mb-4 text-lg font-bold">ID: {props.todo.id}</h2>
    <p className="text-base text-gray-700">Task: {props.todo.task}</p>
  </div>
);

export default async function Home() {

  const todos = await apiClientInstance.getTodos();
  
  return (
    <main className="flex min-h-screen items-center justify-center p-24">
      <div className="mb-32 grid text-center lg:max-w-5xl lg:w-full lg:mb-0 lg:grid-cols-4 lg:text-left mx-auto">
        {todos.map((todo: ToDo) => (
          <TodoItem key={todo.id} todo={todo} />
        ))}
        {todos.length == 0 && <div className="text-center">No ToDos Found</div>}
        <div className="mt-8 text-center">
          <Link href="/create" className="inline-block bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-700 mx-auto">
            Create New
          </Link>
        </div>
      </div>
    </main>
  );
}

