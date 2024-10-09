import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

export default function LoginSignupLayout({ children }: { children: React.ReactNode }) {

    const router = useRouter();
    const authStatus = useSelector((state: RootState) => state.auth.status);

    useEffect(() => {
        if (authStatus) {
            router.push("/");
        }
    }, [authStatus, router]);

    return (
        <>
            {authStatus ? (
                <div className="flex justify-center items-center h-screen">
                    Already Logged In
                </div>
            ) : (
                <>{children}</>
            )}
        </>
    );
}