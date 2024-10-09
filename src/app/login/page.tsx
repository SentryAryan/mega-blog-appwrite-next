'use client'
import LoginForm from "@/components/LoginForm";
import LoginSignupLayout from "@/components/LoginSignupLayout";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

export default function LoginPage() {
    return (
        <LoginSignupLayout>
            <main className="py-24 px-10">
                <LoginForm />
            </main>
        </LoginSignupLayout>
    );
}