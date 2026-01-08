"use client";

import Link from "next/link";
import { useParams, useSearchParams } from "next/navigation";
import { useState } from "react";
import { useFormStatus } from "react-dom";
import { Star } from "lucide-react";
import { createReviewAction, updateReviewAction } from "@/lib/actions/reviews";

function SubmitButton({ isEdit }: { isEdit: boolean }) {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-600 px-8 py-3 font-semibold text-white transition-all duration-200 hover:from-yellow-600 hover:to-yellow-700 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
        >
            {pending
                ? isEdit
                    ? "Updating..."
                    : "Submitting..."
                : isEdit
                  ? "Update Review"
                  : "Submit Review"}
        </button>
    );
}

export default function WriteReviewPage() {
    const params = useParams();
    const workerId = params.workerId as string;
    const searchParams = useSearchParams();

    const reviewId = searchParams.get("reviewId");
    const existingText = searchParams.get("text");
    const existingRating = searchParams.get("rating");
    const isEdit = !!reviewId;

    const [rating, setRating] = useState(
        existingRating ? parseInt(existingRating) : 0
    );

    const handleSubmit = async (formData: FormData) => {
        formData.append("rating", rating.toString());

        if (isEdit && reviewId) {
            await updateReviewAction(workerId, reviewId, formData);
        } else {
            await createReviewAction(workerId, formData);
        }
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
                        <div className="rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-600 p-2">
                            <Star
                                size={24}
                                className="fill-current text-white"
                            />
                        </div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                            {isEdit ? "Edit Review" : "Write a Review"}
                        </h1>
                    </div>
                    <p className="text-gray-600 dark:text-gray-400">
                        Full page view - Direct URL access
                    </p>
                </div>

                {/* Form Card */}
                <div className="rounded-2xl border border-white/20 bg-white/70 p-8 shadow-lg backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/70">
                    <form action={handleSubmit} className="space-y-6">
                        {/* Review Text Field */}
                        <div>
                            <label
                                htmlFor="review"
                                className="mb-2 block text-sm font-medium text-gray-700 dark:text-gray-300"
                            >
                                Your Review
                            </label>
                            <textarea
                                id="review"
                                name="review"
                                required
                                minLength={10}
                                rows={6}
                                defaultValue={existingText || ""}
                                className="w-full resize-none rounded-lg border border-gray-300 px-4 py-3 outline-none transition-colors focus:border-transparent focus:ring-2 focus:ring-main-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white"
                                placeholder="Share your experience working with this professional"
                            />
                        </div>

                        {/* Rating Stars */}
                        <div>
                            <label className="mb-3 block text-sm font-medium text-gray-700 dark:text-gray-300">
                                Rating
                            </label>
                            <div className="flex gap-2">
                                {[1, 2, 3, 4, 5].map((star) => (
                                    <button
                                        key={star}
                                        type="button"
                                        onClick={() => setRating(star)}
                                        className="rounded-full p-1 transition-all duration-200 hover:scale-110"
                                    >
                                        <Star
                                            size={40}
                                            className={`transition-colors ${
                                                rating >= star
                                                    ? "fill-yellow-400 text-yellow-400"
                                                    : "fill-gray-200 text-gray-200 hover:fill-yellow-200 hover:text-yellow-200 dark:fill-gray-600 dark:text-gray-600"
                                            }`}
                                        />
                                    </button>
                                ))}
                            </div>
                            <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">
                                Click on a star to rate (1-5 stars)
                            </p>
                            {rating === 0 && (
                                <p className="mt-2 text-sm text-red-500">
                                    Please select a rating before submitting
                                </p>
                            )}
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-4 pt-2">
                            <SubmitButton isEdit={isEdit} />
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
