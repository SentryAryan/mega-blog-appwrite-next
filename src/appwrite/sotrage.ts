import { storage, ID } from "./conf"
import { bucketId } from "../config/config"

const uploadFile = async (file: File) => {
    try {
        const uploadedFile = await storage.createFile(
            bucketId || '', 
            ID.unique(), 
            file
        )
        return uploadedFile
    } catch (error) {
        throw error
    }
}

const deleteFile = async (fileId: string) => {
    try {
        const deletedFile = await storage.deleteFile(
            bucketId || '', 
            fileId
        )
        return deletedFile
    } catch (error) {
        throw error
    }
}

const getFilePreview = (fileId:  string) => {
    const filePreviewUrl = storage.getFilePreview(
        bucketId || '', 
        fileId, 
    )
    return filePreviewUrl
}

export { uploadFile, deleteFile, getFilePreview }

