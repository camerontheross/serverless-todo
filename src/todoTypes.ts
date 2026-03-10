export const TodoStatus = {
  PENDING: 'PENDING',
  DOING: 'DOING',
  DONE: 'DONE',
} as const;

import { z } from 'zod';

export const TodoItemSchema = z.object({
  id: z.int().positive(),
  status: z.enum(TodoStatus),
  title: z.string(),
  description: z.string().optional(),
});

export type TodoItem = z.infer<typeof TodoItemSchema>;

export const TodoItemCreateSchema = TodoItemSchema.omit({
  // let the server generate the id
  id: true,
});

export type TodoItemCreate = z.infer<typeof TodoItemCreateSchema>;
