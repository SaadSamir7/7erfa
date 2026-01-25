"use client";

import { useEffect } from "react";
import Link from "next/link";
import { AlertTriangle, Home, RefreshCcw } from "lucide-react";

export default function Error({
    error,
    reset,
}: {
    error: Error & { digest?: string };
    reset: () => void;
}) {
    useEffect(() => {
        // Log the error to an error reporting service
        console.error(error);
    }, [error]);

    return (
        <div className="flex min-h-screen items-center justify-center bg-gradient-to-br from-orange-50 via-amber-50/30 to-main-50/40 px-4 dark:from-gray-900 dark:via-gray-800 dark:to-main-900/20">
            <div className="w-full max-w-2xl">
                <div className="rounded-2xl border border-orange-100 bg-white/80 p-8 shadow-xl backdrop-blur-sm dark:border-gray-700 dark:bg-gray-800/80 md:p-12">
                    {/* Icon */}
                    <div className="mb-6 flex justify-center">
                        <div className="rounded-full bg-red-100 p-6 dark:bg-red-900/30">
                            <AlertTriangle className="h-16 w-16 text-red-600 dark:text-red-400" />
                        </div>
                    </div>

                    {/* Title */}
                    <h1 className="mb-4 text-center text-4xl font-bold text-gray-900 dark:text-white">
                        Something Went Wrong
                    </h1>

                    {/* Description */}
                    <p className="mb-2 text-center text-lg text-gray-600 dark:text-gray-300">
                        Sorry, an unexpected error occurred while processing
                        your request
                    </p>

                    {/* Error Details */}
                    {error.message && (
                        <div className="mb-8 mt-6 rounded-lg bg-red-50 p-4 dark:bg-red-900/20">
                            <p className="font-mono text-sm text-red-800 dark:text-red-300">
                                {error.message}
                            </p>
                        </div>
                    )}

                    {/* Action Buttons */}
                    <div className="flex flex-col gap-4 sm:flex-row sm:justify-center">
                        <button
                            onClick={reset}
                            className="group flex items-center justify-center gap-2 rounded-lg bg-gradient-to-r from-orange-500 to-amber-500 px-6 py-3 font-semibold text-white shadow-lg transition-all hover:from-orange-600 hover:to-amber-600 hover:shadow-xl"
                        >
                            <RefreshCcw className="h-5 w-5 transition-transform group-hover:rotate-180" />
                            Try Again
                        </button>

                        <Link
                            href="/"
                            className="flex items-center justify-center gap-2 rounded-lg border-2 border-orange-500 bg-transparent px-6 py-3 font-semibold text-orange-600 transition-all hover:bg-orange-50 dark:border-orange-400 dark:text-orange-400 dark:hover:bg-orange-900/20"
                        >
                            <Home className="h-5 w-5" />
                            Back to Home
                        </Link>
                    </div>

                    {/* Footer Note */}
                    <p className="mt-8 text-center text-sm text-gray-500 dark:text-gray-400">
                        If the problem persists, please contact our support team
                    </p>
                </div>
            </div>
        </div>
    );
}
