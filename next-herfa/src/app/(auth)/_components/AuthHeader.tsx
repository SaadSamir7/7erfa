"use client";
import { Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";

function AuthHeader() {
    const { theme, setTheme } = useTheme();

    return (
        <div className="flex h-16 w-full items-center justify-between border-b p-2 shadow-sm dark:border-gray-600">
            <Link
                href="/"
                replace
                className="flex items-center gap-2.5 font-brand text-3xl text-black no-underline transition-colors duration-200 hover:text-main-600 dark:text-white dark:hover:text-main-600"
            >
                <Image
                    src="/logos/logo.gif"
                    alt="Logo"
                    className="rounded-full object-cover object-center"
                    height={48}
                    width={48}
                />
                <span>7erfa</span>
            </Link>
            <button
                className="flex h-8 w-8 items-center justify-center rounded-full text-stone-400 shadow-lg hover:text-stone-700 dark:hover:text-white"
                onClick={() => setTheme(theme === "dark" ? "light" : "dark")}
            >
                {theme === "dark" ? <Sun size={18} /> : <Moon size={18} />}
            </button>
        </div>
    );
}

export default AuthHeader;
