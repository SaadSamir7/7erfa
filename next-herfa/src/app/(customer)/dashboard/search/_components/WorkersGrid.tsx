import { StarIcon, SearchIcon, MapPinIcon, BriefcaseIcon } from "lucide-react";

import { encryptId } from "@/utils/cryptoUtils";
import { WorkerUser } from "@/types/user";
import Link from "next/link";
import Image from "next/image";

const BACKEND_URL = process.env.BACKEND_URL;

function WorkersGrid({
    sortedWorkers,
    currentWorkers,
}: {
    sortedWorkers: WorkerUser[];
    currentWorkers: WorkerUser[];
}) {
    return (
        <div>
            {sortedWorkers.length === 0 ? (
                <div className="py-8 text-center">
                    <div className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-gray-100 dark:bg-gray-700">
                        <SearchIcon className="h-10 w-10 text-gray-400" />
                    </div>
                    <h3 className="mb-2 text-lg font-medium text-gray-800 dark:text-gray-200">
                        No workers found
                    </h3>
                    <p className="mx-auto max-w-md text-sm text-gray-600 dark:text-gray-400">
                        Try adjusting your search criteria or removing some
                        filters to see more results.
                    </p>
                </div>
            ) : (
                <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">
                    {currentWorkers.map((worker) => (
                        <div key={worker._id}>
                            <Link
                                href={`/dashboard/worker/${encodeURIComponent(encryptId(worker._id))}`}
                                className="group relative block"
                            >
                                <div className="group relative overflow-hidden rounded-2xl border border-gray-200/50 bg-gradient-to-br from-white to-gray-50/30 p-4 backdrop-blur-sm transition-all duration-300 hover:-translate-y-1 hover:border-main-300/50 hover:shadow-xl dark:border-gray-600/50 dark:from-gray-700/50 dark:to-gray-800/30 dark:hover:border-main-500/50">
                                    {/* Gradient overlay on hover */}
                                    <div className="absolute inset-0 bg-gradient-to-br from-main-500/5 to-main-600/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

                                    <div className="relative z-10">
                                        {/* Worker Image */}
                                        <div className="mb-4 flex items-start gap-4">
                                            <div className="relative">
                                                <Image
                                                    height={64}
                                                    width={64}
                                                    className="h-16 w-16 rounded-2xl border-2 border-gray-200 object-cover shadow-md transition-colors duration-300 group-hover:border-main-300 lg:h-20 lg:w-20"
                                                    src={
                                                        worker.image &&
                                                        worker.image !==
                                                            "default.png"
                                                            ? `${BACKEND_URL}/uploads/${worker.image}`
                                                            : "/default.png"
                                                    }
                                                    alt={worker.name}
                                                />
                                                {/* Online indicator */}
                                                <div className="absolute -bottom-1 -right-1 rounded-full bg-gradient-to-r from-green-400 to-green-500 p-1">
                                                    <div className="h-2 w-2 rounded-full bg-white"></div>
                                                </div>
                                            </div>

                                            <div className="min-w-0 flex-1">
                                                <div className="flex items-start justify-between">
                                                    <h3 className="truncate text-lg font-bold capitalize text-gray-800 transition-colors duration-300 group-hover:text-main-600 dark:text-gray-100 dark:group-hover:text-main-400">
                                                        {worker.name}
                                                    </h3>
                                                    <div className="flex items-center gap-1 rounded-lg bg-yellow-50 px-2 py-1 dark:bg-yellow-900/20">
                                                        <StarIcon
                                                            size={14}
                                                            className="fill-yellow-500 text-yellow-500"
                                                        />
                                                        <span className="text-sm font-medium text-yellow-700 dark:text-yellow-400">
                                                            {
                                                                worker.ratingsAverage
                                                            }
                                                        </span>
                                                    </div>
                                                </div>

                                                <div className="mt-1 flex items-center gap-1 text-sm font-medium text-main-600 dark:text-main-400">
                                                    <BriefcaseIcon size={14} />
                                                    <span className="capitalize">
                                                        {worker.skill}
                                                    </span>
                                                </div>
                                            </div>
                                        </div>

                                        {/* Worker Details */}
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-300">
                                                <MapPinIcon
                                                    size={14}
                                                    className="text-gray-400"
                                                />
                                                <span>{worker.city}</span>
                                            </div>

                                            <div className="flex items-center justify-between text-sm">
                                                <div className="text-gray-600 dark:text-gray-300">
                                                    <span className="font-medium">
                                                        {
                                                            worker.yearsOfExperience
                                                        }
                                                    </span>{" "}
                                                    years experience
                                                </div>
                                                <div className="text-gray-600 dark:text-gray-300">
                                                    {worker.phoneNumber}
                                                </div>
                                            </div>

                                            {/* Action indicator */}
                                            <div className="border-t border-gray-100 pt-2 dark:border-gray-600">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-xs text-gray-500 dark:text-gray-400">
                                                        Click to view profile
                                                    </span>
                                                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-main-100 opacity-0 transition-all duration-300 group-hover:opacity-100 dark:bg-main-900/20">
                                                        <span className="text-xs text-main-600 dark:text-main-400">
                                                            →
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
}

export default WorkersGrid;
