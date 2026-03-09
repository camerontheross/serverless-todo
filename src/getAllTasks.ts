import { DynamoDBClient, QueryCommand } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";
import type { APIGatewayEvent, APIGatewayProxyResult } from "aws-lambda";

const client = new DynamoDBClient();
const docClient = DynamoDBDocumentClient.from(client);

export const getAllTasks = async (): Promise<APIGatewayProxyResult> => {
  try {
    const result = await docClient.send(
      new ScanCommand({
        TableName: process.env.DYNAMODB_TODO_TABLE,
      }),
    );

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
