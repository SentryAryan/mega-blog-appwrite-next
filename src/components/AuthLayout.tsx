import { RootState } from "@/redux/store";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
    const authStatus = useSelector((state: RootState) => state.auth.status);
    const router = useRouter();

    useEffect(() => {
        if (!authStatus) {
            router.push("/");
        }
    }, [authStatus, router]);

    return (
        <>
            {authStatus ? (
                <>
                    {children}
                </>
            ) : (
                <div className="flex justify-center items-center h-screen">
                    Please Login
                </div>
            )}
        </>
    );
};

export default AuthLayout;