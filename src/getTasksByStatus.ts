import type { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";
import { isValidTodoStatus, type TodoStatus } from "./todoTypes.ts";
import { QueryCommand, type QueryCommandInput } from "@aws-sdk/client-dynamodb";
import { docClient } from "./dynamoClient.ts";

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
    const queryInput: QueryCommandInput = {
      TableName: process.env.DYNAMODB_TODO_TABLE,

      ExpressionAttributeNames: {
        "#st": "status",
      },
      ExpressionAttributeValues: {
        ":s": { S: requestedStatus.toString() },
      },

      KeyConditionExpression: "#st = :s",
    };

    const queryCommand = new QueryCommand(queryInput);
    const result = await docClient.send(queryCommand);

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
          desctiption: todoItem.description,
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
