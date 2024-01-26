export interface ToDo {
  id: string;
  task: string;
}

class ApiClient {
  baseUrl: string;

  constructor() {
    this.baseUrl = process.env.TODO_BACKEND_URL || '';
  }

  async getTodos() {
    const response = await fetch(`${this.baseUrl}/todos`, {
      cache: 'no-store',
    });
    return response.json();
  }

  async createTodo(todo: ToDo) {
    const response = await fetch(`${this.baseUrl}/todos`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    });
    return response.json();
  }

  async updateTodo(id: string, todo: ToDo) {
    const response = await fetch(`${this.baseUrl}/todos/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(todo),
    });
    return response.json();
  }

  async deleteTodo(id: string) {
    const response = await fetch(`${this.baseUrl}/todos/${id}`, {
      method: 'DELETE',
    });
    if (!response.ok) {
      throw new Error(`Error: ${response.statusText}`);
    }
    return response.json();
  }
}

const apiClientInstance = new ApiClient();

export default apiClientInstance;
