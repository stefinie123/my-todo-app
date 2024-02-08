"use client"; // This is a client component

import { ToDo } from "@/types/todo";
import Link from "next/link";
import Image from "next/image";
import "./globals.css";
import { useEffect, useState } from "react";
import checkList from "@/public/checklist.png";
import addIcon from "@/public/addIcon.png";
import deleteIcon from "@/public/delete.png";

interface TodoItemProps {
  todo: ToDo;
  onDelete: (id: number) => void;
  handleToggleDone: (id: number) => void;
}

const TodoItem = (props: TodoItemProps) => {
  const { todo, onDelete, handleToggleDone } = props;
  return (
    <div className="flex justify-between bg-white rounded-full p-1 w-2/5">
      <li
        key={todo.id}
        className="relative rounded-md py-3 px-5 flex items-center gap-x-3"
      >
        <input
          type="checkbox"
          checked={todo.done}
          className="size-6"
          onChange={() => handleToggleDone(todo.id!)}
        />
        <h2
          className={
            todo.done
              ? "text-md font-medium leading-5 text-gray-700 line-through"
              : "text-md font-medium leading-5 text-gray-700"
          }
        >
          {todo.task}
        </h2>
      </li>
      <button
        className="float-right bg-red-500 text-white rounded-full self-center text-xs p-2 mr-2"
        onClick={() => onDelete(todo.id!)}
      >
        <Image src={deleteIcon} alt="delete icon" />
      </button>
    </div>
  );
};

export default function Home() {

  const [todos, setTodos] = useState<ToDo[]>([]);

  useEffect(() => {
    fetch("/api/todos")
      .then((res) => res.json())
      .then((data) => setTodos(data));
  }, []);

  const handleDeleteTodo = (id: number) => {
    fetch("/api/todos", {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then(() => setTodos(todos.filter((todo) => todo.id !== id)));
  };

  const handleToggleDone = (id: number) => {
    fetch("/api/todos", {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ id }),
    })
      .then((res) => res.json())
      .then(() =>
        setTodos(
          todos.map((todo) =>
            todo.id === id ? { ...todo, done: !todo.done } : todo
          )
        )
      );
  };

  return (
    <main className="flex flex-col min-h-screen items-center justify-center p-24 w-screen h-screen">
      <div className="flex gap-x-4  my-24 items-center">
        <Image src={checkList} alt="checklist icon" />
        <h1 className="text-5xl font-bold text-gray-700">ToDo List </h1>
      </div>

      <div className="mb-32 mx-auto flex-col flex gap-y-2 w-full justify-center">
        <ul className="flex-col flex gap-y-2 w-full justify-center items-center">
          {todos.map((todo: ToDo) => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onDelete={handleDeleteTodo}
              handleToggleDone={handleToggleDone}
            />
          ))}
        </ul>
        {todos.length == 0 && <div className="text-center">No ToDos Found</div>}
        <div className="mt-8 text-center">
          <Link
            href="/create"
            className="inline-block bg-blue-900 border-blue-900 text-white py-2 px-4 rounded-full hover:bg-blue-700 mx-auto"
          >
            <div className="flex items-center gap-x-2">
                <Image src={addIcon} alt="checklist icon" />
                Create New
            </div>
          </Link>
        </div>
      </div>
    </main>
  );
}
