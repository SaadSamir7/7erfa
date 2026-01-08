// app/actions/reviews.ts
"use server";

import { auth } from "@/auth";
import { createReview, updateMyReview } from "@/services/apiReviews";
import { decryptId } from "@/utils/cryptoUtils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createReviewAction(workerId: string, formData: FormData) {
    const decryptedWorkerId = decryptId(workerId);

    const session = await auth();

    if (!session?.accessToken) {
        return { error: "You must be logged in to write a review" };
    }

    const review = formData.get("review") as string;
    const rating = parseInt(formData.get("rating") as string);

    // Validation
    if (!review || review.trim().length < 10) {
        return { error: "Review must be at least 10 characters" };
    }

    if (!rating || rating < 1 || rating > 5) {
        return { error: "Rating must be between 1 and 5" };
    }

    try {
        const response = await createReview({
            workerId: decryptedWorkerId,
            data: { review: review.trim(), rating },
            token: session.accessToken,
        });

        if (response.status === "fail" || response.status === "error") {
            return { error: response.message || "Failed to create review" };
        }

        // Revalidate the worker page
        revalidatePath(`/workers/${workerId}`);

        // Redirect back to worker page
        redirect(`/workers/${workerId}`);
    } catch (error) {
        console.error("Create review error:", error);
        return { error: "Failed to create review. Please try again." };
    }
}

export async function updateReviewAction(
    workerId: string,
    reviewId: string,
    formData: FormData
) {
    const decryptedWorkerId = decryptId(workerId);
    const session = await auth();

    if (!session?.accessToken) {
        return { error: "You must be logged in to update a review" };
    }

    const review = formData.get("review") as string;
    const rating = parseInt(formData.get("rating") as string);

    // Validation
    if (!review || review.trim().length < 10) {
        return { error: "Review must be at least 10 characters" };
    }

    if (!rating || rating < 1 || rating > 5) {
        return { error: "Rating must be between 1 and 5" };
    }

    try {
        const response = await updateMyReview({
            workerId: decryptedWorkerId,
            reviewId,
            data: { review: review.trim(), rating },
        });

        if (response.status === "fail" || response.status === "error") {
            return { error: response.message || "Failed to update review" };
        }

        // Revalidate the worker page
        revalidatePath(`/workers/${workerId}`);

        // Redirect back to worker page
        redirect(`/workers/${workerId}`);
    } catch (error) {
        console.error("Update review error:", error);
        return { error: "Failed to update review. Please try again." };
    }
}
