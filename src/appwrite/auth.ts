'use client'
import { account, ID } from './conf'

const login = async ({email, password}: {email: string, password: string}) => {
    try {
        const session = await account.createEmailPasswordSession(email, password)
        return session
    } catch (error) {
        throw error
    }
}

const signup = async ({email, password, name}: {email: string, password: string, name: string}) => {
    try {
        const user = await account.create(ID.unique(), email, password, name)
        const session = await login({email, password})
        return user
    } catch (error) {
        throw error
    }
}

const getCurrentUser = async () => {
    try {
        const user = await account.get()
        return user
    } catch (error) {
        throw error
    }
}
const logout = async () => {
    try {
        await account.deleteSessions()
    } catch (error) {
        throw error
    }
}

export { login, signup, logout, getCurrentUser }

