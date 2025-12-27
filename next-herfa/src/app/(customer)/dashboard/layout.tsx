import { ReactNode } from "react";
import Sidebar from "@/components/layout/sidebar";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function Layout({ children }: { children: ReactNode }) {
    const session = await auth();

    if (!session) {
        redirect("/login");
    }

    return (
        <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
            {/* Sidebar Component */}
            <Sidebar />

            {/* Main Content Area */}
            <div className="flex flex-1 flex-col lg:ml-64">
                {/* Header Component */}
                {/* <DashboardHeader /> */}
                <main className="min-h-0 flex-1 overflow-hidden bg-gradient-to-br from-orange-50 via-amber-50/30 to-main-50/40 dark:from-gray-900 dark:via-gray-800 dark:to-main-900/20">
                    <div className="h-full w-full">
                        <div className="h-full w-full">
                            <div className="mx-auto h-full w-full max-w-7xl">
                                <div className="h-full w-full">{children}</div>
                            </div>
                        </div>
                    </div>
                </main>
            </div>
        </div>
    );
}
