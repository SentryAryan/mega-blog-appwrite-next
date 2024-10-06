'use client'
const projectId = process.env.NEXT_PUBLIC_APPWRITE_PROJECT_ID;
const apiEndpoint = process.env.NEXT_PUBLIC_APPWRITE_API_ENDPOINT;
const databaseId = process.env.NEXT_PUBLIC_APPWRITE_DATABASE_ID;
const usersCollectionId = process.env.NEXT_PUBLIC_APPWRITE_USERS_COLLECTION_ID;
const bucketId = process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID;

export { projectId, apiEndpoint, databaseId, usersCollectionId, bucketId };
