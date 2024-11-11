'use client'
import React from 'react'
import { PostForm } from '@/components/PostForm'
import AuthLayout from '@/components/AuthLayout'

function AddPostPage() {
  return (
    <AuthLayout>
      <div className='pt-20 px-10 w-screen min-h-screen overflow-hidden'>
        <PostForm />
      </div>
    </AuthLayout>
  )
}

export default AddPostPage