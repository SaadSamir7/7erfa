import { useNavigate } from "react-router-dom";

function Error({ message, title = "Oops! Something went wrong" }) {
  const navigate = useNavigate();
  return (
    <div className="flex items-center justify-center min-h-[400px] p-8 bg-white dark:bg-gray-900">
      <div className="max-w-md w-full text-center">
        {/* Error Icon */}
        <div className="mb-6 flex justify-center">
          <div className="relative">
            <div className="w-20 h-20 bg-red-100 dark:bg-red-900/30 rounded-full flex items-center justify-center animate-pulse">
              <svg
                className="w-10 h-10 text-red-500 dark:text-red-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
                />
              </svg>
            </div>
            <div className="absolute -top-1 -right-1 w-6 h-6 bg-red-500 dark:bg-red-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xs font-bold">!</span>
            </div>
          </div>
        </div>

        {/* Error Content */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
            {title}
          </h3>

          {message && (
            <div className="bg-red-50 dark:bg-red-900/20 border-l-4 border-red-400 dark:border-red-500 p-4 rounded-r-lg">
              <p className="text-red-700 dark:text-red-300 text-sm font-medium">
                {message}
              </p>
            </div>
          )}

          <p className="text-gray-600 dark:text-gray-400 text-sm">
            We&apos;re sorry for the inconvenience. Please try refreshing the
            page or contact support if the problem persists.
          </p>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center mt-6">
            <button
              onClick={() => navigate(0)}
              className="px-6 py-2 bg-main-600 hover:bg-main-700 text-white font-medium rounded-lg transition-all duration-200 hover:scale-105 hover:shadow-lg"
            >
              Try Again
            </button>
            <button
              onClick={() => navigate(-1)}
              className="px-6 py-2 bg-gray-100 hover:bg-gray-200 dark:bg-gray-700 dark:hover:bg-gray-600 text-gray-700 dark:text-gray-200 font-medium rounded-lg transition-all duration-200 hover:scale-105 border border-gray-300 dark:border-gray-600"
            >
              Go Back
            </button>
          </div>
        </div>

        {/* Decorative Element */}
        <div className="mt-8 flex justify-center space-x-1">
          <div className="w-2 h-2 bg-main-400 rounded-full animate-bounce"></div>
          <div
            className="w-2 h-2 bg-main-500 rounded-full animate-bounce"
            style={{ animationDelay: "0.1s" }}
          ></div>
          <div
            className="w-2 h-2 bg-main-600 rounded-full animate-bounce"
            style={{ animationDelay: "0.2s" }}
          ></div>
        </div>
      </div>
    </div>
  );
}

export default Error;
