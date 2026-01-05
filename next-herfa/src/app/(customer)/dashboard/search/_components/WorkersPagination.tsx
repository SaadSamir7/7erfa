import { WorkerUser } from "@/types/user";
import { WORKERS_PAGE_SIZE } from "@/utils/constants";

function WorkersPagination({
    sortedWorkers,
    children,
}: {
    sortedWorkers: WorkerUser[];
    children: React.ReactNode;
}) {
    if (sortedWorkers.length < WORKERS_PAGE_SIZE) return null;

    return (
        <div className="flex w-full justify-center">
            <div className="mb-8 mt-8 rounded-2xl border border-main-200/30 bg-gradient-to-r from-white/80 via-main-50/20 to-white/80 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:shadow-2xl dark:border-main-700/30 dark:from-gray-800/80 dark:via-main-900/20 dark:to-gray-800/80">
                <div className="relative">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-main-500/5 via-transparent to-main-500/5"></div>

                    {/* Pagination component */}
                    <div className="relative z-10">{children}</div>
                </div>
            </div>
        </div>
    );
}

export default WorkersPagination;
