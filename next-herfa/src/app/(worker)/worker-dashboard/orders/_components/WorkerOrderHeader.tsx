import { ClipboardListIcon, StarIcon, BriefcaseIcon } from "lucide-react";
import OrdersFilter from "./OrdersFilter";

function WorkerOrderHeader({ ordersNum = 0 }) {
    return (
        <div className="space-y-6">
            <div className="relative mb-6 overflow-hidden p-4 text-center">
                {/* Background decorative elements */}
                <div className="absolute inset-0 flex items-center justify-center opacity-5 dark:opacity-10">
                    <ClipboardListIcon className="h-72 w-96 text-main-600" />
                </div>

                <div className="relative z-10">
                    {/* Main Heading */}
                    <h1 className="mb-4 bg-gradient-to-r from-gray-800 via-main-600 to-gray-800 bg-clip-text text-3xl font-black text-transparent dark:from-white dark:via-main-400 dark:to-gray-100 lg:text-5xl xl:text-6xl">
                        Manage Your Client
                        <span className="block bg-gradient-to-r from-main-500 to-blue-500 bg-clip-text font-extrabold text-transparent">
                            Orders Hub
                        </span>
                    </h1>

                    {/* Subtitle */}
                    <p className="mx-auto max-w-3xl text-base leading-relaxed text-gray-600 dark:text-gray-300 lg:text-lg">
                        Track order progress, communicate with customers, and
                        deliver exceptional service experiences with every
                        project.
                    </p>

                    {/* Stats Bar */}
                    <div className="mb-4 mt-6 flex flex-wrap justify-center gap-6 text-sm">
                        <div className="flex items-center gap-2 rounded-full border border-gray-200/50 bg-white/50 px-4 py-2 backdrop-blur-sm dark:border-gray-600/50 dark:bg-gray-700/50">
                            <div className="h-2 w-2 animate-pulse rounded-full bg-blue-500"></div>
                            <span className="font-medium text-gray-700 dark:text-gray-300">
                                {ordersNum}+ Active Orders
                            </span>
                        </div>

                        <div className="flex items-center gap-2 rounded-full border border-gray-200/50 bg-white/50 px-4 py-2 backdrop-blur-sm dark:border-gray-600/50 dark:bg-gray-700/50">
                            <StarIcon className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                            <span className="font-medium text-gray-700 dark:text-gray-300">
                                Service Excellence
                            </span>
                        </div>

                        <div className="flex items-center gap-2 rounded-full border border-gray-200/50 bg-white/50 px-4 py-2 backdrop-blur-sm dark:border-gray-600/50 dark:bg-gray-700/50">
                            <BriefcaseIcon className="h-3 w-3 text-main-500" />
                            <span className="font-medium text-gray-700 dark:text-gray-300">
                                Professional Support
                            </span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Search and Filter */}
            <OrdersFilter />
        </div>
    );
}

export default WorkerOrderHeader;
