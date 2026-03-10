import { z } from 'zod';
import type { TodoItemCreateSchema } from '../schemas/todo-item-create-schema.ts';

export type TodoItemCreate = z.infer<typeof TodoItemCreateSchema>;
