import { auth } from "@/auth";
import { getOrders } from "@/services/apiOrders";
import { Clock, Calendar } from "lucide-react";
import Link from "next/link";

async function WorkerTasksDashboard() {
    const session = await auth();
    const token = session?.accessToken || "";
    const orders = await getOrders(token);
    const displayOrders = orders.slice(0, 3);

    return (
        <div className="group rounded-2xl border border-white/20 bg-white/70 p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-white/80 hover:shadow-xl dark:border-gray-700/50 dark:bg-gray-800/70 dark:hover:bg-gray-800/80">
            <div className="mb-8 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="rounded-xl bg-gradient-to-r from-main-500 to-main-600 p-2">
                        <Clock size={20} className="text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                        Active Orders
                    </h2>
                </div>
                <Link
                    className="group flex items-center space-x-2 rounded-lg bg-main-50 px-4 py-2 text-sm font-semibold text-main-600 transition-all duration-200 hover:bg-main-100 hover:shadow-md dark:bg-main-900/30 dark:text-main-400 dark:hover:bg-main-900/50"
                    href="/worker-dashboard/orders"
                >
                    <span>View All</span>
                    <svg
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </Link>
            </div>
            <div className="space-y-4">
                {displayOrders.length > 0 ? (
                    displayOrders.map((task) => (
                        <div
                            key={task?.id}
                            className="group relative overflow-hidden rounded-xl border border-gray-200 bg-gradient-to-r from-white to-gray-50/50 p-6 transition-all duration-300 hover:-translate-y-1 hover:border-main-300 hover:shadow-lg dark:border-gray-600 dark:from-gray-700 dark:to-gray-800/50 dark:hover:border-main-500"
                        >
                            {/* Subtle gradient line */}
                            <div className="absolute left-0 top-0 h-full w-1 bg-gradient-to-b from-main-500 to-main-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

                            <div className="mb-3 flex items-start justify-between">
                                <div className="flex-1">
                                    <h3 className="mb-1 text-lg font-semibold capitalize text-gray-800 dark:text-gray-100">
                                        {task?.service}
                                    </h3>
                                    <p className="flex items-center space-x-2 text-sm text-gray-600 dark:text-gray-400">
                                        <span className="inline-block h-2 w-2 rounded-full bg-main-500"></span>
                                        <span>
                                            Client:{" "}
                                            <span className="font-medium capitalize">
                                                {task?.customer?.name}
                                            </span>
                                        </span>
                                    </p>
                                </div>
                                <span
                                    className={`flex rounded-full px-3 py-1.5 text-xs font-semibold capitalize shadow-sm ${
                                        task?.status === "in progress"
                                            ? "bg-gradient-to-r from-main-500 to-main-600 text-white"
                                            : task?.status === "pending"
                                              ? "bg-gradient-to-r from-amber-500 to-yellow-600 text-white"
                                              : task?.status === "completed"
                                                ? "bg-gradient-to-r from-emerald-500 to-green-600 text-white"
                                                : "bg-gradient-to-r from-red-500 to-rose-600 text-white"
                                    }`}
                                >
                                    {task?.status}
                                </span>
                            </div>
                            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
                                <div className="rounded-lg bg-gray-100 p-2 dark:bg-gray-700">
                                    <Calendar size={16} />
                                </div>
                                <span className="font-medium">
                                    Due:{" "}
                                    {new Date(task?.createdAt).toLocaleString(
                                        "en-EG"
                                    )}
                                </span>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-gray-500 dark:text-gray-400">
                        <Clock size={48} className="mb-4 opacity-50" />
                        <p className="text-lg font-medium">No Active Orders</p>
                        <p className="text-sm">New orders will appear here</p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default WorkerTasksDashboard;
