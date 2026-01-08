"use client";

import { useRouter } from "next/router";

export default function Page() {
    const router = useRouter();
    return (
        <div className="flex min-h-[400px] items-center justify-center bg-white p-8 dark:bg-gray-900">
            <div className="w-full max-w-md text-center">
                {/* Error Icon */}
                <div className="mb-6 flex justify-center">
                    <div className="relative">
                        <div className="flex h-20 w-20 animate-pulse items-center justify-center rounded-full bg-red-100 dark:bg-red-900/30">
                            <svg
                                className="h-10 w-10 text-red-500 dark:text-red-400"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                                />
                            </svg>
                        </div>
                        <div className="absolute -right-1 -top-1 flex h-6 w-6 items-center justify-center rounded-full bg-red-500 dark:bg-red-600">
                            <span className="text-xs font-bold text-white">
                                !
                            </span>
                        </div>
                    </div>
                </div>

                {/* Error Content */}
                <div className="space-y-4">
                    <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
                        Oops! Something went wrong
                    </h3>
                    <div className="rounded-r-lg border-l-4 border-red-400 bg-red-50 p-4 dark:border-red-500 dark:bg-red-900/20">
                        <p className="text-sm font-medium text-red-700 dark:text-red-300">
                            Worker not found 🚫
                        </p>
                    </div>
                    )
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        We&apos;re sorry for the inconvenience. Please try
                        refreshing the page or contact support if the problem
                        persists.
                    </p>
                    {/* Action Buttons */}
                    <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
                        <button
                            onClick={() => router.reload()}
                            className="rounded-lg bg-main-600 px-6 py-2 font-medium text-white transition-all duration-200 hover:scale-105 hover:bg-main-700 hover:shadow-lg"
                        >
                            Try Again
                        </button>
                        <button
                            onClick={() => router.back()}
                            className="rounded-lg border border-gray-300 bg-gray-100 px-6 py-2 font-medium text-gray-700 transition-all duration-200 hover:scale-105 hover:bg-gray-200 dark:border-gray-600 dark:bg-gray-700 dark:text-gray-200 dark:hover:bg-gray-600"
                        >
                            Go Back
                        </button>
                    </div>
                </div>

                {/* Decorative Element */}
                <div className="mt-8 flex justify-center space-x-1">
                    <div className="h-2 w-2 animate-bounce rounded-full bg-main-400"></div>
                    <div
                        className="h-2 w-2 animate-bounce rounded-full bg-main-500"
                        style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                        className="h-2 w-2 animate-bounce rounded-full bg-main-600"
                        style={{ animationDelay: "0.2s" }}
                    ></div>
                </div>
            </div>
        </div>
    );
}
