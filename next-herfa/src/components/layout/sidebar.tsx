"use client";

import Image from "next/image";
import { redirect, usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import MenuItems from "@/utils/menuItems";

function Sidebar() {
    const { data: session, status } = useSession();
    const userRole = session?.user?.role;
    const currentPage = usePathname();

    if (status === "loading") {
        return null;
    }

    const menuItems = MenuItems(userRole!);

    return (
        <div className="fixed left-0 top-0 z-20 h-screen w-fit border-r border-gray-200/30 bg-gradient-to-b from-white via-gray-50/50 to-gray-100/30 shadow-xl backdrop-blur-sm dark:border-gray-600/30 dark:from-gray-900 dark:via-gray-800/50 dark:to-gray-700/30 lg:w-64">
            {/* Logo Section */}
            <div className="flex h-16 items-center justify-between border-b border-gray-200/50 bg-white/80 p-4 backdrop-blur-md dark:border-gray-600/50 dark:bg-gray-800/80">
                <div className="flex items-center gap-2 transition-transform duration-200 hover:scale-105">
                    <div className="flex items-center gap-2.5">
                        <button
                            className="group flex items-center gap-2.5 font-brand text-2xl no-underline transition-all duration-300 hover:text-main-600 dark:text-white dark:hover:text-main-500 lg:text-3xl"
                            onClick={() => {
                                // Navigate to the appropriate dashboard home page
                                if (userRole === "worker") {
                                    redirect("/worker-dashboard");
                                } else {
                                    redirect("/dashboard");
                                }
                            }}
                        >
                            <div className="relative">
                                <Image
                                    width={48}
                                    height={48}
                                    src="/logos/logo.gif"
                                    alt="Logo"
                                    className="rounded-full object-cover object-center ring-2 ring-main-200 transition-all duration-300 group-hover:ring-main-400 dark:ring-gray-600 dark:group-hover:ring-main-500 lg:h-12 lg:w-12"
                                />
                                <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-main-400 to-main-600 opacity-0 blur transition-opacity duration-300 group-hover:opacity-20"></div>
                            </div>
                            <span className="hidden bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent dark:from-white dark:to-gray-200 lg:inline">
                                7erfa
                            </span>
                        </button>
                    </div>
                </div>
            </div>

            {/* Navigation Section */}
            <nav className="space-y-1 p-3 lg:p-4">
                {menuItems.map((item) => (
                    <div
                        key={item.page}
                        className={`group relative flex cursor-pointer items-center justify-center overflow-hidden rounded-xl p-3 transition-all duration-300 lg:justify-normal lg:gap-3 ${
                            currentPage === item.page
                                ? "bg-gradient-to-r from-main-500 to-main-600 text-white shadow-lg shadow-main-500/25 dark:shadow-main-600/20"
                                : "text-gray-600 hover:bg-white/70 hover:text-gray-800 hover:shadow-md dark:text-gray-300 dark:hover:bg-gray-700/50 dark:hover:text-white"
                        }`}
                        onClick={() => {
                            if (currentPage !== item.page) redirect(item.page);
                        }}
                    >
                        {/* Background gradient for active state */}
                        {currentPage === item.page && (
                            <div className="absolute inset-0 bg-gradient-to-r from-main-500 to-main-600" />
                        )}

                        {/* Content */}
                        <div className="relative z-10 flex items-center justify-center gap-3 lg:justify-normal">
                            <div
                                className={`transition-colors duration-300 ${
                                    currentPage === item.page
                                        ? "text-white"
                                        : "text-gray-500 group-hover:text-main-600 dark:text-gray-400 dark:group-hover:text-main-400"
                                }`}
                            >
                                <item.icon size={20} />
                            </div>
                            <span
                                className={`hidden font-medium transition-colors duration-300 lg:inline ${
                                    currentPage === item.page
                                        ? "text-white"
                                        : "text-gray-700 group-hover:text-gray-900 dark:text-gray-300 dark:group-hover:text-white"
                                }`}
                            >
                                {item.title}
                            </span>
                        </div>

                        {/* Active indicator */}
                        {currentPage === item.page && (
                            <div className="right-2 hidden h-2 w-2 rounded-full bg-white/80 lg:absolute lg:block" />
                        )}
                    </div>
                ))}
            </nav>

            {/* Bottom decoration */}
            <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-main-400 via-main-500 to-main-600 opacity-60"></div>
        </div>
    );
}

export default Sidebar;
