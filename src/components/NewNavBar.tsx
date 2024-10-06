"use client";
import React from "react";
import Link from "next/link";

const NewNavBar = () => {
    return (
        <nav className="flex justify-between items-center p-4 bg-gray-800 text-white">
            <div className="text-lg font-bold">MyApp</div>
            <div className="space-x-4">
                <Link href="/" className="hover:underline">Home</Link>
                <Link href="/login" className="hover:underline">Login</Link>
                <Link href="/signup" className="hover:underline">Signup</Link>
                <Link href="/settings" className="hover:underline">Settings</Link>
            </div>
        </nav>
    );
};

export default NewNavBar;