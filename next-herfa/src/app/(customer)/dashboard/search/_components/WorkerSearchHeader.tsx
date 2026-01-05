import { StarIcon, SearchIcon, BriefcaseIcon } from "lucide-react";

function WorkerSearchHeader({ workersNum }: { workersNum: number }) {
    return (
        <div className="relative mb-6 overflow-hidden text-center">
            {/* Background decorative elements */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 dark:opacity-10">
                <SearchIcon className="h-72 w-96 text-main-600" />
            </div>

            <div>
                {/* Main Heading */}
                <h1 className="mb-4 mt-4 bg-gradient-to-r from-gray-800 via-main-600 to-gray-800 bg-clip-text text-3xl font-black text-transparent dark:from-white dark:via-main-400 dark:to-gray-100 lg:text-5xl xl:text-6xl">
                    Find Your Perfect
                    <span className="block bg-gradient-to-r from-main-500 to-blue-500 bg-clip-text font-extrabold text-transparent">
                        Skilled Worker
                    </span>
                </h1>

                {/* Subtitle */}
                <p className="mx-auto max-w-3xl text-base leading-relaxed text-gray-600 dark:text-gray-300 lg:text-lg">
                    Connect with verified professionals across various skills.
                    Browse ratings, experience levels, and find the perfect
                    match for your project needs.
                </p>

                {/* Stats Bar */}
                <div className="mb-4 mt-6 flex flex-wrap justify-center gap-6 text-sm">
                    <div className="flex items-center gap-2 rounded-full border border-gray-200/50 bg-white/50 px-4 py-2 backdrop-blur-sm dark:border-gray-600/50 dark:bg-gray-700/50">
                        <div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
                        <span className="font-medium text-gray-700 dark:text-gray-300">
                            {workersNum || 0}+ Active Workers
                        </span>
                    </div>

                    <div className="flex items-center gap-2 rounded-full border border-gray-200/50 bg-white/50 px-4 py-2 backdrop-blur-sm dark:border-gray-600/50 dark:bg-gray-700/50">
                        <StarIcon className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                        <span className="font-medium text-gray-700 dark:text-gray-300">
                            Verified Professionals
                        </span>
                    </div>

                    <div className="flex items-center gap-2 rounded-full border border-gray-200/50 bg-white/50 px-4 py-2 backdrop-blur-sm dark:border-gray-600/50 dark:bg-gray-700/50">
                        <BriefcaseIcon className="h-3 w-3 text-main-500" />
                        <span className="font-medium text-gray-700 dark:text-gray-300">
                            6+ Categories
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default WorkerSearchHeader;
