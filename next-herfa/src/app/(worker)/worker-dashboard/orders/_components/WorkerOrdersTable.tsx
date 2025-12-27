import { IOrder } from "@/types/orders";
import {
    Clock,
    CheckCircle,
    XCircle,
    AlertCircle,
    User,
    Calendar,
    Package,
} from "lucide-react";
import Link from "next/link";

function OrdersTable({
    orders,
    children,
}: {
    orders: IOrder[];
    children: React.ReactNode;
}) {
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
                    <CheckCircle
                        {...iconProps}
                        className="mr-1.5 text-green-600"
                    />
                );
            case "in Progress":
                return (
                    <Clock {...iconProps} className="mr-1.5 text-main-600" />
                );
            case "pending":
                return (
                    <AlertCircle
                        {...iconProps}
                        className="mr-1.5 text-yellow-600"
                    />
                );
            case "canceled":
                return (
                    <XCircle {...iconProps} className="mr-1.5 text-red-600" />
                );
            default:
                return (
                    <AlertCircle
                        {...iconProps}
                        className="mr-1.5 text-gray-600"
                    />
                );
        }
    };

    return (
        <div className="my-10 overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
            <div className="overflow-x-auto">
                <table className="w-full">
                    <thead className="bg-gradient-to-r from-gray-50 via-gray-50 to-main-50 dark:from-gray-700 dark:via-gray-700 dark:to-gray-600">
                        <tr>
                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-200">
                                <div className="flex items-center space-x-2">
                                    <User size={12} className="text-main-500" />
                                    <span>Customer</span>
                                </div>
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-200">
                                <div className="flex items-center space-x-2">
                                    <Package
                                        size={12}
                                        className="text-main-500"
                                    />
                                    <span>Service</span>
                                </div>
                            </th>
                            <th className="hidden px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-200 lg:table-cell">
                                <div className="flex items-center space-x-2">
                                    <div className="h-2 w-2 rounded-full bg-blue-500"></div>
                                    <span>Details</span>
                                </div>
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-200">
                                <div className="flex items-center space-x-2">
                                    <div className="h-2 w-2 rounded-full bg-green-500"></div>
                                    <span>Status</span>
                                </div>
                            </th>
                            <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-200">
                                <div className="flex items-center space-x-2">
                                    <Calendar
                                        size={12}
                                        className="text-main-500"
                                    />
                                    <span>Date</span>
                                </div>
                            </th>
                        </tr>
                    </thead>
                    <tbody className="divide-y divide-gray-100 bg-white dark:divide-gray-600 dark:bg-gray-800">
                        {orders.map((order) => {
                            return (
                                <tr
                                    key={order.id}
                                    className="hover:from-main-25 group cursor-pointer transition-all duration-300 ease-in-out hover:bg-gradient-to-r hover:to-white dark:hover:from-gray-700 dark:hover:to-gray-800"
                                >
                                    <td className="whitespace-nowrap px-6 py-5 text-sm">
                                        <Link
                                            href={`/worker-dashboard/orders/${order.id}`}
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
                                        <div className="flex items-center space-x-2">
                                            <Package
                                                size={16}
                                                className="text-main-500"
                                            />
                                            <div>
                                                <span className="font-semibold capitalize text-gray-900 transition-colors group-hover:text-main-600 dark:text-white">
                                                    {order.service}
                                                </span>
                                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                                    Service Type
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="hidden px-6 py-5 text-sm text-gray-600 dark:text-gray-300 lg:table-cell">
                                        <div className="max-w-xs">
                                            <p className="truncate font-medium text-gray-900 transition-colors group-hover:text-gray-700 dark:text-white">
                                                {order.details}
                                            </p>
                                            <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                                Description
                                            </p>
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-5">
                                        <div
                                            className={`inline-flex items-center space-x-2 rounded-xl border-2 px-3 py-2 ${getStatusColor(order.status)}`}
                                        >
                                            {getStatusIcon(order.status)}
                                            <span className="text-sm font-semibold capitalize">
                                                {order.status}
                                            </span>
                                        </div>
                                    </td>
                                    <td className="whitespace-nowrap px-6 py-5 text-sm">
                                        <div className="flex items-center space-x-2">
                                            <Calendar
                                                size={16}
                                                className="text-main-500"
                                            />
                                            <div>
                                                <div className="font-semibold text-gray-900 transition-colors group-hover:text-main-600 dark:text-white">
                                                    {new Date(
                                                        order.createdAt
                                                    ).toLocaleDateString(
                                                        "en-EG",
                                                        {
                                                            month: "short",
                                                            day: "numeric",
                                                            year: "numeric",
                                                        }
                                                    )}
                                                </div>
                                                <div className="text-xs text-gray-500 dark:text-gray-400">
                                                    {new Date(
                                                        order.createdAt
                                                    ).toLocaleTimeString(
                                                        "en-EG",
                                                        {
                                                            hour: "2-digit",
                                                            minute: "2-digit",
                                                        }
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </td>
                                </tr>
                            );
                        })}
                    </tbody>
                    <tfoot className="bg-gray-50 dark:bg-gray-700">
                        <tr>
                            <td colSpan={7} className="px-6 py-4">
                                {children}
                            </td>
                        </tr>
                    </tfoot>
                </table>
            </div>
        </div>
    );
}

export default OrdersTable;
