"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useDispatch, useSelector } from "react-redux";
import { logout as appwriteLogout } from "@/appwrite/auth";
import { RootState } from "@/redux/store";
import { logout } from "@/redux/slices/authSlice";
import { useRouter } from "next/navigation";
export function NavBarMenu() {
    return (
        <Navbar className="top-2" />
    );
}

function Navbar({ className }: { className?: string }) {
    const [active, setActive] = useState<string | null>(null);
    const dispatch = useDispatch();
    const router = useRouter();
    const authStatus = useSelector((state: RootState) => state.auth.status);

    const deleteSession = async () => {
        try {
            await appwriteLogout();
            dispatch(logout());
            router.push("/login");
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <div
            className={cn("fixed top-10 inset-x-0 max-w-2xl mx-auto z-50", className)}
        >
            <Menu setActive={setActive}>
                <Link href="/">
                    <MenuItem setActive={setActive} active={active} item="Home">
                        <div className="flex flex-col space-y-4 text-sm">
                            Move to home page!!
                        </div>
                    </MenuItem>
                </Link>
                {authStatus ? (
                    <>
                        <Link href="/add-post">
                            <MenuItem setActive={setActive} active={active} item="Add Post">
                                <div className="flex flex-col space-y-4 text-sm">
                                    Add a new post
                                </div>
                            </MenuItem>
                        </Link>
                        <Link href="/all-posts">
                            <MenuItem setActive={setActive} active={active} item="All Posts">
                                <div className="flex flex-col space-y-4 text-sm">
                                    View all posts
                                </div>
                            </MenuItem>
                        </Link>
                        <MenuItem setActive={setActive} active={active} item="Logout">
                            <div className="flex flex-col space-y-4 text-sm">
                                <button onClick={() => deleteSession()}>
                                    Logout
                                </button>
                            </div>
                        </MenuItem>
                    </>
                ) : (
                    <>
                        <Link href="/login">
                            <MenuItem setActive={setActive} active={active} item="Login">
                                <div className="text-center text-sm grid grid-cols-1 gap-10 p-4">
                                    Move to login page!!
                                </div>
                            </MenuItem>
                        </Link>
                        <Link href="/signup">
                            <MenuItem setActive={setActive} active={active} item="Signup">
                                <div className="flex flex-col space-y-4 text-sm">
                                    Move to signup page!!
                                </div>
                            </MenuItem>
                        </Link>
                    </>
                )}
            </Menu>
        </div>
    );
}
