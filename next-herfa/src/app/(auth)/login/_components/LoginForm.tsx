"use client";

import { useState } from "react";
import { Mail, Lock, Eye, EyeOff } from "lucide-react";
import Link from "next/link";
import { login } from "@/lib/actions/auth";

export default function LoginForm() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    return (
        <div className="w-full max-w-md">
            <div className="rounded-xl bg-gradient-to-r from-main-50/50 to-main-100/50 p-1 dark:from-main-900/20 dark:to-main-800/20">
                <form
                    className="space-y-6 rounded-lg border border-white/20 bg-white p-8 shadow-xl backdrop-blur-sm dark:bg-gray-800"
                    aria-label="Login Form"
                    action={login}
                >
                    {/* Header Section */}
                    <div className="relative space-y-4 text-center">
                        <div className="relative z-10">
                            {/* Logo/Icon Section */}
                            <div className="mb-4 flex justify-center">
                                <div className="relative">
                                    <div className="h-16 w-16 rounded-2xl bg-gradient-to-r from-main-500 to-main-600 p-3 shadow-xl">
                                        <div className="flex h-full w-full items-center justify-center rounded-xl bg-white/20">
                                            <Lock className="h-8 w-8 text-white" />
                                        </div>
                                    </div>
                                    <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-main-400 to-main-600 opacity-0 blur transition-opacity duration-300 group-hover:opacity-30"></div>
                                </div>
                            </div>

                            {/* Title */}
                            <h3 className="mb-2 bg-gradient-to-r from-gray-800 via-main-600 to-main-700 bg-clip-text text-4xl font-extrabold text-transparent dark:from-white dark:via-main-300 dark:to-main-400">
                                Welcome Back
                            </h3>

                            {/* Subtitle */}
                            <p className="font-medium text-gray-600 dark:text-gray-300">
                                Sign in to access your{" "}
                                <span className="font-semibold text-main-600 dark:text-main-400">
                                    dashboard
                                </span>
                            </p>

                            {/* Decorative divider */}
                            <div className="mx-auto mb-2 mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-transparent via-main-500 to-transparent"></div>
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
                                type="email"
                                name="email"
                                placeholder="Enter your email"
                                className="w-full rounded-xl border border-gray-300/50 bg-white/50 px-4 py-3 text-sm transition-all duration-200 placeholder:text-gray-400 focus:border-main-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-main-400/20 dark:border-gray-600/50 dark:bg-gray-700/50 dark:text-gray-100 dark:placeholder:text-gray-500"
                                required
                                aria-label="Email Address"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div>

                        {/* Password Field */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                                <Lock className="h-4 w-4 text-main-500" />
                                Password
                            </label>
                            <div className="relative">
                                <input
                                    id="password"
                                    name="password"
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    className="w-full rounded-xl border border-gray-300/50 bg-white/50 px-4 py-3 pr-12 text-sm transition-all duration-200 placeholder:text-gray-400 focus:border-main-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-main-400/20 dark:border-gray-600/50 dark:bg-gray-700/50 dark:text-gray-100 dark:placeholder:text-gray-500"
                                    required
                                    aria-label="Password"
                                    value={password}
                                    onChange={(e) =>
                                        setPassword(e.target.value)
                                    }
                                />
                                <button
                                    type="button"
                                    onClick={() =>
                                        setShowPassword(!showPassword)
                                    }
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-gray-300"
                                >
                                    {showPassword ? (
                                        <EyeOff size={18} />
                                    ) : (
                                        <Eye size={18} />
                                    )}
                                </button>
                            </div>
                        </div>

                        {/* Remember Me & Forgot Password */}
                        <div className="flex items-center justify-between">
                            <label className="flex cursor-pointer items-center gap-2">
                                <input
                                    type="checkbox"
                                    className="h-4 w-4 rounded border-gray-300 text-main-500 focus:ring-main-400 dark:border-gray-600 dark:bg-gray-700"
                                    aria-label="Keep me logged in"
                                />
                                <span className="text-sm text-gray-600 dark:text-gray-300">
                                    Remember me
                                </span>
                            </label>
                            <Link
                                href="/forgetPassword"
                                className="text-sm font-medium text-main-600 transition-colors hover:text-main-700 dark:text-main-400 dark:hover:text-main-300"
                            >
                                Forgot password?
                            </Link>
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-main-500 to-main-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-main-600 hover:to-main-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                            aria-label="Sign In"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                            <div className="relative">Sign In</div>
                        </button>

                        {/* Sign Up Link */}
                        <div className="border-t border-gray-200 pt-4 text-center dark:border-gray-700">
                            <p className="text-gray-600 dark:text-gray-300">
                                Don&apos;t have an account?{" "}
                                <Link
                                    href="/register"
                                    className="font-semibold text-main-600 transition-colors hover:text-main-700 dark:text-main-400 dark:hover:text-main-300"
                                >
                                    Create Account
                                </Link>
                            </p>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}
