'use client'
import { createSlice } from "@reduxjs/toolkit";

interface User {
    $id: string; // User ID
    $createdAt: string; // User creation date in ISO 8601 format
    $updatedAt: string; // User update date in ISO 8601 format
    name: string; // User name
    password: string; // Hashed user password
    hash: string; // Password hashing algorithm
    hashOptions: object; // Password hashing algorithm configuration
    registration: string; // User registration date in ISO 8601 format
    status: boolean; // User status (enabled or disabled)
    labels: string[]; // Labels for the user
    passwordUpdate: string; // Password update time in ISO 8601 format
    email: string; // User email address
    phone: string; // User phone number in E.164 format
    emailVerification: boolean; // Email verification status
    phoneVerification: boolean; // Phone verification status
    mfa: boolean; // Multi-factor authentication status
    prefs: Record<string, any>; // User preferences as a key-value object
    targets: Array<{ // A user-owned message receiver
        provider: string; // The provider of the target (e.g., email, phone)
        target: string; // The target value (e.g., email address or phone number)
    }>; 
    accessedAt: string; // Most recent access date in ISO 8601 format
}

export const authSlice = createSlice({
    name: "auth",
    initialState: {
        status: false,
        userData: null as User | null, 
    },
    reducers: {
        login: (state, action) => {
            state.status = true;
            state.userData = action.payload;
        },
        logout: (state) => {
            state.status = false;
            state.userData = null;
        },  
    },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;

