"use client";

import { SearchIcon, FilterIcon } from "lucide-react";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const OrdersFilter = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const filter = searchParams.get("filter") ?? "all";
    const search = searchParams.get("search") ?? "";

    const [searchInput, setSearchInput] = useState(search);

    const handelSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const params = new URLSearchParams(searchParams.toString());
        if (searchInput.trim() !== "") {
            params.set("search", searchInput.trim());
        } else {
            params.delete("search");
        }
        router.replace(`?${params.toString()}`);
    };

    function setFilter(value: string) {
        const params = new URLSearchParams(searchParams.toString());
        params.set("filter", value);
        router.replace(`?${params.toString()}`);
    }

    return (
        <div className="mb-6">
            <div className="group relative overflow-hidden rounded-2xl border border-gray-200/50 bg-gradient-to-br from-white to-gray-50/30 p-4 shadow-lg backdrop-blur-sm dark:border-gray-600/50 dark:from-gray-700/50 dark:to-gray-800/30">
                <div className="absolute inset-0 bg-gradient-to-br from-main-500/5 to-main-600/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

                <div className="relative z-10">
                    <div className="mb-3 flex items-center gap-2">
                        <FilterIcon className="h-5 w-5 text-main-600 dark:text-main-400" />
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                            Search & Filter Orders
                        </h3>
                    </div>

                    <div className="flex flex-col items-center gap-4 sm:flex-row sm:items-center">
                        {/* Search Input */}
                        <form
                            className="relative w-full flex-1"
                            onSubmit={handelSearch}
                        >
                            <SearchIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <input
                                type="text"
                                name="search"
                                placeholder="Search orders by customer name, service type..."
                                value={searchInput}
                                onChange={(e) => setSearchInput(e.target.value)}
                                className="w-full rounded-xl border border-gray-300/50 bg-white/50 py-3 pl-10 pr-4 text-sm transition-all duration-200 placeholder:text-gray-400 focus:border-main-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-main-400/20 dark:border-gray-600/50 dark:bg-gray-700/50 dark:text-gray-100 dark:placeholder:text-gray-400 dark:focus:border-main-500 dark:focus:bg-gray-700"
                            />
                            <button
                                type="submit"
                                className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg bg-main-500 px-4 py-1 text-sm text-white hover:bg-main-600"
                            >
                                Search
                            </button>
                        </form>

                        {/* Filter */}
                        <div className="relative w-full sm:w-auto">
                            <FilterIcon className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-gray-400" />
                            <select
                                value={filter}
                                onChange={(e) => setFilter(e.target.value)}
                                className="w-full appearance-none rounded-xl border border-gray-300/50 bg-white/50 py-3 pl-10 pr-8 text-sm transition-all duration-200 focus:border-main-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-main-400/20 dark:border-gray-600/50 dark:bg-gray-700/50 dark:text-gray-100 dark:focus:border-main-500 dark:focus:bg-gray-700 sm:min-w-[180px]"
                            >
                                <option value="all">All Status</option>
                                <option value="Pending">🟡 Pending</option>
                                <option value="In-Progress">
                                    🔵 In Progress
                                </option>
                                <option value="Completed">🟢 Completed</option>
                                <option value="Canceled">🔴 Canceled</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OrdersFilter;
