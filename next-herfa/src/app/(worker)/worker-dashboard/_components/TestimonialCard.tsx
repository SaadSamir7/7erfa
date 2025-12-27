import { Star } from "lucide-react";
import { IReview } from "@/types/reviews";
import Image from "next/image";

const BACKEND_URL = process.env.BACKEND_URL;

const TestimonialCard = ({ testimonial }: { testimonial: IReview }) => {
    const { customer, review, rating } = testimonial;

    const fullStars = Array(rating)
        .fill(null)
        .map((_, index) => (
            <Star
                key={`full-${index}`}
                className="fill-yellow-500 text-yellow-500"
            />
        ));

    const emptyStars = Array(5 - rating)
        .fill(null)
        .map((_, index) => (
            <Star
                key={`empty-${index}`}
                className="fill-gray-300 text-gray-300"
            />
        ));

    return (
        <div className="group relative overflow-hidden rounded-xl border border-gray-200/50 bg-gradient-to-br from-white to-gray-50/30 p-6 backdrop-blur-sm transition-all duration-300 hover:border-main-300/50 hover:shadow-lg dark:border-gray-600/50 dark:from-gray-700/50 dark:to-gray-800/30 dark:hover:border-main-500/50">
            {/* Subtle gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-br from-main-500/5 to-main-600/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

            <div className="relative z-10">
                {/* Header */}
                <div className="mb-6 flex flex-col items-center justify-center gap-4 lg:flex-row lg:justify-between">
                    <div className="flex flex-col items-center justify-center gap-3 lg:flex-row lg:gap-4">
                        <div className="relative">
                            <Image
                                width={56}
                                height={56}
                                src={
                                    customer.image &&
                                    customer.image !== "default.png"
                                        ? `${BACKEND_URL}/uploads/${customer.image}`
                                        : "/default.png"
                                }
                                alt="Profile"
                                className="h-14 w-14 rounded-full object-cover object-center ring-2 ring-main-200 ring-offset-2 transition-all duration-300 group-hover:ring-main-300 dark:ring-main-700 dark:ring-offset-gray-800 lg:h-16 lg:w-16"
                            />
                            <div className="absolute -bottom-1 -right-1 rounded-full bg-gradient-to-r from-main-500 to-main-600 p-1">
                                <Star
                                    size={12}
                                    className="fill-current text-white"
                                />
                            </div>
                        </div>
                        <div className="flex flex-col items-center justify-center gap-1 lg:items-start">
                            <h3 className="text-lg font-bold capitalize text-gray-800 dark:text-gray-50">
                                {customer.name}
                            </h3>
                            <p className="flex items-center space-x-1 text-sm font-medium text-gray-500 dark:text-gray-400">
                                <span className="inline-block h-1.5 w-1.5 rounded-full bg-main-500"></span>
                                <span>{customer.city}</span>
                            </p>
                        </div>
                    </div>
                    {/* Star Ratings */}
                    <div className="flex items-center space-x-1">
                        {[...fullStars, ...emptyStars]}
                        <span className="ml-2 text-sm font-semibold text-gray-600 dark:text-gray-400">
                            {rating}/5
                        </span>
                    </div>
                </div>

                {/* Testimonial Text */}
                <div className="relative">
                    <div className="absolute left-0 top-0 font-serif text-4xl text-main-300/30 dark:text-main-600/30">
                        &ldquo;
                    </div>
                    <p className="pl-6 font-medium italic leading-relaxed text-gray-700 dark:text-gray-200">
                        {review}
                    </p>
                    <div className="absolute bottom-0 right-0 rotate-180 font-serif text-4xl text-main-300/30 dark:text-main-600/30">
                        &rdquo;
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TestimonialCard;
