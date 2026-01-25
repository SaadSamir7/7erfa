"use server";
import { auth } from "@/auth";
import { acceptOrder } from "@/services/apiOrders";
import { revalidatePath } from "next/cache";

export async function acceptOrderAction(orderId: string) {
    const session = await auth();

    if (!session?.accessToken) {
        return { error: "You must be logged in to accept an order" };
    }

    try {
        const response = await acceptOrder({
            orderId,
            token: session.accessToken,
        });

        if (response.status === "fail" || response.status === "error") {
            throw new Error(response.message || "Failed to accept order");
        }

        revalidatePath(`/worker-dashboard/orders`);
        return { success: true };
    } catch (error) {
        console.error("Accept order error:", error);
        return { error: "Failed to accept order. Please try again." };
    }
}
