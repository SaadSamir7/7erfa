function FullPageLoader() {
  return (
    <div className="flex h-[calc(100vh-4rem)] items-center justify-center bg-gradient-to-br from-orange-50 via-amber-50/30 to-main-50/40 dark:from-gray-900 dark:via-gray-800 dark:to-main-900/20transition-colors duration-300">
      <div className="flex flex-col items-center space-y-6">
        {/* Logo Container with Glow Effect */}
        <div className="relative">
          {/* Glow Background */}
          <div className="absolute inset-0 bg-main-500 opacity-20 rounded-full blur-xl animate-pulse"></div>

          {/* Logo */}
          <div className="relative bg-white dark:bg-gray-800 rounded-full p-4 shadow-2xl">
            <img
              src="/logos/logo.gif"
              alt="Loading..."
              className="h-28 w-28 rounded-full object-cover object-center"
            />
          </div>

          {/* Rotating Ring */}
          <div className="absolute inset-0 border-4 border-transparent border-t-main-500 rounded-full animate-spin"></div>
        </div>

        {/* Loading Text */}
        <div className="text-center space-y-2">
          <h2 className="text-xl font-semibold text-gray-800 dark:text-gray-200 animate-pulse">
            Loading...
          </h2>
          <p className="text-sm text-gray-600 dark:text-gray-400">
            Please wait while we prepare everything for you
          </p>
        </div>

        {/* Loading Dots Animation */}
        <div className="flex space-x-2">
          <div className="w-3 h-3 bg-main-500 rounded-full animate-bounce"></div>
          <div
            className="w-3 h-3 bg-main-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-3 h-3 bg-main-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default FullPageLoader;
