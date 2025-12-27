"use client";
import { logout } from "@/lib/actions/auth";
import { LogOut, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";
import { redirect, useRouter } from "next/navigation";
import Image from "next/image";
import { useSession } from "next-auth/react";

const VITE_API_URL = process.env.VITE_API_URL;

function DashboardHeader() {
    const { data: session, update } = useSession();
    const user = session?.user;
    const router = useRouter();

    const { theme, setTheme } = useTheme();

    function handleProfileClick() {
        redirect("/worker-dashboard/profile");
    }
    const handleLogout = async () => {
        await logout();
        await update();
        router.refresh();
    };
    return (
        <header className="sticky top-0 z-50 border-b border-gray-100 bg-white/95 shadow-sm backdrop-blur-sm dark:border-gray-800 dark:bg-gray-900/95">
            <div className="ml-auto flex h-16 max-w-7xl items-center justify-end px-6">
                {/* Header Actions */}
                <div className="flex items-center space-x-4">
                    {/* Dark Mode Toggle */}
                    <button
                        onClick={() =>
                            setTheme(theme === "dark" ? "light" : "dark")
                        }
                        className="rounded-lg p-2 text-gray-600 transition-all duration-200 hover:bg-gray-50 hover:text-main-600 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-main-400"
                    >
                        {theme === "dark" ? (
                            <Sun size={20} />
                        ) : (
                            <Moon size={20} />
                        )}
                    </button>

                    {/* User Profile */}
                    <div
                        onClick={handleProfileClick}
                        className="flex cursor-pointer items-center space-x-3 rounded-lg bg-gray-50 px-3 py-2 transition-all duration-200 hover:bg-gray-100 dark:bg-gray-800 dark:hover:bg-gray-700"
                    >
                        {/* User Info */}
                        <div className="hidden text-right sm:block">
                            <p className="text-sm font-medium text-gray-900 dark:text-white">
                                {user?.name}
                            </p>
                            <p className="text-xs capitalize text-gray-500 dark:text-gray-400">
                                {user?.role}
                            </p>
                        </div>

                        {/* Profile Image */}
                        <div className="relative h-8 w-8 overflow-hidden rounded-full ring-2 ring-gray-200 dark:ring-gray-600">
                            {user?.image && user.image !== "default.png" ? (
                                <Image
                                    width={32}
                                    height={32}
                                    src={`${VITE_API_URL}/uploads/${user.image}`}
                                    alt={user.name!}
                                    className="h-full w-full object-cover"
                                />
                            ) : (
                                <Image
                                    width={32}
                                    height={32}
                                    src="/default.png"
                                    alt={user?.name || "Default User"}
                                    className="h-full w-full object-cover"
                                />
                            )}
                        </div>
                    </div>

                    {/* Logout Button */}
                    <button
                        onClick={handleLogout}
                        className="rounded-lg p-2 text-gray-600 transition-all duration-200 hover:scale-105 hover:bg-red-50 hover:text-red-600 dark:text-gray-400 dark:hover:bg-red-900/20 dark:hover:text-red-400"
                        title="Logout"
                    >
                        <LogOut size={20} />
                    </button>
                </div>
            </div>
        </header>
    );
}

export default DashboardHeader;
