import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient, PutCommand } from '@aws-sdk/lib-dynamodb';
import type { TodoItemCreate } from './todoTypes.ts';
import { v4 } from 'uuid';

// Declaring these outside of the function scope makes them static
// Significantly reduce overhead from when I had them inside of the function
const client = new DynamoDBClient({});
export const docClient: DynamoDBClient = DynamoDBDocumentClient.from(client);

// this would go in some kind of TodoRepository or TodoService
export const createTodo = async (todoItemCreate: TodoItemCreate) => {
  const { status, title, description } = todoItemCreate;

  const todoItem = {
    todoId: v4(),
    status,
    title,
    description,
  };

  await docClient.send(
    new PutCommand({
      TableName: process.env.DYNAMODB_TODO_TABLE,
      Item: todoItem,
    }),
  );
};
