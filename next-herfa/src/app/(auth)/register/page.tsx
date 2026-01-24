import { User, Briefcase, UserPlus } from "lucide-react";
import Link from "next/link";

export default function Page() {
    return (
        <div className="mb-10 w-full max-w-2xl">
            <div className="rounded-xl bg-gradient-to-r from-main-50/50 to-main-100/50 p-1 dark:from-main-900/20 dark:to-main-800/20">
                <div className="space-y-6 rounded-lg border border-white/20 bg-white p-8 shadow-xl backdrop-blur-sm dark:bg-gray-800">
                    {/* Header Section */}
                    <div className="relative space-y-4 text-center">
                        <div className="relative z-10">
                            {/* Logo/Icon Section */}
                            <div className="mb-4 flex justify-center">
                                <div className="relative">
                                    <div className="h-16 w-16 rounded-2xl bg-gradient-to-r from-main-500 to-main-600 p-3 shadow-xl">
                                        <UserPlus className="h-full w-full text-white" />
                                    </div>
                                    <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-main-400 to-main-600 opacity-0 blur transition-opacity duration-300 group-hover:opacity-30"></div>
                                </div>
                            </div>

                            {/* Title */}
                            <h3 className="mb-2 bg-gradient-to-r from-gray-800 via-main-600 to-main-700 bg-clip-text text-4xl font-extrabold text-transparent dark:from-white dark:via-main-300 dark:to-main-400">
                                Join 7erfa
                            </h3>

                            {/* Subtitle */}
                            <p className="font-medium text-gray-600 dark:text-gray-300">
                                Choose how you want to get started with{" "}
                                <span className="font-semibold text-main-600 dark:text-main-400">
                                    7erfa
                                </span>
                            </p>

                            {/* Decorative divider */}
                            <div className="mx-auto mb-2 mt-6 h-1 w-24 rounded-full bg-gradient-to-r from-transparent via-main-500 to-transparent"></div>
                        </div>
                    </div>

                    {/* Registration Type Selection */}
                    <div className="space-y-6 pt-6">
                        <h4 className="text-center text-lg font-semibold text-gray-700 dark:text-gray-200">
                            I want to register as
                        </h4>

                        <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                            {/* Worker Registration Button */}
                            <Link href="/register/worker">
                                <div className="group cursor-pointer">
                                    <div className="relative overflow-hidden rounded-2xl border-2 border-gray-200 bg-gradient-to-br from-white to-gray-50 p-8 transition-all duration-300 hover:border-main-500 hover:shadow-xl dark:border-gray-600 dark:from-gray-700 dark:to-gray-800 dark:hover:border-main-400">
                                        <div className="absolute inset-0 bg-gradient-to-br from-main-500/5 to-main-600/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

                                        <div className="relative z-10 flex flex-col items-center space-y-4">
                                            <div className="rounded-full bg-main-100 p-4 transition-colors duration-300 group-hover:bg-main-200 dark:bg-main-900/30 dark:group-hover:bg-main-800/40">
                                                <Briefcase className="h-10 w-10 text-main-600 dark:text-main-400" />
                                            </div>

                                            <div className="text-center">
                                                <h5 className="text-xl font-bold text-gray-800 dark:text-white">
                                                    Worker
                                                </h5>
                                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                                                    Offer your services and
                                                    connect with customers
                                                </p>
                                            </div>

                                            <div className="mt-4 font-medium text-main-600 group-hover:underline dark:text-main-400">
                                                Get Started →
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>

                            {/* Customer Registration Button */}
                            <Link href="/register/customer">
                                <div className="group cursor-pointer">
                                    <div className="relative overflow-hidden rounded-2xl border-2 border-gray-200 bg-gradient-to-br from-white to-gray-50 p-8 transition-all duration-300 hover:border-main-500 hover:shadow-xl dark:border-gray-600 dark:from-gray-700 dark:to-gray-800 dark:hover:border-main-400">
                                        <div className="absolute inset-0 bg-gradient-to-br from-main-500/5 to-main-600/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

                                        <div className="relative z-10 flex flex-col items-center space-y-4">
                                            <div className="rounded-full bg-main-100 p-4 transition-colors duration-300 group-hover:bg-main-200 dark:bg-main-900/30 dark:group-hover:bg-main-800/40">
                                                <User className="h-10 w-10 text-main-600 dark:text-main-400" />
                                            </div>

                                            <div className="text-center">
                                                <h5 className="text-xl font-bold text-gray-800 dark:text-white">
                                                    Customer
                                                </h5>
                                                <p className="mt-2 text-sm text-gray-600 dark:text-gray-300">
                                                    Find skilled workers for
                                                    your projects
                                                </p>
                                            </div>

                                            <div className="mt-4 font-medium text-main-600 group-hover:underline dark:text-main-400">
                                                Get Started →
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </Link>
                        </div>
                    </div>

                    {/* Login Link */}
                    <div className="border-t border-gray-200 pt-6 text-center dark:border-gray-700">
                        <p className="text-gray-600 dark:text-gray-300">
                            Already have an account?{" "}
                            <Link
                                href="/login"
                                className="font-semibold text-main-600 transition-colors hover:text-main-700 dark:text-main-400 dark:hover:text-main-300"
                            >
                                Sign In
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
