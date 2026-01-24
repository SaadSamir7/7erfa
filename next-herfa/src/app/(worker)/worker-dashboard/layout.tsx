import { ReactNode } from "react";
import Sidebar from "@/components/layout/sidebar";
import DashboardHeader from "@/components/layout/header";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function Layout({ children }: { children: ReactNode }) {
    const session = await auth();
    const user = session?.user;

    if (!session) {
        redirect("/login");
    }

    if (user?.role !== "worker") {
        redirect("/dashboard");
    }

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Sidebar Component */}
            <Sidebar user={user} />
            {/* Main Content Area */}
            <div className="ml-20 flex flex-1 flex-col lg:ml-64">
                {/* Header Component */}
                <DashboardHeader user={user} />
                <main className="min-h-0 flex-1 overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50/30 to-main-50/40 px-2 dark:from-gray-900 dark:via-gray-800 dark:to-main-900/20 md:px-6">
                    <div className="mx-auto h-full w-full max-w-7xl">
                        {children}
                    </div>
                </main>
            </div>
        </div>
    );
}
