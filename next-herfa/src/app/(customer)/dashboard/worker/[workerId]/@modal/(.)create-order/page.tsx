"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { useFormStatus } from "react-dom";
import { createOrderAction } from "@/lib/actions/orders/createOrder";

function SubmitButton() {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="flex-1 rounded-lg bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-3 font-semibold text-white transition-all duration-200 hover:from-blue-600 hover:to-blue-700 focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
            {pending ? "Creating Order..." : "Create Order"}
        </button>
    );
}

export default function CreateOrderModal() {
    const [error, setError] = useState<string | null>(null);
    const [errorType, setErrorType] = useState<"service" | "details" | null>(
        null
    );
    const params = useParams();
    const workerId = params.workerId as string;
    const router = useRouter();
    const dialogRef = useRef<HTMLDialogElement>(null);

    useEffect(() => {
        dialogRef.current?.showModal();
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "unset";
        };
    }, []);

    const handleClose = () => {
        router.back();
    };

    const handleSubmit = async (formData: FormData) => {
        try {
            await createOrderAction(workerId, formData);
        } catch (error: unknown) {
            if (error instanceof Error) {
                const message = error.message;
                setError(message);

                if (message.includes("title")) {
                    setErrorType("service");
                } else if (message.includes("Details")) {
                    setErrorType("details");
                } else {
                    setErrorType(null);
                }
            } else {
                setError("An unexpected error occurred.");
                setErrorType(null);
            }
        }
    };

    return (
        <dialog
            ref={dialogRef}
            onClose={handleClose}
            className="fixed left-1/2 top-1/2 z-50 w-full max-w-2xl -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/20 p-0 shadow-2xl backdrop:bg-black/70 backdrop:backdrop-blur-sm dark:border-gray-700/50"
        >
            <div className="rounded-2xl bg-white/90 backdrop-blur-sm dark:bg-gray-800/90">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-gray-200 p-6 dark:border-gray-700">
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-50">
                        Create Order
                    </h2>
                    <button
                        onClick={handleClose}
                        className="text-3xl leading-none text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-gray-300"
                        aria-label="Close"
                    >
                        ×
                    </button>
                </div>

                {/* Form */}
                <form action={handleSubmit} className="p-6">
                    <div className="space-y-6">
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
                            {error && errorType === "service" && (
                                <p className="mt-2 text-sm text-red-600">
                                    {error}
                                </p>
                            )}
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
                                rows={4}
                                className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none transition-colors focus:border-transparent focus:ring-2 focus:ring-main-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                placeholder="Provide more details about the problem"
                            />
                            {error && errorType === "details" && (
                                <p className="mt-2 text-sm text-red-600">
                                    {error}
                                </p>
                            )}
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-4 pt-4">
                            <SubmitButton />
                            <button
                                type="button"
                                onClick={handleClose}
                                className="rounded-lg border border-gray-300 px-6 py-3 font-semibold text-gray-700 transition-colors hover:bg-gray-50 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 dark:border-gray-600 dark:text-gray-300 dark:hover:bg-gray-700"
                            >
                                Cancel
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </dialog>
    );
}
