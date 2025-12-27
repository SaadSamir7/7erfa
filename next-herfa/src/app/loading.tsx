import Image from "next/image";

function FullPageLoader() {
    return (
        <div className="dark:to-main-900/20transition-colors flex h-[calc(100vh-4rem)] items-center justify-center bg-gradient-to-br from-orange-50 via-amber-50/30 to-main-50/40 duration-300 dark:from-gray-900 dark:via-gray-800">
            <div className="flex flex-col items-center space-y-6">
                {/* Logo Container with Glow Effect */}
                <div className="relative">
                    {/* Glow Background */}
                    <div className="absolute inset-0 animate-pulse rounded-full bg-main-500 opacity-20 blur-xl"></div>

                    {/* Logo */}
                    <div className="relative rounded-full bg-white p-4 shadow-2xl dark:bg-gray-800">
                        <Image
                            width={112}
                            height={112}
                            src="/logos/logo.gif"
                            alt="Loading..."
                            className="h-28 w-28 rounded-full object-cover object-center"
                        />
                    </div>

                    {/* Rotating Ring */}
                    <div className="absolute inset-0 animate-spin rounded-full border-4 border-transparent border-t-main-500"></div>
                </div>

                {/* Loading Text */}
                <div className="space-y-2 text-center">
                    <h2 className="animate-pulse text-xl font-semibold text-gray-800 dark:text-gray-200">
                        Loading...
                    </h2>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                        Please wait while we prepare everything for you
                    </p>
                </div>

                {/* Loading Dots Animation */}
                <div className="flex space-x-2">
                    <div className="h-3 w-3 animate-bounce rounded-full bg-main-500"></div>
                    <div
                        className="h-3 w-3 animate-bounce rounded-full bg-main-500"
                        style={{ animationDelay: "0.1s" }}
                    ></div>
                    <div
                        className="h-3 w-3 animate-bounce rounded-full bg-main-500"
                        style={{ animationDelay: "0.2s" }}
                    ></div>
                </div>
            </div>
        </div>
    );
}

export default FullPageLoader;
