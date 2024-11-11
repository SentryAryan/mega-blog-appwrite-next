import { RootState } from "@/redux/store";
import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { getCurrentUser } from "@/appwrite/auth";
import { login, logout } from "@/redux/slices/authSlice";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const authStatus = useSelector((state: RootState) => state.auth.status);

    useEffect(() => {
        const checkAuth = async () => {
            try {
                const userData = await getCurrentUser();
                if (userData) {
                    dispatch(login(userData));
                } else {
                    dispatch(logout());
                    router.replace("/login");
                }
            } catch (error) {
                dispatch(logout());
                router.replace("/login");
            }
        };
        
        checkAuth();
    }, [dispatch, router]);

    if (!authStatus) {
        return null;
    }

    return <>{children}</>;
};

export default AuthLayout;