"use client";
import Link from "next/link";
import { useFormStatus } from "react-dom";
import { CalendarArrowUp } from "lucide-react";
import { createOrderAction } from "@/lib/actions/createOrder";
import { useParams } from "next/navigation";

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-8 py-3 font-semibold text-white transition-all duration-200 hover:from-blue-600 hover:to-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
            {pending ? "Creating Order..." : "Create Order"}
        </button>
    );
}

export default function CreateOrderPage() {
    const { workerId } = useParams() as { workerId: string };

    const handleSubmit = async (formData: FormData) => {
        await createOrderAction(workerId, formData);
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50/30 to-main-50/40 p-4 dark:from-gray-900 dark:via-gray-800 dark:to-main-900/20 lg:p-8">
            <div className="mx-auto max-w-3xl">
                {/* Header */}
                <div className="mb-8">
                    <Link
                        href={`/dashboard/worker/${workerId}`}
                        className="mb-4 inline-flex items-center gap-2 font-medium text-main-600 transition-colors hover:text-main-700 dark:text-main-400 dark:hover:text-main-300"
                    >
                        ← Back to Worker Profile
                    </Link>
                    <div className="mb-2 flex items-center gap-3">
                        <div className="rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 p-2">
                            <CalendarArrowUp size={24} className="text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            Create Order
                        </h1>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                        Full page view - Direct URL access
                    </p>
                </div>

                {/* Form Card */}
                <div className="rounded-2xl border border-white/20 bg-white/70 p-8 shadow-lg backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/70">
                    <form action={handleSubmit} className="space-y-6">
                        {/* Service/Title Field */}
                        <div>
                            <label
                                htmlFor="service"
                                className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                Problem Title
                            </label>
                            <input
                                type="text"
                                id="service"
                                name="service"
                                required
                                minLength={5}
                                className="w-full rounded-lg border border-gray-300 px-4 py-3 outline-none transition-colors focus:border-transparent focus:ring-2 focus:ring-main-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                placeholder="Enter the title of the problem"
                            />
                        </div>

                        {/* Details Field */}
                        <div>
                            <label
                                htmlFor="details"
                                className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                Details
                            </label>
                            <textarea
                                id="details"
                                name="details"
                                required
                                minLength={10}
                                rows={6}
                                className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none transition-colors focus:border-transparent focus:ring-2 focus:ring-main-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                placeholder="Provide more details about the problem"
                            />
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-4 pt-2">
                            <SubmitButton />
                            <Link
                                href={`/dashboard/worker/${workerId}`}
                                className="rounded-lg border border-gray-300 px-8 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                            >
                                Cancel
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
}
