import { TodoItemSchema } from './todo-item-schema.ts';

export const TodoItemCreateSchema = TodoItemSchema.omit({
  // let the server generate the id
  id: true,
});
