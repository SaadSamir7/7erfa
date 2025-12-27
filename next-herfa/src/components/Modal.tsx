// components/Modal.tsx
"use client";
import { X } from "lucide-react";
import { useRouter } from "next/navigation";

export function Modal({
    children,
    title,
}: {
    children: React.ReactNode;
    title?: string;
}) {
    const router = useRouter();

    return (
        <div className="fixed inset-0 z-50 overflow-y-auto">
            <div
                className={`fixed inset-0 bg-black/50 backdrop-blur-sm`}
                onClick={() => router.back()}
            >
                <div className="flex min-h-full items-center justify-center p-4">
                    <div
                        className={`relative w-full max-w-lg rounded-2xl border border-gray-100 bg-white shadow-2xl dark:border-gray-700 dark:bg-gray-800`}
                    >
                        {/* Header */}
                        {title && (
                            <div className="flex items-center justify-between border-b border-gray-200 px-6 py-4 dark:border-gray-700">
                                {title && (
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                                        {title}
                                    </h3>
                                )}
                                <button className="rounded-lg p-2 text-gray-500 transition-colors duration-200 hover:bg-gray-100 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-main-500 dark:text-gray-400 dark:hover:bg-gray-700 dark:hover:text-gray-300">
                                    <X size={20} />
                                </button>
                                )
                            </div>
                        )}

                        {/* Content */}
                        <div className="px-6 py-4">{children}</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
