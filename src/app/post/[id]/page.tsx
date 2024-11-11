"use client";
import React, { useState, useEffect } from "react";
import { ContainerScroll } from "@/components/ui/container-scroll-animation";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "@/redux/store";
import { deletePost, getPost } from "@/appwrite/database";
import { deleteFile, getFilePreview } from "@/appwrite/storage";
import parse from 'html-react-parser';
import { BackgroundGradient } from "@/components/ui/background-gradient";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { setLoading } from "@/redux/slices/loadingSlice";
import { LoaderComponent } from "@/components/LoaderComponent";
import AuthLayout from "@/components/AuthLayout";

export default function HeroScrollDemo() {

  const slug = useParams().id;
  const [post, setPost] = useState<any | null>(null);
  const userData = useSelector((state: RootState) => state.auth.userData);
  const loading = useSelector((state: RootState) => state.loading.loading);
  const isAuthor = post && userData ? post.userId === userData.$id : false;
  const router = useRouter();
  const dispatch = useDispatch();

  const handleDeletePost = async () => {
    try {
      const status = await deletePost(post?.$id);
      if (status) {
        await deleteFile(post?.featuredImage);
        router.push("/");
      }
    } catch (error) {
      console.log(error);
    }
  }

  const fetchPost = async () => {
    try {
      dispatch(setLoading(true));
      const response = await getPost(slug as string);
      setPost(response);
    } catch (error) {
      console.error(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    fetchPost();
  }, [slug]);

  return (
    <AuthLayout>
      <div className="flex flex-col overflow-hidden min-h-screen">
        {loading ? <LoaderComponent /> : post && (
          <ContainerScroll
            titleComponent={
              <>
                <h1 className="text-4xl font-semibold text-black dark:text-white">
                  <span className="text-4xl md:text-[6rem] font-bold mt-1 leading-none">
                    {post?.title}
                  </span>
                </h1>
              </>
            }
          >
            <Image
              src={post?.featuredImage ? getFilePreview(post?.featuredImage).href : ""}
              unoptimized
              alt={post?.title || "Default Alt Text"}
              height={720}
              width={1400}
              className="mx-auto rounded-2xl object-contain h-full w-full"
              draggable={false}
            />
          </ContainerScroll>)}


        {/* Updated Content Section as a Beautiful Card */}
        <div className="flex flex-col items-center justify-center">
          <BackgroundGradient className="rounded-[22px] w-full max-w-[60rem] p-4 sm:p-10 bg-white dark:bg-zinc-900">
            <div className="w-full flex flex-col space-y-4">
              <p className="w-full text-base sm:text-xl text-black mt-4 mb-2 dark:text-neutral-200">
                {parse(post?.content || "")}
              </p>
            </div>
            {isAuthor && (
              <div className="w-full flex flex-row space-x-4">
                <button className="mt-4 px-8 py-2 rounded-full relative 
              bg-slate-700 text-teal-300 text-sm hover:shadow-2xl 
              hover:shadow-white/[0.1] transition duration-200 border 
              border-slate-600" onClick={handleDeletePost}>
                  <div className="absolute inset-x-0 h-px w-1/2 mx-auto 
                -top-px shadow-2xl bg-gradient-to-r from-transparent 
                via-teal-500 to-transparent" />
                  <span className="relative z-20">
                    Delete Post
                  </span>
                </button>

                <Link href={`/edit-post/${post?.$id}`}>
                  <button className="mt-4 px-8 py-2 rounded-full relative 
               bg-slate-700 text-teal-300 text-sm hover:shadow-2xl 
               hover:shadow-white/[0.1] transition duration-200 border 
               border-slate-600">
                    <div className="absolute inset-x-0 h-px w-1/2 mx-auto 
            -top-px shadow-2xl bg-gradient-to-r from-transparent 
            via-teal-500 to-transparent" />
                    <span className="relative z-20">
                      Edit Post
                    </span>
                  </button>
                </Link>
              </div>
            )}
          </BackgroundGradient>
        </div>


        {/* Optional: Additional Sections or Components */}
        {/* ... any additional components or sections ... */}
      </div>
    </AuthLayout>
  );
}
