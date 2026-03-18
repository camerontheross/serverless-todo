import { DynamoDBClient } from '@aws-sdk/client-dynamodb';
import { DynamoDBDocumentClient } from '@aws-sdk/lib-dynamodb';

// Reuse the SDK client across invocations, but keep this module free of operation-specific imports.
const client = new DynamoDBClient({});

export const docClient = DynamoDBDocumentClient.from(client);
