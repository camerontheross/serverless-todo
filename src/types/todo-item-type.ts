import type z from 'zod';
import type { TodoItemSchema } from '../schemas/todo-item-schema.ts';

export type TodoItem = z.infer<typeof TodoItemSchema>;
