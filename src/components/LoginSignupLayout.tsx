import React from "react";
import { useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "@/redux/store";
export default function LoginSignupLayout({ children }: { children: React.ReactNode }) {

    const router = useRouter();
    const authStatus = useSelector((state: RootState) => state.auth.status);

    if (authStatus) {
        router.push("/");
        return null;
    }

    return (
        <>
            {children}
        </>
    );
}