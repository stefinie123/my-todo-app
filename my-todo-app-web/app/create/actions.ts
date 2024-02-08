"use server"

import apiClientInstance from "@/lib/api-client"
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createTodo(formData: FormData) {
    const todo = {
        id: formData.get('id') as string,
        task: formData.get('task') as string,
    }
     try {
        await fetch('/api/todos', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(todo),
          });
    } catch (error) {
        throw new Error(`Error: ${error}`);
    }

    revalidatePath('/');
    redirect('/');
}