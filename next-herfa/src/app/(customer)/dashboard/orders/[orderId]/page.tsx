import {
    Clock,
    CheckCircle,
    XCircle,
    AlertCircle,
    User,
    Calendar,
    Package,
    FileText,
    ArrowLeft,
} from "lucide-react";
import Link from "next/link";
import { getOrderById } from "@/services/apiOrders";
import { auth } from "@/auth";

function getStatusConfig(status: string) {
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
}

export default async function OrderDetailsPage({
    params,
}: {
    params: { orderId: string };
}) {
    const session = await auth();
    const token = session?.accessToken;
    const { orderId } = await params;
    const order = await getOrderById(orderId, token!);

    if (!order) {
        return (
            <div className="min-h-screen bg-gray-50 p-8 dark:bg-gray-900">
                <div className="mx-auto max-w-4xl">
                    <Link
                        href="/dashboard/orders"
                        className="mb-6 inline-flex items-center space-x-2 text-main-600 hover:text-main-700"
                    >
                        <ArrowLeft size={20} />
                        <span>Back to Orders</span>
                    </Link>
                    <div className="rounded-2xl bg-white p-8 text-center shadow-lg dark:bg-gray-800">
                        <p className="text-gray-500">Order not found</p>
                    </div>
                </div>
            </div>
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
        <div className="min-h-screen bg-gray-50 p-8 dark:bg-gray-900">
            <div className="mx-auto max-w-4xl">
                {/* Back Button */}
                <Link
                    href="/dashboard/orders"
                    className="mb-6 inline-flex items-center space-x-2 text-main-600 hover:text-main-700"
                >
                    <ArrowLeft size={20} />
                    <span>Back to Orders</span>
                </Link>

                {/* Order Details Card */}
                <div className="rounded-2xl bg-white shadow-lg dark:bg-gray-800">
                    <div className="border-b border-gray-200 p-6 dark:border-gray-700">
                        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-50">
                            Order Details
                        </h1>
                    </div>

                    <div className="p-6">
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
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
