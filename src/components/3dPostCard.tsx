"use client";

import Image from "next/image";
import React, { useEffect, useState } from "react";
import { CardBody, CardContainer, CardItem } from "@/components/ui/3d-card";
import Link from "next/link";
import parse from "html-react-parser";
import { getFilePreview } from "@/appwrite/storage";

export default function PostCard1({ post }: { post: { $id: string, title: string, featuredImage: string, content: string } }) {

  const { $id, title, featuredImage, content } = post;
  const [imgUrl, setImgUrl] = useState<string | null>(null);

  async function fetchImage() {
    try {
      const imgUrl = await getFilePreview(featuredImage);
      setImgUrl(imgUrl.href);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchImage();
  }, [featuredImage])

  return (
    <CardContainer className="inter-var">
      <CardBody className="bg-gray-50 relative group/card  dark:hover:shadow-2xl dark:hover:shadow-emerald-500/[0.1] dark:bg-black dark:border-white/[0.2] border-black/[0.1] w-auto sm:w-[30rem] h-auto rounded-xl p-6 border  ">
        <CardItem
          translateZ="50"
          className="text-xl font-bold text-neutral-600 dark:text-white"
        >
          {title}
        </CardItem>
        <CardItem
          as="p"
          translateZ="60"
          className="text-neutral-500 text-sm max-w-sm mt-2 dark:text-neutral-300"
        >
          {`${parse(content.substring(0, 100))}...`}
        </CardItem>
        <CardItem translateZ="100" className="w-full mt-4">
          {imgUrl && (
            <Image
              src={imgUrl || ""}
              height="1000"
              width="1000"
              className="h-60 w-full object-cover rounded-xl group-hover/card:shadow-xl"
              alt={title}
            />
          )}
        </CardItem>
        <div className="flex justify-between items-center mt-20">
          <CardItem
            translateZ={20}
            as={Link}
            href="/"
            target="__blank"
            className="px-4 py-2 rounded-xl text-xs font-normal dark:text-white"
          >
            Home →
          </CardItem>
          <CardItem
            translateZ={20}
            as={Link}
            href={`/post/${$id}`}
            className="px-4 py-2 rounded-xl bg-black dark:bg-white dark:text-black text-white text-xs font-bold"
          >
            See more
          </CardItem>
        </div>
      </CardBody>
    </CardContainer>
  );
}
