"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSession } from "next-auth/react";
import { LogOut } from "lucide-react";
import { logout } from "@/lib/actions/auth";
import { useRouter } from "next/navigation";

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 0);
        };
        window.addEventListener("scroll", handleScroll);

        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    return (
        <header
            className={`fixed left-0 right-0 top-0 z-50 flex h-20 items-center justify-between px-5 transition-all duration-300 ease-in-out lg:justify-around lg:px-0 ${
                isScrolled
                    ? "bg-gradient-to-br from-main-600 to-main-500 text-white shadow-lg"
                    : "bg-transparent"
            }`}
        >
            <Logo />
            <Navbar />
            <Buttons />
        </header>
    );
}

export function Logo() {
    return (
        <div className="flex items-center gap-2 text-main-transparent">
            <Image src="/logos/logo.gif" alt="Logo" width={56} height={56} />
            <a
                href=""
                className="font-brand text-3xl font-medium transition-all duration-150 hover:scale-110 hover:text-white"
            >
                7erfa
            </a>
        </div>
    );
}

function Navbar() {
    return (
        <nav
            className={`hidden items-center gap-5 font-medium text-main-transparent lg:flex`}
        >
            <ul className="flex gap-5">
                <li className="transition-all duration-150 hover:scale-110 hover:text-white">
                    <a href="#about">About</a>
                </li>
                <li className="transition-all duration-150 hover:scale-110 hover:text-white">
                    <a href="#services">Services</a>
                </li>
                <li className="transition-all duration-150 hover:scale-110 hover:text-white">
                    <a href="#categories">Categories</a>
                </li>
                <li className="transition-all duration-150 hover:scale-110 hover:text-white">
                    <a href="#team">Team</a>
                </li>
            </ul>
        </nav>
    );
}

function Buttons() {
    const { data: session, status, update } = useSession();
    const router = useRouter();

    const handleLogout = async () => {
        await logout();
        await update();
        router.refresh();
    };

    // Show loading placeholder or empty space while checking authentication
    if (status === "loading") {
        return (
            <div className="hidden gap-2 lg:flex">
                <div className="h-11 w-32 animate-pulse rounded-full bg-main-transparent/20"></div>
            </div>
        );
    }

    // If user is authenticated and data is loaded, show dashboard button
    if (session?.user) {
        const dashboardPath =
            session.user.role === "worker" ? "/worker-dashboard" : "/dashboard";

        return (
            <div className="flex gap-2">
                <Link href={dashboardPath}>
                    <button className="cursor-pointer rounded-full bg-transparent px-4 py-3 text-base font-semibold text-main-transparent transition-all hover:scale-105 hover:bg-white hover:text-main-500">
                        Dashboard
                    </button>
                </Link>
                <button
                    className="cursor-pointer rounded-full bg-transparent px-4 py-3 text-base font-semibold text-main-transparent transition-all hover:scale-105 hover:bg-white hover:text-main-500"
                    onClick={handleLogout}
                >
                    <LogOut size={18} />
                </button>
            </div>
        );
    }

    // If user is not authenticated, show login and signup buttons
    return (
        <div className="flex gap-2">
            <Link href="/login">
                <button className="cursor-pointer rounded-full bg-transparent px-4 py-3 text-sm font-semibold text-main-transparent transition-all hover:scale-105 hover:bg-white hover:text-main-500 md:text-base">
                    Log In
                </button>
            </Link>
            <Link href="/register">
                <button className="hidden cursor-pointer rounded-full bg-transparent px-4 py-3 text-sm font-semibold text-main-transparent transition-all hover:scale-105 hover:bg-white hover:text-main-500 md:inline-block md:text-base">
                    Sign Up
                </button>
            </Link>
        </div>
    );
}
