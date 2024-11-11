'use client'
import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { NavBarMenu } from "@/components/NavBarMenu";
import StoreProvider from "@/components/StoreProvider"; // Import StoreProvider
import { Toaster } from "sonner";
import { useRouter } from "next/navigation";
const geistSans = localFont({
  src: "./fonts/GeistVF.woff",
  variable: "--font-geist-sans",
  weight: "100 900",
});
const geistMono = localFont({
  src: "./fonts/GeistMonoVF.woff",
  variable: "--font-geist-mono",
  weight: "100 900",
});

// Optional: Define metadata if needed
// export const metadata: Metadata = {
//   title: "Your App Title",
//   description: "Your App Description",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const router = useRouter();
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
        suppressHydrationWarning
      >
        <StoreProvider> {/* Wrap children with StoreProvider */}
          <div className="antialiased min-h-screen w-full dark:bg-black bg-white dark:bg-grid-white/[0.1] bg-grid-black/[0.1] relative flex flex-col py-40 items-center justify-center overflow-x-hidden">
            <div className="navbar" style={{ height: 'var(--navbar-height)' }}>
              <NavBarMenu />
            </div>
            <div className="flex justify-center items-center space-x-4">
              <button onClick={() => router.back()} className="px-8 py-2 rounded-md bg-teal-500 text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-teal-500">
                Move backward
              </button>
              <button onClick={() => router.forward()} className="px-8 py-2 rounded-md bg-teal-500 text-white font-bold transition duration-200 hover:bg-white hover:text-black border-2 border-transparent hover:border-teal-500">
                Move forward
              </button>
            </div>
            {children}
            <Toaster />
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
