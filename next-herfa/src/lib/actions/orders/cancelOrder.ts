"use server";
import { auth } from "@/auth";
import { cancelOrder } from "@/services/apiOrders";
import { revalidatePath } from "next/cache";

export async function cancelOrderAction(orderId: string) {
    const session = await auth();

    if (!session?.accessToken) {
        return { error: "You must be logged in to cancel an order" };
    }

    try {
        const response = await cancelOrder({
            orderId,
            token: session.accessToken,
        });

        if (response.status === "fail" || response.status === "error") {
            throw new Error(response.message || "Failed to cancel order");
        }

        // Revalidate the orders page
        revalidatePath(`/worker-dashboard/orders`);
        return { success: true };
    } catch (error) {
        console.error("Cancel order error:", error);
        return { error: "Failed to cancel order. Please try again." };
    }
}
