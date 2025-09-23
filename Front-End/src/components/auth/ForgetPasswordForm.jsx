import { motion } from "framer-motion";
import { Form, Link, useNavigate } from "react-router-dom";
import { KeyRound, Mail } from "lucide-react";

import { useForgetPassword } from "./useForgetPassword";
import FullPageLoader from "../../ui/FullPageLoader";

function ForgetPasswordForm() {
  const navigate = useNavigate();
  const { forgetPassword, isPending: isSending, error } = useForgetPassword();
  if (isSending) {
    return <FullPageLoader />;
  }

  function handleSubmit(e) {
    e.preventDefault();
    const email = e.target.email.value;
    forgetPassword(email, {
      onSuccess: () => {
        navigate("/login");
      },
    });
  }
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-md"
    >
      <div className="bg-gradient-to-r from-main-50/50 to-main-100/50 dark:from-main-900/20 dark:to-main-800/20 rounded-xl p-1">
        <Form
          method="POST"
          className="bg-white dark:bg-gray-800 rounded-lg p-8 space-y-6 shadow-xl backdrop-blur-sm border border-white/20"
          onSubmit={handleSubmit}
        >
          {/* Header Section */}
          <div className="text-center space-y-4 relative">
            <div className="relative z-10">
              {/* Logo/Icon Section */}
              <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.5 }}
                className="mb-4 flex justify-center"
              >
                <div className="relative">
                  <div className="h-16 w-16 rounded-2xl bg-gradient-to-r from-main-500 to-main-600 p-3 shadow-xl">
                    <div className="h-full w-full rounded-xl bg-white/20 flex items-center justify-center">
                      <KeyRound className="h-8 w-8 text-white" />
                    </div>
                  </div>
                  <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-main-400 to-main-600 opacity-0 blur transition-opacity duration-300 group-hover:opacity-30"></div>
                </div>
              </motion.div>

              {/* Title */}
              <motion.h3
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.3, duration: 0.5 }}
                className="text-4xl font-extrabold bg-gradient-to-r from-gray-800 via-main-600 to-main-700 bg-clip-text text-transparent dark:from-white dark:via-main-300 dark:to-main-400 mb-2"
              >
                Forgot Password
              </motion.h3>

              {/* Subtitle */}
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-gray-600 dark:text-gray-300 font-medium"
              >
                Enter your email to receive a{" "}
                <span className="text-main-600 dark:text-main-400 font-semibold">
                  reset link
                </span>
              </motion.p>

              {/* Decorative divider */}
              <motion.div
                initial={{ scaleX: 0, opacity: 0 }}
                animate={{ scaleX: 1, opacity: 1 }}
                transition={{ delay: 0.5, duration: 0.6 }}
                className="mt-6 mb-2 mx-auto w-24 h-1 bg-gradient-to-r from-transparent via-main-500 to-transparent rounded-full"
              ></motion.div>
            </div>
          </div>

          <div className="space-y-6">
            {/* Email Field */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                <Mail className="h-4 w-4 text-main-500" />
                Email Address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                placeholder="Enter your email address"
                className="w-full rounded-xl border border-gray-300/50 bg-white/50 py-3 px-4 text-sm transition-all duration-200 focus:border-main-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-main-400/20 dark:border-gray-600/50 dark:bg-gray-700/50 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500"
                required
                aria-label="Email Address"
              />
            </div>

            {/* Error Message */}
            {error && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="p-3 rounded-lg bg-red-50 border border-red-200 dark:bg-red-900/20 dark:border-red-800"
              >
                <span className="text-sm text-red-600 dark:text-red-400">
                  {typeof error === "string"
                    ? error
                    : "Invalid email, please try again."}
                </span>
              </motion.div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-main-500 to-main-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:from-main-600 hover:to-main-700 hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              aria-label="Send Reset Link"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              <div className="relative">Send Reset Link</div>
            </button>

            {/* Back to Login Link */}
            <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-gray-600 dark:text-gray-300">
                Remembered your password?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-main-600 hover:text-main-700 dark:text-main-400 dark:hover:text-main-300 transition-colors"
                >
                  Back to Login
                </Link>
              </p>
            </div>
          </div>
        </Form>
      </div>
    </motion.div>
  );
}

export default ForgetPasswordForm;
