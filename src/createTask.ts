import type { APIGatewayProxyResult } from 'aws-lambda';

import { Logger } from '@aws-lambda-powertools/logger';

import { ApiGatewayV2Envelope } from '@aws-lambda-powertools/parser/envelopes/api-gatewayv2';
import { parser } from '@aws-lambda-powertools/parser/middleware';
import middy from '@middy/core';
import { TodoItemCreateSchema } from './schemas/todo-item-create-schema.ts';
import type { TodoItemCreate } from './types/todo-item-create-type.ts';
import { createTodo } from './repositories/todo-write-repository.ts';

const logger = new Logger();

export const createTask = middy()
  // validate that an event body has been given to us
  .use(parser({ schema: TodoItemCreateSchema, envelope: ApiGatewayV2Envelope }))
  .handler(async (todoItem: TodoItemCreate): Promise<APIGatewayProxyResult> => {
    try {
      await createTodo({
        status: todoItem.status,
        title: todoItem.title,
        description: todoItem.description,
      });

      return {
        statusCode: 201,
        body: JSON.stringify(`${todoItem.title} has been successfully added.`),
      };
    } catch (error) {
      if (error instanceof Error) {
        logger.error('Error saving task', error);
      } else {
        logger.error('Unknown error saving task', { error });
      }

      return {
        statusCode: 500,
        body: JSON.stringify({ message: `Internal Server Error` }),
      };
    }
  });
