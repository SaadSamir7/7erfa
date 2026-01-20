"use client";

import { User, Calendar, Package } from "lucide-react";
import { IOrder } from "@/types/orders";
import CustomerOrdersTableRow from "./CustomerOrdersTableRow";

function CustomerOrdersTable({
    orders,
    children,
}: {
    orders: IOrder[];
    children: React.ReactNode;
}) {
    // const [orderToCancel, setOrderToCancel] = useState<string | null>(null);
    // const [isCanceling, setIsCanceling] = useState(false);

    // const openCancelModal = (orderId: string) => {
    //     setOrderToCancel(orderId);
    // };

    // const closeCancelModal = () => {
    //     setOrderToCancel(null);
    // };

    // const handleCancelOrder = async () => {
    //     if (!orderToCancel) return;

    //     setIsCanceling(true);
    //     try {
    //         // TODO: Implement cancel order API call
    //         // await deleteOrder(orderToCancel);
    //         setOrderToCancel(null);
    //     } catch (error) {
    //         console.error("Error canceling order:", error);
    //     } finally {
    //         setIsCanceling(false);
    //     }
    // };
    return (
        <>
            <div className="overflow-hidden rounded-xl border border-gray-100 bg-white shadow-lg dark:border-gray-700 dark:bg-gray-800">
                <div className="overflow-x-auto">
                    <table className="w-full">
                        <thead className="bg-gradient-to-r from-gray-50 via-gray-50 to-main-50 dark:from-gray-700 dark:via-gray-700 dark:to-gray-600">
                            <tr>
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-200">
                                    <div className="flex items-center space-x-2">
                                        <User
                                            size={12}
                                            className="text-main-500"
                                        />
                                        <span>Worker</span>
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
                                <th className="px-6 py-4 text-left text-xs font-semibold uppercase tracking-wider text-gray-600 dark:text-gray-200">
                                    <div className="flex items-center space-x-2">
                                        <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                                        <span>Actions</span>
                                    </div>
                                </th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 bg-white dark:divide-gray-600 dark:bg-gray-800">
                            {orders?.map((order) => {
                                return (
                                    <CustomerOrdersTableRow
                                        key={order.id}
                                        order={order}
                                        orderId={order.id}
                                    />
                                );
                            })}
                        </tbody>
                        {children}
                    </table>
                </div>
            </div>

            {/* Confirmation Modal */}
            {/* {orderToCancel && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="w-full max-w-sm rounded-lg bg-white p-6 shadow-lg dark:bg-gray-800">
                        <h2 className="text-lg font-bold text-gray-800 dark:text-gray-50">
                            Confirm Cancellation
                        </h2>
                        <p className="mt-2 text-gray-600 dark:text-gray-200">
                            Are you sure you want to cancel this order?
                        </p>
                        <div className="mt-4 flex justify-end space-x-4">
                            <button
                                className="rounded bg-gray-200 px-4 py-2 font-medium text-gray-800 hover:bg-gray-300"
                                onClick={closeCancelModal}
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
            )} */}
        </>
    );
}

export default CustomerOrdersTable;
