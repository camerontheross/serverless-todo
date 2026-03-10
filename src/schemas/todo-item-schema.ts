import { z } from 'zod';
import { TodoStatus } from '../types/todo-status-type.ts';

export const TodoItemSchema = z.object({
  id: z.int().positive(),
  status: z.enum(TodoStatus),
  title: z.string(),
  description: z.string().optional(),
});
