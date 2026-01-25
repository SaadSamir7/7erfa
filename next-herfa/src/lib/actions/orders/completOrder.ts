"use server";

import { auth } from "@/auth";
import { completeOrder } from "@/services/apiOrders";
import { revalidatePath } from "next/cache";

export async function completeOrderAction(orderId: string) {
    const session = await auth();

    if (!session?.accessToken) {
        return { error: "You must be logged in to complete an order" };
    }

    try {
        const response = await completeOrder({
            orderId,
            token: session.accessToken,
        });

        if (response.status === "fail" || response.status === "error") {
            throw new Error(response.message || "Failed to complete order");
        }

        revalidatePath(`/worker-dashboard/orders`);
        return { success: true };
    } catch (error) {
        console.error("Complete order error:", error);
        return { error: "Failed to complete order. Please try again." };
    }
}
