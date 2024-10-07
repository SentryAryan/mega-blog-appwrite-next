'use client'
import LoginForm from "@/components/LoginForm";
import LoginSignupLayout from "@/components/LoginSignupLayout";

export default function LoginPage() {
    return (
        <LoginSignupLayout>
            <main className="py-24 px-10">
                <LoginForm />
            </main>
        </LoginSignupLayout>
    );
}