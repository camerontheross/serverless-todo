import type { TodoItem, TodoStatus } from "@shared/types";

const apiUrl: string = import.meta.env.VITE_TODO_API_URL;

export const fetchTodoItemsByStatus = async (
  status: TodoStatus,
): Promise<TodoItem[]> => {
  const response = await fetch(`${apiUrl}/status/${status}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch tasks: ${response.statusText}`);
  }

  const todoList = await response.json();

  return todoList.items;
};
