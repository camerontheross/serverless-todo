import { QueryCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { docClient } from "../dynamoDocClient";
import type { TodoStatus } from "@shared/types/";

export const getAllTodos = async () =>
  docClient.send(
    new ScanCommand({
      TableName: process.env.DYNAMODB_TODO_TABLE,
    }),
  );

export const getTodosByStatus = async (status: TodoStatus) =>
  docClient.send(
    new QueryCommand({
      TableName: process.env.DYNAMODB_TODO_TABLE,
      ExpressionAttributeNames: {
        "#st": "status",
      },
      ExpressionAttributeValues: {
        ":s": status,
      },
      KeyConditionExpression: "#st = :s",
    }),
  );
