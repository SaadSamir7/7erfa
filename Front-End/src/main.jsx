import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import "./index.css";
import App from "./App.jsx";
import { ThemeProvider } from "./context/ThemeContext.jsx";
import { Toaster } from "react-hot-toast";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider>
      <QueryClientProvider client={queryClient}>
        <ReactQueryDevtools initialIsOpen={false} />
        <App />
        <Toaster
          position="top-center"
          gutter={16}
          containerClassName="mt-4 z-50"
          toastOptions={{
            success: {
              duration: 3500,
              className:
                "group relative overflow-hidden bg-gradient-to-r from-emerald-50 to-emerald-100/80 text-emerald-800 border border-emerald-200/60 font-semibold px-6 py-4 rounded-2xl shadow-xl backdrop-blur-md transform transition-all duration-500 hover:scale-105 dark:from-emerald-900/40 dark:to-emerald-800/30 dark:text-emerald-200 dark:border-emerald-600/40 dark:shadow-emerald-900/20",
              style: {
                background:
                  "linear-gradient(135deg, rgb(236, 253, 245) 0%, rgb(209, 250, 229) 100%)",
              },
            },
            error: {
              duration: 6000,
              className:
                "group relative overflow-hidden bg-gradient-to-r from-red-50 to-red-100/80 text-red-800 border border-red-200/60 font-semibold px-6 py-4 rounded-2xl shadow-xl backdrop-blur-md transform transition-all duration-500 hover:scale-105 dark:from-red-900/40 dark:to-red-800/30 dark:text-red-200 dark:border-red-600/40 dark:shadow-red-900/20",
              style: {
                background:
                  "linear-gradient(135deg, rgb(254, 242, 242) 0%, rgb(254, 226, 226) 100%)",
              },
            },
            warning: {
              duration: 4500,
              className:
                "group relative overflow-hidden bg-gradient-to-r from-yellow-50 to-amber-100/80 text-amber-800 border border-amber-200/60 font-semibold px-6 py-4 rounded-2xl shadow-xl backdrop-blur-md transform transition-all duration-500 hover:scale-105 dark:from-amber-900/40 dark:to-yellow-800/30 dark:text-amber-200 dark:border-amber-600/40 dark:shadow-amber-900/20",
              style: {
                background:
                  "linear-gradient(135deg, rgb(255, 251, 235) 0%, rgb(254, 243, 199) 100%)",
              },
            },
            loading: {
              duration: Infinity,
              className:
                "group relative overflow-hidden bg-gradient-to-r from-main-50 to-main-100/80 text-main-800 border border-main-200/60 font-semibold px-6 py-4 rounded-2xl shadow-xl backdrop-blur-md transform transition-all duration-500 animate-pulse dark:from-main-900/40 dark:to-main-800/30 dark:text-main-200 dark:border-main-600/40 dark:shadow-main-900/20",
              style: {
                background:
                  "linear-gradient(135deg, rgb(255, 252, 234) 0%, rgb(255, 245, 197) 100%)",
              },
            },
            className:
              "group relative overflow-hidden text-base max-w-sm px-8 py-5 bg-white/95 text-gray-800 border border-gray-200/60 rounded-2xl shadow-2xl backdrop-blur-md transform transition-all duration-500 hover:scale-105 hover:shadow-3xl dark:bg-gray-800/95 dark:text-gray-100 dark:border-gray-600/50 dark:shadow-gray-900/30",
            style: {
              background:
                "linear-gradient(135deg, rgba(255, 255, 255, 0.95) 0%, rgba(249, 250, 251, 0.9) 100%)",
              fontSize: "15px",
              lineHeight: "1.5",
              fontWeight: "500",
            },
          }}
        />
      </QueryClientProvider>
    </ThemeProvider>
  </StrictMode>
);
