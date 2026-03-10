import { PutCommand } from "@aws-sdk/lib-dynamodb";
import type { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import type { TodoItem } from "./todoTypes.ts";
import { docClient } from "./dynamoClient.ts";

export const createTask = async (
  event: APIGatewayEvent,
): Promise<APIGatewayProxyResult> => {
  try {
    // validate that an event body has been given to us
    if (!event.body) {
      return { statusCode: 400, body: JSON.stringify("Missing request body") };
    }

    const rawBody: string = event.isBase64Encoded
      ? Buffer.from(event.body, "base64").toString()
      : event.body;

    const todoItem: TodoItem = JSON.parse(rawBody);

    if (!todoItem.id || !todoItem.title || !todoItem.status) {
      return {
        statusCode: 400,
        body: JSON.stringify("Missing required fields ID, STATUS, or TITLE"),
      };
    }

    await docClient.send(
      new PutCommand({
        TableName: process.env.DYNAMODB_TODO_TABLE,
        Item: {
          todoId: todoItem.id,
          status: todoItem.status,
          title: todoItem.title,
          description: todoItem.description,
        },
      }),
    );

    return {
      statusCode: 201,
      body: JSON.stringify(`${todoItem.title} has been successfully added.`),
    };
  } catch (error) {
    console.log(error);
    return {
      statusCode: 500,
      body: JSON.stringify({ message: `Internal Server Error: ${error}` }),
    };
  }
};
