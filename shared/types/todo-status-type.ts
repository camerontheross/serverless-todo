export const TodoStatus = {
  PENDING: 'PENDING',
  DOING: 'DOING',
  DONE: 'DONE',
} as const;

export type TodoStatus = (typeof TodoStatus)[keyof typeof TodoStatus];
