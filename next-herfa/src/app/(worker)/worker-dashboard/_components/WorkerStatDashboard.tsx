import { auth } from "@/auth";
import { getOrders } from "@/services/apiOrders";
import { Clock, CircleCheck, Star, X } from "lucide-react";

async function WorkerStatDashboard() {
    const session = await auth();
    const user = session?.user;
    const token = session?.accessToken || "";
    const orders = await getOrders(token);
    const completedOrders = orders?.filter(
        (order) => order.status === "completed"
    ).length;

    const activeOrders = orders?.filter(
        (order) => order.status === "in progress" || order.status === "pending"
    ).length;

    const canceledOrders = orders?.filter(
        (order) => order.status === "canceled"
    ).length;

    const stats = [
        {
            title: "Completed Orders",
            value: completedOrders,
            icon: <CircleCheck size={24} />,
            color: "from-emerald-500 to-teal-600",
            bgColor: "bg-emerald-50 dark:bg-emerald-900/20",
            textColor: "text-emerald-700 dark:text-emerald-300",
            iconBg: "bg-emerald-100 dark:bg-emerald-800/50",
        },
        {
            title: "Active Orders",
            value: activeOrders,
            icon: <Clock size={24} />,
            color: "from-main-500 to-main-600",
            bgColor: "bg-main-50 dark:bg-main-900/20",
            textColor: "text-main-700 dark:text-main-300",
            iconBg: "bg-main-100 dark:bg-main-800/50",
        },
        {
            title: "Canceled Orders",
            value: canceledOrders,
            icon: <X size={24} />,
            color: "from-red-500 to-rose-600",
            bgColor: "bg-red-50 dark:bg-red-900/20",
            textColor: "text-red-700 dark:text-red-300",
            iconBg: "bg-red-100 dark:bg-red-800/50",
        },
        {
            title: "Rating",
            value: user?.ratingsAverage || 0,
            icon: <Star size={24} className="fill-current" />,
            color: "from-main-500 to-main-600",
            bgColor: "bg-main-50 dark:bg-main-900/20",
            textColor: "text-main-700 dark:text-main-300",
            iconBg: "bg-main-100 dark:bg-main-800/50",
        },
    ];

    return (
        <div className="mb-8 grid grid-cols-1 gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {stats.map((stat, index) => (
                <div
                    key={index}
                    className={`group relative overflow-hidden rounded-2xl ${stat.bgColor} border border-white/20 p-6 shadow-lg backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl`}
                >
                    {/* Gradient overlay on hover */}
                    <div
                        className={`absolute inset-0 bg-gradient-to-r ${stat.color} opacity-0 transition-opacity duration-300 group-hover:opacity-5`}
                    ></div>

                    <div className="relative z-10">
                        <div className="mb-4 flex items-center justify-between">
                            <h3
                                className={`text-sm font-semibold ${stat.textColor} uppercase tracking-wide`}
                            >
                                {stat.title}
                            </h3>
                            <div
                                className={`rounded-xl ${stat.iconBg} ${stat.textColor} p-3 transition-transform duration-300 group-hover:scale-110`}
                            >
                                {stat.icon}
                            </div>
                        </div>
                        <div className="flex items-end justify-between">
                            <p
                                className={`text-3xl font-bold ${stat.textColor} tracking-tight`}
                            >
                                {stat.value}
                            </p>
                            {stat.title === "Rating" && (
                                <div className="flex items-center space-x-1">
                                    {[...Array(5)].map((_, i) => (
                                        <Star
                                            key={i}
                                            size={16}
                                            className={`${
                                                i < Math.floor(stat.value)
                                                    ? "fill-main-400 text-main-400"
                                                    : "text-gray-300 dark:text-gray-600"
                                            }`}
                                        />
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
}

export default WorkerStatDashboard;
