"use client";
import React, { useState } from "react";
import { PinContainer } from "@/components/ui/3d-pin";
import { getFilePreview } from "@/appwrite/sotrage";
import Image from "next/image";
export function PostCard({ post }: { post: { $id: string, title: string, featuredImage: string, content: string } }) {

    const { $id, title, featuredImage, content } = post;

    return (
        <div className="h-[40rem] w-full flex items-center justify-center ">
            <PinContainer
                title={title}
                href={`/post/${$id}`}
            >
                <div className="flex basis-full flex-col p-4 tracking-tight text-slate-100/50 sm:basis-1/2 w-[20rem] h-[20rem] ">
                    <h3 className="max-w-xs !pb-2 !m-0 font-bold  text-base text-slate-100">
                        {title}
                    </h3>
                    <div className="text-base !m-0 !p-0 font-normal">
                        <span className="text-slate-500 ">
                            {content}
                        </span>
                    </div>
                    <Image src={`${getFilePreview(featuredImage)}`} alt={title} width={200} height={200} />
                </div>
            </PinContainer>
        </div>
    );
}
