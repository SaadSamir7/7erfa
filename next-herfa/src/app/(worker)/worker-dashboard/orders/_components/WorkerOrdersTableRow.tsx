import AcceptButton from "@/app/(worker)/worker-dashboard/orders/_components/AcceptButton";
import { IOrder } from "@/types/orders";
import {
    Clock,
    CheckCircle,
    XCircle,
    AlertCircle,
    Calendar,
    Package,
    SquareCheck,
} from "lucide-react";
import Link from "next/link";

const getStatusColor = (status: string) => {
    switch (status) {
        case "completed":
            return "bg-green-50 text-green-700 border-green-200 ring-green-100";
        case "in Progress":
            return "bg-main-50 text-main-700 border-main-200 ring-main-100";
        case "pending":
            return "bg-yellow-50 text-yellow-700 border-yellow-200 ring-yellow-100";
        case "canceled":
            return "bg-red-50 text-red-700 border-red-200 ring-red-100";
        default:
            return "bg-gray-50 text-gray-700 border-gray-200 ring-gray-100";
    }
};

const getStatusIcon = (status: string) => {
    const iconProps = { size: 14, className: "mr-1.5" };
    switch (status) {
        case "completed":
            return (
                <CheckCircle {...iconProps} className="mr-1.5 text-green-600" />
            );
        case "in Progress":
            return <Clock {...iconProps} className="mr-1.5 text-main-600" />;
        case "pending":
            return (
                <AlertCircle
                    {...iconProps}
                    className="mr-1.5 text-yellow-600"
                />
            );
        case "canceled":
            return <XCircle {...iconProps} className="mr-1.5 text-red-600" />;
        default:
            return (
                <AlertCircle {...iconProps} className="mr-1.5 text-gray-600" />
            );
    }
};

export default function WorkerOrdersTableRow({
    order,
    orderId,
}: {
    order: IOrder;
    orderId: string;
}) {
    return (
        <tr
            key={orderId}
            className="hover:from-main-25 group transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:to-white dark:hover:from-gray-700 dark:hover:to-gray-800"
        >
            <td className="whitespace-nowrap px-6 py-5 text-sm">
                <Link
                    href={`/worker-dashboard/orders/${orderId}`}
                    className="flex items-center space-x-3"
                >
                    <div>
                        <div className="font-semibold capitalize text-gray-900 transition-colors group-hover:text-blue-600 dark:text-white">
                            {order.customer.name}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                            Customer
                        </div>
                    </div>
                </Link>
            </td>
            <td className="whitespace-nowrap px-6 py-5 text-sm">
                <Link
                    href={`/worker-dashboard/orders/${orderId}`}
                    className="flex items-center space-x-2"
                >
                    <Package size={16} className="text-main-500" />
                    <div>
                        <span className="font-semibold capitalize text-gray-900 transition-colors group-hover:text-main-600 dark:text-white">
                            {order.service}
                        </span>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                            Service Type
                        </div>
                    </div>
                </Link>
            </td>
            <td className="hidden px-6 py-5 text-sm text-gray-600 dark:text-gray-300 lg:table-cell">
                <Link
                    href={`/worker-dashboard/orders/${orderId}`}
                    className="block max-w-xs"
                >
                    <p className="truncate font-medium text-gray-900 transition-colors group-hover:text-gray-700 dark:text-white">
                        {order.details}
                    </p>
                    <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                        Description
                    </p>
                </Link>
            </td>
            <td className="whitespace-nowrap px-6 py-5">
                <Link href={`/worker-dashboard/orders/${orderId}`}>
                    <div
                        className={`inline-flex items-center space-x-2 rounded-xl border-2 px-3 py-2 ${getStatusColor(order.status)}`}
                    >
                        {getStatusIcon(order.status)}
                        <span className="text-sm font-semibold capitalize">
                            {order.status}
                        </span>
                    </div>
                </Link>
            </td>
            <td className="whitespace-nowrap px-6 py-5 text-sm">
                <Link
                    href={`/worker-dashboard/orders/${orderId}`}
                    className="flex items-center space-x-2"
                >
                    <Calendar size={16} className="text-main-500" />
                    <div>
                        <div className="font-semibold text-gray-900 transition-colors group-hover:text-main-600 dark:text-white">
                            {new Date(order.createdAt).toLocaleDateString(
                                "en-EG",
                                {
                                    month: "short",
                                    day: "numeric",
                                    year: "numeric",
                                }
                            )}
                        </div>
                        <div className="text-xs text-gray-500 dark:text-gray-400">
                            {new Date(order.createdAt).toLocaleTimeString(
                                "en-EG",
                                {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                }
                            )}
                        </div>
                    </div>
                </Link>
            </td>
            <td className="whitespace-nowrap px-6 py-5 text-sm">
                {order.status === "completed" && (
                    <div className="inline-flex items-center space-x-2 rounded-lg bg-green-50 px-4 py-2 text-green-700 ring-1 ring-green-200 dark:bg-green-900/20 dark:text-green-400 dark:ring-green-800">
                        <SquareCheck size={18} className="shrink-0" />
                        <span className="text-sm font-medium">Completed</span>
                    </div>
                )}
                {order.status === "canceled" && (
                    <div className="inline-flex items-center space-x-2 rounded-lg bg-red-50 px-4 py-2 text-red-700 ring-1 ring-red-200 dark:bg-red-900/20 dark:text-red-400 dark:ring-red-800">
                        <XCircle size={18} className="shrink-0" />
                        <span className="text-sm font-medium">Canceled</span>
                    </div>
                )}

                {(order.status === "in progress" ||
                    order.status === "pending") && (
                    <AcceptButton orderId={order.id} status={order.status} />
                )}
            </td>
        </tr>
    );
}
