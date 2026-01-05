import { WORKERS_PAGE_SIZE } from "@/utils/constants";
import { WorkerUser } from "@/types/user";

function ResultHeader({
    sortedWorkers,
    name,
    city,
    category,
    currentPage,
}: {
    sortedWorkers: WorkerUser[];
    name: string;
    city: string;
    category: string;
    currentPage: number;
}) {
    const indexOfLastWorker = currentPage * WORKERS_PAGE_SIZE;
    const indexOfFirstWorker = indexOfLastWorker - WORKERS_PAGE_SIZE;

    return (
        <div className="mb-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
                <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">
                    Available Workers
                </h2>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                    {sortedWorkers.length} worker
                    {sortedWorkers.length !== 1 ? "s" : ""} found
                    {(name || city || category !== "all") && " for your search"}
                </p>
            </div>

            {sortedWorkers.length > 0 && (
                <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
                    <span>
                        Showing {indexOfFirstWorker + 1}-
                        {Math.min(indexOfLastWorker, sortedWorkers.length)} of{" "}
                        {sortedWorkers.length}
                    </span>
                </div>
            )}
        </div>
    );
}

export default ResultHeader;
