'use client'
import AuthLayout from '@/components/AuthLayout'
import AllPosts from '@/components/AllPosts'

export default function Home() {
  return (
    <AuthLayout>
      <AllPosts />
    </AuthLayout>
  )
}
