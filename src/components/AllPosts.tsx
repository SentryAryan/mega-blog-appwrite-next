import React, { useState } from 'react'
import { getAllPosts } from '@/appwrite/database'
import { useEffect } from 'react'
import { LoaderComponent } from '@/components/LoaderComponent'
import { PostCard2 } from './PostCard2'

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
                    <div className='max-w-7xl mx-auto mt-10 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 py-4'>
                        {posts.map((post: any) => (
                            <PostCard2 key={post.$id} post={post} />
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