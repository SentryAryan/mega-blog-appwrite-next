'use client'
import React, { useEffect, useState } from 'react'
import AuthLayout from '@/components/AuthLayout'
import { useParams } from 'next/dist/client/components/navigation';
import { getPost } from '@/appwrite/database';
import { PostForm } from '@/components/PostForm';
import { useSelector, useDispatch } from 'react-redux';
import { setLoading } from '@/redux/slices/loadingSlice';
import { LoaderComponent } from '@/components/LoaderComponent';

function EditPostPage() {

  const { id } = useParams();
  const [post, setPost] = useState<any>(null);
  const loading = useSelector((state: any) => state.loading.loading);
  const dispatch = useDispatch();

  const fetchPost = async () => {
    try {
      dispatch(setLoading(true));
      const post = await getPost(id as string);
      setPost(post);
      dispatch(setLoading(false));
    } catch (error) {
      console.log(error)
    }
  }

  useEffect(() => {
    fetchPost();
  }, [id])

  return (
    <AuthLayout>
      {loading ? <LoaderComponent /> : post && <div className='pt-20 px-10 w-screen min-h-screen overflow-hidden'><PostForm post={post} /></div>}
    </AuthLayout>
  )
}

export default EditPostPage