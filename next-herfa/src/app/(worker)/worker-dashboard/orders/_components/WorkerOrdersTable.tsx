import { IOrder } from "@/types/orders";
import { User, Calendar, Package } from "lucide-react";
import WorkerOrdersTableRow from "./WorkerOrdersTableRow";

function OrdersTable({
    orders,
    children,
}: {
    orders: IOrder[];
    children: React.ReactNode;
}) {
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
                                <WorkerOrdersTableRow
                                    key={order.id}
                                    order={order}
                                />
                            );
                        })}
                    </tbody>
                    {children}
                </table>
            </div>
        </div>
    );
}

export default OrdersTable;
