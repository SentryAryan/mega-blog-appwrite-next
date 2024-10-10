"use client";
import React, { useRef } from "react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import {
    IconBrandGithub,
    IconBrandGoogle,
    IconBrandOnlyfans,
} from "@tabler/icons-react";
import { useForm } from "react-hook-form";
import { Controller } from "react-hook-form";
import { Editor as TinyMCEEditor } from 'tinymce'; // Import the correct Editor type
import { Editor } from '@tinymce/tinymce-react'; // Import the React component
import { useRouter } from "next/navigation";
import { uploadFile, deleteFile, getFilePreview } from "@/appwrite/sotrage";
import { useSelector } from "react-redux";
import { FileUpload } from "./ui/file-upload";
import { createPost, updatePost } from "@/appwrite/database";
import Select from "./Select";
import Image from "next/image";
export function PostForm({ post }: { post?: any }) {

    const { register, handleSubmit, control, formState: { errors } } = useForm({
        defaultValues: {
            title: post?.title || "",
            content: post?.content || "",
            status: post?.status || "",
            image: null, // Initialize the image field
        },
    });

    const editorRef = useRef<TinyMCEEditor | null>(null); // Use TinyMCEEditor for the ref type
    const userData = useSelector((state: any) => state.auth.userData);
    const plugins = [
        'advlist', 'autolink', 'lists', 'link', 'image', 'charmap', 'preview',
        'anchor', 'searchreplace', 'visualblocks', 'code', 'fullscreen',
        'insertdatetime', 'media', 'table', 'emoticons', 'help'
    ]
    const toolbar = 'undo redo | formatselect | ' +
        'bold italic backcolor | alignleft aligncenter ' +
        'alignright alignjustify | bullist numlist outdent indent | ' +
        'removeformat | help'

    const onPostFormSubmit = async (data: any) => {
        let dbPost;
        try {
            if (post) {
                let featuredImage = post.featuredImage;
                if (data.image[0]) {
                    const file = await uploadFile(data.image[0]);
                    await deleteFile(post.featuredImage);
                    featuredImage = file.$id;
                }
                dbPost = await updatePost(post.$id, {
                    ...data,
                    featuredImage
                });
            } else {
                const file = await uploadFile(data.image[0]);
                dbPost = await createPost({
                    ...data,
                    featuredImage: file.$id,
                    userId: userData.$id,
                });
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
            <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                Welcome to MegaBlogApp
            </h2>
            <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
                Create a new post
            </p>

            <form className="my-8 w-full" onSubmit={handleSubmit(onPostFormSubmit)}>
                <div className="flex flex-col space-y-2 mb-4">
                    {/* Title */}
                    <LabelInputContainer>
                        <Label htmlFor="title">Title</Label>
                        <Input id="title" placeholder="Title" type="text" {...register("title")} />
                    </LabelInputContainer>

                    {/* Content Editor */}
                    <Controller
                        name={'content'}
                        control={control}
                        render={({ field: { onChange, value } }) => (
                            <Editor
                                apiKey={process.env.NEXT_PUBLIC_TINY_API_KEY}
                                onInit={(evt, editor) => {
                                    editorRef.current = editor; // This will now work without type errors
                                }}
                                initialValue={post?.content || ""}
                                value={value}
                                onEditorChange={onChange}
                                init={{
                                    height: 500,
                                    menubar: true,
                                    plugins: plugins,
                                    toolbar: toolbar,
                                    content_style: "body { background-color: black; color: white; }", // Set background color to black and text color to white
                                    promotion: false,
                                    branding: false,
                                    convert_urls: false,
                                    sandbox_iframes: true,
                                    convert_unsafe_embeds: true
                                }}
                            />
                        )}
                    />

                    {/* Image Upload */}
                    <Controller
                        name={`image`}
                        control={control}
                        render={({ field: { onChange } }) => (
                            <FileUpload onChange={(files) => onChange(files)} />
                        )}
                    />

                    {/* Status */}
                    <Select
                        label="Status:"
                        options={['active', 'inactive']}
                        className="mb-4"
                        {...register("status")}
                        errors={errors}
                    />
                </div>

                <button
                    className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                    type="submit"
                >
                    {post ? "Update Post" : "Create Post"}
                    <BottomGradient />
                </button>

                <div className="bg-gradient-to-r from-transparent via-neutral-300 dark:via-neutral-700 to-transparent my-8 h-[1px] w-full" />

                {
                    post && (
                        <div className="flex flex-col space-y-2 mb-4">
                            <Image
                                src={`${getFilePreview(post?.featuredImage)}`}
                                alt={post?.title}
                                width={100}
                                height={100}
                            />
                        </div>
                    )
                }
            </form>
        </div>
    );
}

const BottomGradient = () => {
    return (
        <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </>
    );
};

const LabelInputContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};
