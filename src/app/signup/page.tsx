'use client'
import LoginSignupLayout from "@/components/LoginSignupLayout";
import SignupForm from "@/components/SignupForm";
import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams-with-collision";

export default function SignupPage() {
    return (
        <LoginSignupLayout>
            <main className="py-24 px-10 w-screen min-h-screen">
                <SignupForm />
            </main>
        </LoginSignupLayout>
    );
}