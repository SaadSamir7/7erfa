"use client";
import { HiChevronLeft, HiChevronRight } from "react-icons/hi2";
import { useRouter, useSearchParams } from "next/navigation";
import { WORKERS_PAGE_SIZE } from "@/utils/constants";

const pageSize = WORKERS_PAGE_SIZE;
function SearchPagination({ count }: { count: number }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const currentPage = !searchParams.get("page")
        ? 1
        : Number(searchParams.get("page"));

    const pageCount = Math.ceil(count / pageSize);

    function nextPage() {
        const next = currentPage === pageCount ? currentPage : currentPage + 1;
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", next.toString());
        router.replace(`?${params.toString()}`);
    }

    function prevPage() {
        const prev = currentPage === 1 ? 1 : currentPage - 1;
        const params = new URLSearchParams(searchParams.toString());
        params.set("page", prev.toString());
        router.replace(`?${params.toString()}`);
    }

    if (pageCount <= 1) return null;

    return (
        <div className="flex w-full justify-center">
            <div className="mb-8 mt-8 rounded-2xl border border-main-200/30 bg-gradient-to-r from-white/80 via-main-50/20 to-white/80 p-6 shadow-xl backdrop-blur-sm transition-all duration-300 hover:shadow-2xl dark:border-main-700/30 dark:from-gray-800/80 dark:via-main-900/20 dark:to-gray-800/80">
                <div className="relative">
                    <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-main-500/5 via-transparent to-main-500/5"></div>

                    <div className="relative z-10">
                        <div className="w-full rounded-lg bg-gray-50 px-6 py-4 dark:bg-gray-700">
                            <div className="flex w-full items-center justify-between gap-4">
                                <p className="ml-2 text-sm text-gray-700 dark:text-gray-300">
                                    Showing{" "}
                                    <span className="font-semibold text-main-600 dark:text-main-400">
                                        {(currentPage - 1) * pageSize + 1}
                                    </span>{" "}
                                    to{" "}
                                    <span className="font-semibold text-main-600 dark:text-main-400">
                                        {currentPage === pageCount
                                            ? count
                                            : currentPage * pageSize}
                                    </span>{" "}
                                    of{" "}
                                    <span className="font-semibold text-main-600 dark:text-main-400">
                                        {count}
                                    </span>{" "}
                                    results
                                </p>

                                <div className="flex gap-3">
                                    <button
                                        onClick={prevPage}
                                        disabled={currentPage === 1}
                                        className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all duration-300 hover:border-main-300 hover:bg-main-50 hover:text-main-700 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-gray-300 disabled:hover:bg-white disabled:hover:text-gray-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-main-600 dark:hover:bg-main-900/20 dark:hover:text-main-300 dark:disabled:hover:border-gray-600 dark:disabled:hover:bg-gray-800 dark:disabled:hover:text-gray-300"
                                    >
                                        <HiChevronLeft className="h-4 w-4" />
                                        <span>Previous</span>
                                    </button>

                                    <button
                                        onClick={nextPage}
                                        disabled={currentPage === pageCount}
                                        className="flex items-center justify-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm transition-all duration-300 hover:border-main-300 hover:bg-main-50 hover:text-main-700 disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:border-gray-300 disabled:hover:bg-white disabled:hover:text-gray-700 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-300 dark:hover:border-main-600 dark:hover:bg-main-900/20 dark:hover:text-main-300 dark:disabled:hover:border-gray-600 dark:disabled:hover:bg-gray-800 dark:disabled:hover:text-gray-300"
                                    >
                                        <span>Next</span>
                                        <HiChevronRight className="h-4 w-4" />
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default SearchPagination;
