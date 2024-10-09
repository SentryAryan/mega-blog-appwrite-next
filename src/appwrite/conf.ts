'use client'
import { Client, Account, Databases, Storage, Avatars, ID, Query } from 'appwrite';
import { projectId, apiEndpoint } from '@/config/config';

const client = new Client();

client.setEndpoint(apiEndpoint || '');
client.setProject(projectId || '');

const account = new Account(client);
const databases = new Databases(client);
const storage = new Storage(client);
const avatars = new Avatars(client);

export { client, account, databases, storage, avatars, ID, Query };
