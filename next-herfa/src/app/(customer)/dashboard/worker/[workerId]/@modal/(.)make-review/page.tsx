"use client";

import { useParams, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { createReviewAction, updateReviewAction } from "@/lib/actions/reviews";
import { useFormStatus } from "react-dom";
import { Star } from "lucide-react";

function SubmitButton({ isEdit }: { isEdit: boolean }) {
    const { pending } = useFormStatus();

    return (
        <button
            type="submit"
            disabled={pending}
            className="flex-1 rounded-lg bg-gradient-to-r from-yellow-500 to-yellow-600 px-6 py-3 font-semibold text-white transition-all duration-200 hover:from-yellow-600 hover:to-yellow-700 focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
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

export default function WriteReviewModal() {
    const params = useParams();
    const workerId = params.workerId as string;
    const router = useRouter();
    const searchParams = useSearchParams();
    const dialogRef = useRef<HTMLDialogElement>(null);

    // Check if it's edit or create
    const reviewId = searchParams.get("reviewId");
    const existingText = searchParams.get("text");
    const existingRating = searchParams.get("rating");
    const isEdit = !!reviewId;

    const [rating, setRating] = useState(
        existingRating ? parseInt(existingRating) : 0
    );

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
        formData.append("rating", rating.toString());

        if (isEdit && reviewId) {
            await updateReviewAction(workerId, reviewId, formData);
        } else {
            await createReviewAction(workerId, formData);
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
                        {isEdit ? "Edit Review" : "Write a Review"}
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
                                rows={4}
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
                                            size={32}
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
                                    Please select a rating
                                </p>
                            )}
                        </div>

                        {/* Buttons */}
                        <div className="flex gap-4 pt-4">
                            <SubmitButton isEdit={isEdit} />
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
