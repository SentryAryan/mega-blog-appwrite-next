import React, { useState } from 'react'
import { getAllPosts } from '@/appwrite/database'
import { useEffect } from 'react'
import { PostCard } from '@/components/3dPostCard'
import { LoaderComponent } from './LoaderComponent'

function AllPosts() {

    const [posts, setPosts] = useState<any[]>([])
    const [loading, setLoading] = useState<boolean>(false)


    const fetchPosts = async () => {
        try {
            setLoading(true)
            const allPosts = await getAllPosts()
            setPosts(allPosts.documents)
            setLoading(false)
        } catch (error) {
            console.log(error)
            setLoading(false)
        }
    }

    useEffect(() => {
        fetchPosts()
    }, [])

    return (
        <>
            {loading ? <LoaderComponent /> : (
                posts.length > 0 ? (
                    <div className='w-full flex flex-wrap gap-4'>
                        {posts.map((post: any) => (
                            <PostCard key={post.$id} post={post} />
                        ))}
                    </div>
                ) : (
                    <div>No posts found</div>
                )
            )}
        </>
    )
}

export default AllPosts