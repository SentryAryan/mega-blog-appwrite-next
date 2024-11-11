import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store";
import { getCurrentUser } from "@/appwrite/auth";
import { login, logout } from "@/redux/slices/authSlice";
import { setLoading } from "@/redux/slices/loadingSlice";
export default function LoginSignupLayout({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const dispatch = useDispatch();
    const authStatus = useSelector((state: RootState) => state.auth.status);
    const loading = useSelector((state: RootState) => state.loading.loading);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const userData = await getCurrentUser();
                if (userData) {
                    dispatch(setLoading(true));
                    dispatch(login(userData));
                    router.replace("/");
                }
            } catch (error) {
                dispatch(logout());
            }
        };
        
        checkAuth();
    }, [dispatch, router]);

    if (authStatus) {
        return null;
    }

    return <>{children}</>;
}