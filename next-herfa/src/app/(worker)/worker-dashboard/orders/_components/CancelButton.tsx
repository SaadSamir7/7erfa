"use client";

import { cancelOrderAction } from "@/lib/actions/orders/cancelOrder";
import { XCircle } from "lucide-react";

export default function CancelButton({ orderId }: { orderId: string }) {
    const handleCancel = async () => {
        const result = await cancelOrderAction(orderId);
        if (result?.error) {
            console.error(result.error);
        }
    };

    return (
        <form action={handleCancel}>
            <button
                type="submit"
                className="group inline-flex items-center space-x-2 rounded-lg bg-red-50 px-3 py-1.5 text-red-700 ring-1 ring-red-200 transition-all hover:bg-red-100 hover:ring-red-300 active:scale-95 dark:bg-red-900/20 dark:text-red-400 dark:ring-red-800 dark:hover:bg-red-900/30"
            >
                <XCircle size={18} className="shrink-0" />
            </button>
        </form>
    );
}
