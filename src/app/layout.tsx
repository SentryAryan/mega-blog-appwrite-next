import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { NavBarMenu } from "@/components/NavBarMenu";
import StoreProvider from "@/components/StoreProvider"; // Import StoreProvider
import { Toaster } from "sonner";

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
export const metadata: Metadata = {
  title: "Your App Title",
  description: "Your App Description",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased dark`}
        suppressHydrationWarning
      >
        <StoreProvider> {/* Wrap children with StoreProvider */}
          <div className="antialiased min-h-screen w-full dark:bg-black bg-white dark:bg-grid-white/[0.1] bg-grid-black/[0.1] relative flex items-center justify-center">
            <div className="navbar" style={{ height: 'var(--navbar-height)' }}>
              <NavBarMenu />
            </div>
            {children}
            <Toaster />
          </div>
        </StoreProvider>
      </body>
    </html>
  );
}
