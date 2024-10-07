'use client'
import LoginSignupLayout from "@/components/LoginSignupLayout";
import SignupForm from "@/components/SignupForm";

export default function SignupPage() {
    return (
        <LoginSignupLayout>
            <main className="py-24 px-10">
                <SignupForm />
            </main>
        </LoginSignupLayout>
    );
}