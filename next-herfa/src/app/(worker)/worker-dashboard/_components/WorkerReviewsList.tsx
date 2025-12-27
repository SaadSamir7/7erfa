import { auth } from "@/auth";
import { getReviews } from "@/services/apiReviews";
import { Star } from "lucide-react";
import Link from "next/link";
import TestimonialCard from "./TestimonialCard";

async function WorkerReviewsList() {
    const session = await auth();
    const user = session?.user;
    const token = session?.accessToken || "";
    const reviews = await getReviews(user!.id, token);
    const displayReviews = reviews?.slice(0, 3);

    return (
        <div className="group rounded-2xl border border-white/20 bg-white/70 p-8 shadow-lg backdrop-blur-sm transition-all duration-300 hover:bg-white/80 hover:shadow-xl dark:border-gray-700/50 dark:bg-gray-800/70 dark:hover:bg-gray-800/80">
            <div className="mb-8 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                    <div className="rounded-xl bg-gradient-to-r from-main-500 to-main-600 p-2">
                        <Star size={20} className="fill-current text-white" />
                    </div>
                    <h2 className="text-xl font-bold text-gray-800 dark:text-gray-50">
                        Latest Reviews
                    </h2>
                </div>
                <Link
                    className="group flex items-center space-x-2 rounded-lg bg-main-50 px-4 py-2 text-sm font-semibold text-main-600 transition-all duration-200 hover:bg-main-100 hover:shadow-md dark:bg-main-900/30 dark:text-main-400 dark:hover:bg-main-900/50"
                    href="/worker-dashboard/reviews"
                >
                    <span>View All</span>
                    <svg
                        className="h-4 w-4 transition-transform group-hover:translate-x-1"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                    >
                        <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M9 5l7 7-7 7"
                        />
                    </svg>
                </Link>
            </div>
            <div className="space-y-6">
                {displayReviews?.length > 0 ? (
                    displayReviews?.map((testimonial) => (
                        <TestimonialCard
                            testimonial={testimonial}
                            key={testimonial.id}
                        />
                    ))
                ) : (
                    <div className="flex flex-col items-center justify-center py-12 text-gray-500 dark:text-gray-400">
                        <Star size={48} className="mb-4 opacity-50" />
                        <p className="text-lg font-medium">No Reviews Yet</p>
                        <p className="text-sm">
                            Customer reviews will appear here
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}

export default WorkerReviewsList;
