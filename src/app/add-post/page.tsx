'use client'
import React from 'react'
import { BackgroundBeamsWithCollision } from '@/components/ui/background-beams-with-collision'
import { PostForm } from '@/components/PostForm'
import AuthLayout from '@/components/AuthLayout'

function AddPostPage() {
  return (
    <AuthLayout>
      <div className='py-24 px-10 w-screen min-h-screen'>
        <PostForm />
      </div>
    </AuthLayout>
  )
}

export default AddPostPage