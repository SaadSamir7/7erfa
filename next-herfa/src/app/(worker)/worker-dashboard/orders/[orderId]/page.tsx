import { auth } from "@/auth";
import { getOrderById } from "@/services/apiOrders";
import {
    Clock,
    CheckCircle,
    XCircle,
    AlertCircle,
    User,
    Calendar,
    Package,
    FileText,
} from "lucide-react";

const getStatusConfig = (
    status: "completed" | "in progress" | "pending" | "canceled"
) => {
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

const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return {
        date: date.toLocaleDateString("en-EG", {
            year: "numeric",
            month: "long",
            day: "numeric",
        }),
        time: date.toLocaleTimeString("en-EG", {
            hour: "2-digit",
            minute: "2-digit",
        }),
    };
};

export default async function OrderDetailsPage({
    params,
}: {
    params: { orderId: string };
}) {
    const { orderId } = await params;
    const session = await auth();
    const token = session?.accessToken || "";
    const order = await getOrderById(orderId, token);

    if (!order) {
        return (
            <div className="mx-6 space-y-6 py-6">
                <div className="rounded-xl border-2 border-red-200 bg-red-50 p-6 text-center">
                    <p className="text-lg text-red-600">Order not found</p>
                </div>
            </div>
        );
    }

    const statusConfig = getStatusConfig(
        order.status as "completed" | "in progress" | "pending" | "canceled"
    );
    const StatusIcon = statusConfig.icon;
    const orderDate = formatDate(order.createdAt);
    const orderNumber = order.id.slice(-6).toUpperCase();

    return (
        <div className="space-y-6 py-6">
            <div className="space-y-6 rounded-xl bg-white p-6 shadow-sm dark:bg-gray-800">
                {/* Order Header */}
                <div className="flex flex-col items-start justify-between gap-4 border-b pb-6 md:flex-row md:items-center">
                    <div className="flex items-center space-x-4">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                                Order #{orderNumber}
                            </h1>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                Created on {orderDate.date}
                            </p>
                        </div>
                    </div>

                    {/* Status Badge */}
                    <div
                        className={`flex items-center space-x-2 rounded-xl border-2 px-4 py-2 ${statusConfig.bgColor} ${statusConfig.borderColor}`}
                    >
                        <StatusIcon size={18} className={statusConfig.color} />
                        <span className={`font-semibold ${statusConfig.color}`}>
                            {statusConfig.label}
                        </span>
                    </div>
                </div>

                {/* Status Description */}
                <div
                    className={`rounded-xl border p-4 ${statusConfig.bgColor} ${statusConfig.borderColor}`}
                >
                    <p className={`text-sm ${statusConfig.color} font-medium`}>
                        {statusConfig.description}
                    </p>
                </div>

                {/* Order Information Grid */}
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                    {/* Customer Information */}
                    <div className="space-y-4">
                        <h4 className="flex items-center space-x-2 text-lg font-semibold text-gray-900 dark:text-white">
                            <User size={20} className="text-main-500" />
                            <span>Customer Information</span>
                        </h4>
                        <div className="space-y-3 rounded-xl bg-gray-50 p-4 dark:bg-gray-700">
                            <div className="flex items-center space-x-3">
                                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-600 font-semibold text-white">
                                    {order.customer.name
                                        .charAt(0)
                                        .toUpperCase()}
                                </div>
                                <div>
                                    <p className="font-semibold capitalize text-gray-900 dark:text-white">
                                        {order.customer.name}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Service Information */}
                    <div className="space-y-4">
                        <h4 className="flex items-center space-x-2 text-lg font-semibold text-gray-900 dark:text-white">
                            <Package size={20} className="text-main-500" />
                            <span>Service Information</span>
                        </h4>
                        <div className="space-y-3 rounded-xl bg-gray-50 p-4 dark:bg-gray-700">
                            <div className="flex items-center space-x-3">
                                <Package size={16} className="text-main-500" />
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
                    <h4 className="flex items-center space-x-2 text-lg font-semibold text-gray-900 dark:text-white">
                        <FileText size={20} className="text-main-500" />
                        <span>Order Details</span>
                    </h4>
                    <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-700">
                        <p className="font-semibold leading-relaxed text-gray-700 dark:text-gray-300">
                            {order.details ||
                                "No additional details provided for this order."}
                        </p>
                    </div>
                </div>

                {/* Timeline */}
                <div className="space-y-4">
                    <h4 className="flex items-center space-x-2 text-lg font-semibold text-gray-900 dark:text-white">
                        <Calendar size={20} className="text-main-500" />
                        <span>Timeline</span>
                    </h4>
                    <div className="rounded-xl bg-gray-50 p-4 dark:bg-gray-700">
                        <div className="flex items-center space-x-3">
                            <Calendar size={16} className="text-main-500" />
                            <div>
                                <p className="font-semibold text-gray-900 dark:text-white">
                                    {orderDate.date}
                                </p>
                                <p className="text-sm text-gray-500 dark:text-gray-400">
                                    Created at {orderDate.time}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
