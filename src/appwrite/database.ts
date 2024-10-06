import { databaseId, usersCollectionId } from "@/config/config"
import { databases, ID, Query } from "./conf"

const createPost = async ({title, content, featuredImage, userId, status}: {title: string, content: string, featuredImage: string, userId: string, status: string}) => {
    try {
        const post = await databases.createDocument(
            databaseId || '', 
            usersCollectionId || '', 
            ID.unique(), 
            {
                title,
                content,
                featuredImage,
                userId,
                status
            }
        )
        return post
    } catch (error) {
        throw error
    }
}

const updatePost = async (postId: string, {title, content, featuredImage, userId, status}: {title: string, content: string, featuredImage: string, userId: string, status: string}) => {
    try {
        const post = await databases.updateDocument(
            databaseId || '', 
            usersCollectionId || '', 
            postId, 
            {
                title, 
                content, 
                featuredImage, 
                userId, 
                status
            }
        )
        return post
    } catch (error) {
        throw error
    }
}

const deletePost = async (postId: string) => {
    try {
        const post = await databases.deleteDocument(
            databaseId || '', 
            usersCollectionId || '', 
            postId
        )
        return post
    } catch (error) {
        throw error
    }
}

const getPost = async (postId: string) => {
    try {
        const post = await databases.getDocument(
            databaseId || '', 
            usersCollectionId || '', 
            postId
        )
        return post
    } catch (error) {
        throw error
    }
}

const getAllPosts = async (queries = [Query.equal('status', 'active')]) => {
    try {
        const posts = await databases.listDocuments(
            databaseId || '', 
            usersCollectionId || '',
            queries
        )
        return posts
    } catch (error) {
        throw error
    }
}
export { createPost, updatePost, deletePost, getPost, getAllPosts }
