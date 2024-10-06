"use client";
import React, { useState } from "react";
import { HoveredLink, Menu, MenuItem, ProductItem } from "@/components/ui/navbar-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";

export function NavBarMenu() {
    return (
        <Navbar className="top-2" />
    );
}

function Navbar({ className }: { className?: string }) {
    const [active, setActive] = useState<string | null>(null);
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
                <MenuItem setActive={setActive} active={active} item="Logout">
                    <div className="flex flex-col space-y-4 text-sm">
                        <button>
                            Logout
                        </button>
                    </div>
                </MenuItem>
            </Menu>
        </div>
    );
}