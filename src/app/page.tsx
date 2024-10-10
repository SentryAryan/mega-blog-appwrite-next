'use client'
import { useEffect } from 'react'
import { getCurrentUser } from '@/appwrite/auth'
import { useDispatch } from 'react-redux'
import { login, logout } from '@/redux/slices/authSlice'
import { useSelector } from 'react-redux'
import { setLoading } from '@/redux/slices/loadingSlice'
import { LoaderComponent } from '@/components/LoaderComponent'
import { RootState } from '@/redux/store'
import AuthLayout from '@/components/AuthLayout'
import AllPosts from '@/components/AllPosts'

export default function Home() {
  const dispatch = useDispatch()
  const loading = useSelector((state: RootState) => state.loading.loading)
  const authStatus = useSelector((state: RootState) => state.auth.status)
  const fetchCurrentUser = async () => {
    try {
      const userData = await getCurrentUser()
      dispatch(login(userData))
      dispatch(setLoading(false))
    } catch (error) {
      console.log(error)
      dispatch(logout())
      dispatch(setLoading(false))
    }
  }

  useEffect(() => {
    fetchCurrentUser()
  }, [authStatus])

  return (
    <>
      {loading ? (
        <LoaderComponent />
      ) : (
        <AuthLayout>
          <AllPosts />
        </AuthLayout>
      )}
    </>
  )
}
