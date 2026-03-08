export type TodoStatus = "PENDING" | "DOING" | "DONE";

export type TodoItem = {
  id: number;
  status: TodoStatus;
  title: string;
  description: string;
};
