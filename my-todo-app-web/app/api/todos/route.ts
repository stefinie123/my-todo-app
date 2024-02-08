import { ToDo } from '@/types/todo';
import { NextApiRequest, NextApiResponse } from 'next';

let todos: ToDo[] = [{
  id: 1,
  task: 'Buy Milk',
  done: false
}, {
  id: 2,
  task: 'Buy Bread',
  done: false
}, {
  id: 3,
  task: 'Buy Cheese',
  done: false
}, {
  id: 4,
  task: 'Buy Butter',
  done: false
}];

export async function GET() {
  console.log('GET');
  return Response.json(todos, { status: 200 });
}

export async function POST(req: Request) {
  const { id, task } = await req.json();
  const newTodo: ToDo = { id, task, done: false };
  todos.push(newTodo);
  return Response.json(newTodo, { status: 201 });
}

export async function DELETE(req: Request) {
  const { id } = await req.json();
  todos = todos.filter(todo => todo.id !== id);
  return Response.json({ message: 'Todo deleted successfully' }, { status: 200 });
}

export async function PUT(req: Request) {
  const { id } = await req.json();
  const index = todos.findIndex(todo => todo.id === id);
  if (index !== -1) {
    todos[index].done = !todos[index].done;
    return Response.json({ message: 'Todo updated successfully' }, { status: 200 });
  } else {
    return Response.json({ error: 'Todo not found' }, { status: 404 });
  }
}
