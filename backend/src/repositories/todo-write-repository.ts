import { PutCommand } from '@aws-sdk/lib-dynamodb';
import { v4 } from 'uuid';
import { docClient } from '../dynamoDocClient.ts';
import type { TodoItemCreate } from '../types/todo-item-create-type.ts';

export const createTodo = async (todoItemCreate: TodoItemCreate) => {
  const { status, title, description } = todoItemCreate;

  await docClient.send(
    new PutCommand({
      TableName: process.env.DYNAMODB_TODO_TABLE,
      Item: {
        todoId: v4(),
        status,
        title,
        description,
      },
    }),
  );
};
