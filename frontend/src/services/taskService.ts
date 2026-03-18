const apiUrl: string = import.meta.env.VITE_TODO_API_URL;

// Remove and import from shared/ once refactored
export interface Task {
  id: number;
  title: string;
  status: string;
  description?: string;
}

export const fetchTaskByStatus = async (status: string): Promise<Task[]> => {
  const response = await fetch(`${apiUrl}/status/${status}`);

  if (!response.ok) {
    throw new Error(`Failed to fetch tasks: ${response.statusText}`);
  }

  const taskList = await response.json();

  return taskList.items;
};
