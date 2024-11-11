'use client'
import LoginForm from "@/components/LoginForm";
import LoginSignupLayout from "@/components/LoginSignupLayout";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store";
import { LoaderComponent } from "@/components/LoaderComponent";

export default function LoginPage() {

    const loading = useSelector((state: RootState) => state.loading.loading);
    
    return (
        <LoginSignupLayout>
            <main className="py-24 px-10">
                {loading ? <div className="flex justify-center items-center h-screen"><LoaderComponent /></div> : <LoginForm />}
            </main>
        </LoginSignupLayout>
    );
}