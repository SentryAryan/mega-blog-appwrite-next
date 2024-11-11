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

const getFilePreview = (fileId: string) => {
    if (!fileId) throw new Error('File ID is required');

    const result = storage.getFilePreview(
        process.env.NEXT_PUBLIC_APPWRITE_BUCKET_ID || '',
        fileId,
        undefined, // width
        undefined, // height
        undefined, // gravity
        undefined, // quality
        undefined, // borderWidth
        undefined, // borderColor
        undefined, // borderRadius
        undefined, // opacity
        undefined, // rotation
        undefined, // background
        undefined  // output
    );

    return result;
};

export { uploadFile, deleteFile, getFilePreview }

