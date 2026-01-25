import Link from "next/link";
import { FileQuestion, Home, Briefcase, Star, User } from "lucide-react";

export default function WorkerNotFound() {
    return (
        <div className="flex min-h-full items-center justify-center px-4 py-16">
            <div className="w-full max-w-2xl">
                <div className="rounded-2xl border border-orange-100 bg-white/80 p-8 shadow-xl backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/80 md:p-12">
                    {/* Icon */}
                    <div className="mb-6 flex justify-center">
                        <div className="rounded-full bg-orange-100 p-6 dark:bg-orange-900/30">
                            <FileQuestion className="h-16 w-16 text-orange-600 dark:text-orange-400" />
                        </div>
                    </div>

                    {/* Error Code */}
                    <div className="mb-4 text-center">
                        <span className="bg-gradient-to-r from-orange-500 to-amber-500 bg-clip-text text-8xl font-bold text-transparent">
                            404
                        </span>
                    </div>

                    {/* Title */}
                    <h1 className="mb-4 text-center text-3xl font-bold text-gray-900 dark:text-white md:text-4xl">
                        Page Not Found
                    </h1>

                    {/* Description */}
                    <p className="mb-8 text-center text-lg text-gray-600 dark:text-gray-300">
                        Sorry, we couldn&apos;t find the page you&apos;re
                        looking for in your worker dashboard.
                    </p>

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                        <Link
                            href="/worker-dashboard"
                            className="group flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:from-orange-600 hover:to-amber-600 hover:shadow-xl"
                        >
                            <Home className="h-5 w-5" />
                            Dashboard Home
                        </Link>

                        <Link
                            href="/worker-dashboard/orders"
                            className="flex items-center justify-center gap-2 rounded-lg border-2 border-orange-500 bg-transparent px-6 py-3 font-semibold text-orange-600 transition-all hover:bg-orange-50 dark:border-orange-400 dark:text-orange-400 dark:hover:bg-orange-900/20"
                        >
                            <Briefcase className="h-5 w-5" />
                            My Tasks
                        </Link>
                    </div>

                    {/* Suggestions */}
                    <div className="mt-10 rounded-lg bg-orange-50 p-6 dark:bg-gray-700/50">
                        <h2 className="mb-4 text-center text-lg font-semibold text-gray-900 dark:text-white">
                            Quick Links:
                        </h2>
                        <div className="grid gap-3 sm:grid-cols-2">
                            <Link
                                href="/worker-dashboard"
                                className="flex items-center gap-3 rounded-lg bg-white p-4 text-gray-700 transition-all hover:bg-orange-50 hover:shadow-md dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                            >
                                <Home className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                                <span className="font-medium">Dashboard</span>
                            </Link>
                            <Link
                                href="/worker-dashboard/orders"
                                className="flex items-center gap-3 rounded-lg bg-white p-4 text-gray-700 transition-all hover:bg-orange-50 hover:shadow-md dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                            >
                                <Briefcase className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                                <span className="font-medium">My Tasks</span>
                            </Link>
                            <Link
                                href="/worker-dashboard/reviews"
                                className="flex items-center gap-3 rounded-lg bg-white p-4 text-gray-700 transition-all hover:bg-orange-50 hover:shadow-md dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                            >
                                <Star className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                                <span className="font-medium">Reviews</span>
                            </Link>
                            <Link
                                href="/worker-dashboard/profile"
                                className="flex items-center gap-3 rounded-lg bg-white p-4 text-gray-700 transition-all hover:bg-orange-50 hover:shadow-md dark:bg-gray-800 dark:text-gray-300 dark:hover:bg-gray-700"
                            >
                                <User className="h-5 w-5 text-orange-600 dark:text-orange-400" />
                                <span className="font-medium">My Profile</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
