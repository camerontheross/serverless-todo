import { TodoStatus } from '../todo-status-type.ts';

export const isValidTodoStatus = (value: unknown): value is TodoStatus =>
  typeof value === 'string' && value in TodoStatus;
