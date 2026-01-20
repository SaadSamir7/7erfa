"use client";

import { useParams, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
    Clock,
    CheckCircle,
    XCircle,
    AlertCircle,
    User,
    Calendar,
    Package,
    FileText,
    Star,
    SquareX,
} from "lucide-react";
import Link from "next/link";
import { encryptId } from "@/utils/cryptoUtils";
import { IOrder } from "@/types/orders";
import { getOrderById, cancelOrder } from "@/services/apiOrders";
import { useSession } from "next-auth/react";

export default function OrderDetailsModal() {
    const params = useParams();
    const router = useRouter();
    const { data: session } = useSession();
    const dialogRef = useRef<HTMLDialogElement>(null);
    const [order, setOrder] = useState<IOrder | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [orderToCancel, setOrderToCancel] = useState<string | null>(null);
    const [isCanceling, setIsCanceling] = useState(false);

    useEffect(() => {
        const fetchOrder = async () => {
            if (!session?.accessToken || !params.orderId) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                setError(null);
                const fetchedOrder = await getOrderById(
                    params.orderId as string,
                    session.accessToken
                );
                setOrder(fetchedOrder);
            } catch (error) {
                console.error("Error fetching order:", error);
                setError("Failed to load order details");
            } finally {
                setLoading(false);
            }
        };

        fetchOrder();
        dialogRef.current?.showModal();
        document.body.style.overflow = "hidden";

        return () => {
            document.body.style.overflow = "unset";
        };
    }, [params.orderId, session?.accessToken]);

    const handleClose = () => {
        router.back();
    };

    const getStatusConfig = (status: string) => {
        switch (status) {
            case "completed":
                return {
                    icon: CheckCircle,
                    color: "text-green-600",
                    bgColor: "bg-green-50",
                    borderColor: "border-green-200",
                    label: "Completed",
                    description: "Order has been successfully completed",
                };
            case "in progress":
                return {
                    icon: Clock,
                    color: "text-main-600",
                    bgColor: "bg-main-50",
                    borderColor: "border-main-200",
                    label: "In Progress",
                    description: "Order is currently being worked on",
                };
            case "pending":
                return {
                    icon: AlertCircle,
                    color: "text-yellow-600",
                    bgColor: "bg-yellow-50",
                    borderColor: "border-yellow-200",
                    label: "Pending",
                    description: "Order is waiting to be started",
                };
            case "canceled":
                return {
                    icon: XCircle,
                    color: "text-red-600",
                    bgColor: "bg-red-50",
                    borderColor: "border-red-200",
                    label: "Canceled",
                    description: "Order has been canceled",
                };
            default:
                return {
                    icon: AlertCircle,
                    color: "text-gray-600",
                    bgColor: "bg-gray-50",
                    borderColor: "border-gray-200",
                    label: "Unknown",
                    description: "Status unknown",
                };
        }
    };

    const handleCancelOrder = async () => {
        if (!orderToCancel || !session?.accessToken) return;

        setIsCanceling(true);
        try {
            await cancelOrder(orderToCancel, session.accessToken);

            // Refresh the order data
            const updatedOrder = await getOrderById(
                orderToCancel,
                session.accessToken
            );
            setOrder(updatedOrder);
            setOrderToCancel(null);
        } catch (error) {
            console.error("Error canceling order:", error);
            alert("Failed to cancel order. Please try again.");
        } finally {
            setIsCanceling(false);
        }
    };

    if (loading) {
        return (
            <dialog
                ref={dialogRef}
                onClose={handleClose}
                className="fixed left-1/2 top-1/2 z-50 w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/20 p-0 shadow-2xl backdrop:bg-black/70 backdrop:backdrop-blur-sm dark:border-gray-700/50"
            >
                <div className="rounded-2xl bg-white/90 p-8 backdrop-blur-sm dark:bg-gray-800/90">
                    <div className="text-center">
                        <p className="text-gray-500">Loading...</p>
                    </div>
                </div>
            </dialog>
        );
    }

    if (error || !order) {
        return (
            <dialog
                ref={dialogRef}
                onClose={handleClose}
                className="fixed left-1/2 top-1/2 z-50 w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/20 p-0 shadow-2xl backdrop:bg-black/70 backdrop:backdrop-blur-sm dark:border-gray-700/50"
            >
                <div className="rounded-2xl bg-white/90 p-8 backdrop-blur-sm dark:bg-gray-800/90">
                    <div className="text-center">
                        <p className="text-red-500">
                            {error || "Order not found"}
                        </p>
                        <button
                            onClick={handleClose}
                            className="mt-4 rounded-lg bg-main-500 px-6 py-2 text-white hover:bg-main-600"
                        >
                            Close
                        </button>
                    </div>
                </div>
            </dialog>
        );
    }

    const statusConfig = getStatusConfig(order.status);
    const StatusIcon = statusConfig.icon;
    const orderDate = new Date(order.createdAt).toLocaleDateString("en-EG", {
        month: "long",
        day: "numeric",
        year: "numeric",
    });
    const orderTime = new Date(order.createdAt).toLocaleTimeString("en-EG", {
        hour: "2-digit",
        minute: "2-digit",
    });

    return (
        <>
            <dialog
                ref={dialogRef}
                onClose={handleClose}
                className="fixed left-1/2 top-1/2 z-50 w-full max-w-4xl -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-white/20 p-0 shadow-2xl backdrop:bg-black/70 backdrop:backdrop-blur-sm dark:border-gray-700/50"
            >
                <div className="rounded-2xl bg-white/90 backdrop-blur-sm dark:bg-gray-800/90">
                    {/* Header */}
                    <div className="flex items-center justify-between border-b border-gray-200 p-6 dark:border-gray-700">
                        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-50">
                            Order Details
                        </h2>
                        <button
                            onClick={handleClose}
                            className="text-3xl leading-none text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-gray-300"
                            aria-label="Close"
                        >
                            ×
                        </button>
                    </div>

                    {/* Content */}
                    <div className="max-h-[80vh] overflow-y-auto p-6">
                        <div className="space-y-6">
                            {/* Order Header */}
                            <div className="flex items-center justify-between">
                                <div className="flex items-center space-x-4">
                                    <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-main-500 to-main-600 text-lg font-bold text-white shadow-lg">
                                        #{params.orderId}
                                    </div>
                                    <div>
                                        <h4 className="text-xl font-bold text-gray-900 dark:text-white">
                                            Order #{params.orderId}
                                        </h4>
                                        <p className="text-sm text-gray-500 dark:text-gray-400">
                                            Created on {orderDate}
                                        </p>
                                    </div>
                                </div>

                                {/* Status Section */}
                                <div className="text-right">
                                    <div className="flex items-center space-x-3">
                                        <div
                                            className={`flex items-center space-x-2 rounded-xl border-2 px-4 py-2 ${statusConfig.bgColor} ${statusConfig.borderColor}`}
                                        >
                                            <StatusIcon
                                                size={18}
                                                className={statusConfig.color}
                                            />
                                            <span
                                                className={`font-semibold ${statusConfig.color}`}
                                            >
                                                {statusConfig.label}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Status Description */}
                            <div
                                className={`rounded-xl border p-4 ${statusConfig.bgColor} ${statusConfig.borderColor}`}
                            >
                                <p
                                    className={`text-sm font-medium ${statusConfig.color}`}
                                >
                                    {statusConfig.description}
                                </p>
                            </div>

                            {/* Order Information Grid */}
                            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                                {/* Worker Information */}
                                <div className="space-y-4">
                                    <h5 className="flex items-center space-x-2 text-lg font-semibold text-gray-900 dark:text-white">
                                        <User
                                            size={20}
                                            className="text-main-500"
                                        />
                                        <span>Worker Information</span>
                                    </h5>
                                    <div className="space-y-3 rounded-xl bg-gray-50 p-4 dark:bg-gray-700">
                                        <div className="flex items-center space-x-3">
                                            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-600 font-semibold text-white">
                                                {order.worker?.name
                                                    ?.charAt(0)
                                                    ?.toUpperCase() || "?"}
                                            </div>
                                            <div>
                                                <p className="font-semibold capitalize text-gray-900 dark:text-white">
                                                    {order.worker?.name ||
                                                        "Unknown Worker"}
                                                </p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    Worker
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>

                                {/* Service Information */}
                                <div className="space-y-4">
                                    <h5 className="flex items-center space-x-2 text-lg font-semibold text-gray-900 dark:text-white">
                                        <Package
                                            size={20}
                                            className="text-main-500"
                                        />
                                        <span>Service Information</span>
                                    </h5>
                                    <div className="space-y-3 rounded-xl bg-gray-50 p-4 dark:bg-gray-700">
                                        <div className="flex items-center space-x-3">
                                            <Package
                                                size={16}
                                                className="text-main-500"
                                            />
                                            <div>
                                                <p className="font-semibold capitalize text-gray-900 dark:text-white">
                                                    {order.service}
                                                </p>
                                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                                    Service Type
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Order Details */}
                            <div className="space-y-4">
                                <h5 className="flex items-center space-x-2 text-lg font-semibold text-gray-900 dark:text-white">
                                    <FileText
                                        size={20}
                                        className="text-main-500"
                                    />
                                    <span>Order Details</span>
                                </h5>
                                <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-700">
                                    <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                                        {order.details ||
                                            "No additional details provided for this order."}
                                    </p>
                                </div>
                            </div>

                            {/* Timeline */}
                            <div className="space-y-4">
                                <h5 className="flex items-center space-x-2 text-lg font-semibold text-gray-900 dark:text-white">
                                    <Calendar
                                        size={20}
                                        className="text-main-500"
                                    />
                                    <span>Timeline</span>
                                </h5>
                                <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-700">
                                    <div className="flex items-center space-x-3">
                                        <Calendar
                                            size={16}
                                            className="text-main-500"
                                        />
                                        <div>
                                            <p className="font-semibold text-gray-900 dark:text-white">
                                                {orderDate}
                                            </p>
                                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                                Created at {orderTime}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-end space-x-4 border-t border-gray-200 pt-4 dark:border-gray-600">
                                {order.status === "pending" && (
                                    <button
                                        className="flex items-center justify-center gap-2 rounded-lg border border-red-200 px-4 py-2 text-red-600 transition-colors hover:bg-red-50 dark:text-red-500 dark:hover:bg-red-900/20"
                                        onClick={() =>
                                            setOrderToCancel(order.id)
                                        }
                                        disabled={isCanceling}
                                    >
                                        <SquareX size={16} />
                                        <span className="font-semibold">
                                            {isCanceling
                                                ? "Canceling..."
                                                : "Cancel Order"}
                                        </span>
                                    </button>
                                )}
                                {order.status === "completed" &&
                                    order.worker?.id && (
                                        <Link
                                            className="flex items-center justify-center gap-2 rounded-lg border border-blue-200 px-4 py-2 text-blue-600 transition-colors hover:bg-blue-50 dark:text-blue-500 dark:hover:bg-blue-900/20"
                                            href={`/dashboard/worker/${encryptId(order.worker.id)}/make-review`}
                                        >
                                            <Star size={16} />
                                            <span className="font-semibold">
                                                Write Review
                                            </span>
                                        </Link>
                                    )}
                            </div>
                        </div>
                    </div>
                </div>
            </dialog>

            {/* Confirmation Modal */}
            {orderToCancel && (
                <div className="fixed inset-0 z-[60] flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
                        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-50">
                            Confirm Cancellation
                        </h2>
                        <p className="mt-2 text-gray-600 dark:text-gray-200">
                            Are you sure you want to cancel this order? This
                            action cannot be undone.
                        </p>
                        <div className="mt-4 flex justify-end space-x-4">
                            <button
                                className="rounded bg-gray-200 px-4 py-2 font-medium text-gray-800 hover:bg-gray-300"
                                onClick={() => setOrderToCancel(null)}
                                disabled={isCanceling}
                            >
                                No
                            </button>
                            <button
                                className="rounded bg-red-600 px-4 py-2 font-medium text-white hover:bg-red-700 disabled:opacity-50"
                                onClick={handleCancelOrder}
                                disabled={isCanceling}
                            >
                                {isCanceling ? "Canceling..." : "Yes, Cancel"}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    );
}
