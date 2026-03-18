import type { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { isValidTodoStatus } from "./types/utils/is-valid-todo-status.ts";
import { getTodosByStatus } from "./repositories/todo-read-repository.ts";
import type { TodoStatus } from "./types/todo-status-type.ts";

export const getTasksByStatus = async (
  event: APIGatewayEvent,
): Promise<APIGatewayProxyResult> => {
  if (event.pathParameters === null || event.pathParameters === undefined) {
    return { statusCode: 400, body: JSON.stringify("Bad Request") };
  }

  if (!isValidTodoStatus(event.pathParameters.status)) {
    return { statusCode: 400, body: JSON.stringify("Bad Request") };
  }

  try {
    const requestedStatus: TodoStatus = event.pathParameters.status;
    const result = await getTodosByStatus(requestedStatus);

    if (!result.Count || result.Count === 0) {
      return { statusCode: 404, body: JSON.stringify("Resource not found") };
    }
    if (!result.Items || result.Items === undefined) {
      return { statusCode: 404, body: JSON.stringify("Resource not found") };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({
        total: result.Count,
        items: result.Items.map((todoItem) => ({
          title: todoItem.title,
          status: todoItem.status,
          description: todoItem.description,
        })),
      }),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: `Internal Server Error: ${error}` }),
    };
  }
};
