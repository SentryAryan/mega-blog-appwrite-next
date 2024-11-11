"use client";
import React, { useState, useEffect } from "react";
import { getFilePreview } from "@/appwrite/storage";
import Image from "next/image";
import { BackgroundGradient } from "@/components/ui/background-gradient";
import parse from 'html-react-parser';
import Link from "next/link";

export function PostCard2({ post }: { post: { $id: string, title: string, featuredImage: string, content: string } }) {
    const { $id, title, featuredImage, content } = post;
    
    // Initialize imgUrl based on the synchronous getFilePreview
    const preview = featuredImage ? getFilePreview(featuredImage) : null;
    const [imgUrl, setImgUrl] = useState<string | null>(preview ? preview.href : null);
    const [imageError, setImageError] = useState(false);

    // Handle potential errors during initialization
    if (featuredImage && !preview) {
        setImageError(true);
    }

    const truncateContent = (text: string, wordLimit: number): string => {
        const words = text.split(' ');
        if (words.length > wordLimit) {
            return words.slice(0, wordLimit).join(' ') + '...';
        }
        return text;
    };

    return (
        <div key={$id} className='flex justify-center'>
            <BackgroundGradient className="rounded-[22px] max-w-sm w-[30rem] h-[30rem] p-4 sm:p-10 bg-white dark:bg-zinc-900 flex flex-col justify-between items-start">
                {imgUrl && !imageError ? (
                    <Image
                        priority
                        unoptimized
                        src={imgUrl}
                        alt={title}
                        height={400}
                        width={400}
                        className="object-cover w-full h-60 rounded-xl"
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <div className="w-full h-[400px] bg-gray-200 dark:bg-gray-800 rounded-lg flex items-center justify-center">
                        <span className="text-gray-400">Image not available</span>
                    </div>
                )}
                <h3 className="text-xl font-bold text-black dark:text-white mt-4">
                    {title}
                </h3>
                <Link href={`/post/${$id}`}>
                    <button className="mt-4 px-8 py-2 rounded-full relative 
                    bg-slate-700 text-teal-300 text-sm hover:shadow-2xl 
                    hover:shadow-white/[0.1] transition duration-200 border 
                    border-slate-600">
                        <div className="absolute inset-x-0 h-px w-1/2 mx-auto 
                        -top-px shadow-2xl bg-gradient-to-r from-transparent 
                        via-teal-500 to-transparent" />
                        <span className="relative z-20">
                            See More
                        </span>
                    </button>
                </Link>
            </BackgroundGradient>
        </div>
    );
}
