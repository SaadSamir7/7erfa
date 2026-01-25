// app/actions/orders.ts
"use server";

import { auth } from "@/auth";
import { createOrder } from "@/services/apiOrders";
import { decryptId } from "@/utils/cryptoUtils";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createOrderAction(workerId: string, formData: FormData) {
    const decryptedWorkerId = decryptId(workerId as string);

    const session = await auth();

    if (!session?.accessToken) {
        return { error: "You must be logged in to create an order" };
    }

    const service = formData.get("service") as string;
    const details = formData.get("details") as string;

    // Validation
    if (!service || service.trim().length < 5) {
        throw new Error("Problem title must be at least 5 characters");
    }

    if (!details || details.trim().length < 10) {
        throw new Error("Details must be at least 10 characters");
    }

    try {
        const response = await createOrder({
            data: { service: service.trim(), details: details.trim() },
            workerId: decryptedWorkerId,
            token: session.accessToken,
        });

        if (response.status === "fail" || response.status === "error") {
            throw new Error(response.message || "Failed to create order");
        }

        // Revalidate the worker page
        revalidatePath(`/dashboard/workers/${workerId}`);

        redirect(`/dashboard`);
    } catch (error) {
        console.error("Create order error:", error);
        return { error: "Failed to create order. Please try again." };
    }
}
