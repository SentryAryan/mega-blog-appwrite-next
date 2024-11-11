"use client";
import React, { useState, useEffect } from "react";
import { PinContainer } from "@/components/ui/3d-pin";
import { getFilePreview } from "@/appwrite/storage";
import Image from "next/image";

export function PostCard2({ post }: { post: { $id: string, title: string, featuredImage: string, content: string } }) {
    const { $id, title, featuredImage, content } = post;
    const [imgUrl, setImgUrl] = useState<string | null>(null);

    useEffect(() => {
        const fetchImage = async () => {
            try {
                const preview = await getFilePreview(featuredImage);
                setImgUrl(preview.href);
            } catch (error) {
                console.error("Error loading image:", error);
            }
        };
        
        if (featuredImage) {
            fetchImage();
        }
    }, [featuredImage]);

    return (
        <div className="h-[40rem] w-full flex items-center justify-center">
            <PinContainer title={title} href={`/post/${$id}`}>
                <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem]">
                    <h3 className="max-w-xs !pb-2 !m-0 font-bold text-base text-slate-100">
                        {title}
                    </h3>
                    <div className="text-base !m-0 !p-0 font-normal">
                        <span className="text-slate-500">
                            {content}
                        </span>
                    </div>
                    {imgUrl && (
                        <Image 
                            src={imgUrl} 
                            alt={title} 
                            width={200} 
                            height={200}
                            className="object-cover"
                        />
                    )}
                </div>
            </PinContainer>
        </div>
    );
}
