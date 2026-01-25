"use client";

import { acceptOrderAction } from "@/lib/actions/orders/acceptOrder";
import { completeOrderAction } from "@/lib/actions/orders/completOrder";
import { Check } from "lucide-react";

export default function AcceptButton({
    orderId,
    status,
}: {
    orderId: string;
    status: "in progress" | "pending";
}) {
    const handleAccept = async () => {
        const result = await acceptOrderAction(orderId);
        if (result?.error) {
            console.error(result.error);
        }
    };

    const handleFinish = async () => {
        const result = await completeOrderAction(orderId);
        if (result?.error) {
            console.error(result.error);
        }
    };

    return (
        <form action={status === "pending" ? handleAccept : handleFinish}>
            <button
                type="submit"
                className="group inline-flex items-center space-x-2 rounded-lg bg-green-50 px-3 py-1.5 text-green-700 ring-1 ring-green-200 transition-all hover:bg-green-100 hover:ring-green-300 active:scale-95 dark:bg-green-900/20 dark:text-green-400 dark:ring-green-800 dark:hover:bg-green-900/30"
            >
                <Check size={18} className="shrink-0" />
                {status === "in progress" && (
                    <span className="text-sm font-medium capitalize">
                        finish it
                    </span>
                )}
                {status === "pending" && (
                    <span className="text-sm font-medium">Accept</span>
                )}
            </button>
        </form>
    );
}
