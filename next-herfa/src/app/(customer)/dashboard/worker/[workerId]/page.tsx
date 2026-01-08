import TestimonialCard from "@/app/(worker)/worker-dashboard/_components/TestimonialCard";
import { auth } from "@/auth";
import { getReviews } from "@/services/apiReviews";
import { getWorkerById } from "@/services/apiWorkers";
import { IReview } from "@/types/reviews";
import { WorkerUser } from "@/types/user";
import { decryptId } from "@/utils/cryptoUtils";
import {
    CalendarArrowUp,
    Star,
    MapPin,
    Mail,
    Phone,
    DollarSign,
    Clock,
    Award,
    User,
} from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";

const BACKEND_URL = process.env.BACKEND_URL;

export default async function Page({
    params,
}: {
    params: { workerId: string };
}) {
    const { workerId } = await params;
    const session = await auth();
    const user = session?.user;
    const worker = (await getWorkerById(decryptId(workerId))).data
        .data as WorkerUser;
    if (!worker) notFound();

    const reviews = (await getReviews(
        worker._id,
        session?.accessToken || ""
    )) as IReview[];
    const myReview = reviews.find((review) => review.customer.id === user?._id);

    return (
        <div className="min-h-screen bg-gradient-to-br from-orange-50 via-amber-50/30 to-main-50/40 p-4 dark:from-gray-900 dark:via-gray-800 dark:to-main-900/20 lg:p-8">
            <div className="mx-auto max-w-7xl space-y-8">
                {/* Header Section */}
                <div className="rounded-2xl border border-white/20 bg-white/70 p-8 shadow-lg backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/70">
                    <div className="flex flex-col items-center justify-between gap-6 lg:flex-row">
                        <div className="flex items-center gap-6">
                            <div className="relative">
                                <Image
                                    width={96}
                                    height={96}
                                    className="h-24 w-24 rounded-full border-4 border-white object-cover shadow-xl dark:border-gray-700 lg:h-32 lg:w-32"
                                    src={
                                        worker.image &&
                                        worker.image !== "default.png"
                                            ? `${BACKEND_URL}/uploads/${worker.image}?t=${worker?.imageUpdatedAt}`
                                            : "/default.png"
                                    }
                                    alt={worker.name}
                                />
                                <div className="absolute -bottom-2 -right-2 rounded-full bg-gradient-to-r from-main-500 to-main-600 px-3 py-1 text-sm font-semibold text-white shadow-lg">
                                    {worker.ratingsAverage} ⭐
                                </div>
                            </div>
                            <div>
                                <h1 className="mb-2 text-2xl font-bold text-gray-800 dark:text-gray-50 lg:text-3xl">
                                    Hi I&apos;m {worker.name} 👋
                                </h1>
                                <div className="mb-2 flex items-center gap-3">
                                    <span className="inline-flex items-center gap-2 rounded-full border border-main-200 bg-gradient-to-r from-main-50 to-main-100 px-4 py-2 font-medium text-main-700 dark:border-main-700 dark:from-main-900/30 dark:to-main-800/30 dark:text-main-400">
                                        <Award size={16} />
                                        {worker.skill}
                                    </span>
                                    <span className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-gradient-to-r from-green-50 to-green-100 px-4 py-2 font-medium text-green-700 dark:border-green-700 dark:from-green-900/30 dark:to-green-800/30 dark:text-green-400">
                                        <Clock size={16} />
                                        {worker.yearsOfExperience} Years
                                    </span>
                                </div>
                                <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                                    <MapPin size={16} />
                                    <span>{worker.city}</span>
                                    <span className="mx-2">•</span>
                                    <DollarSign size={16} />
                                    <span>${worker.hourlyRate}/hour</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <Link
                                href={`/dashboard/worker/${workerId}/create-order`}
                                className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-blue-500 to-blue-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:from-blue-600 hover:to-blue-700 hover:shadow-xl"
                            >
                                <CalendarArrowUp size={20} />
                                Make Order
                            </Link>

                            {myReview ? (
                                <Link
                                    href={`/dashboard/worker/${workerId}/make-review?reviewId=${myReview._id}&text=${encodeURIComponent(myReview.review)}&rating=${myReview.rating}`}
                                    className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:from-yellow-600 hover:to-yellow-700 hover:shadow-xl"
                                >
                                    <Star size={20} />
                                    Edit Review
                                </Link>
                            ) : (
                                <Link
                                    href={`/dashboard/worker/${workerId}/make-review`}
                                    className="group flex items-center gap-2 rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-200 hover:scale-105 hover:from-yellow-600 hover:to-yellow-700 hover:shadow-xl"
                                >
                                    <Star size={20} />
                                    Write Review
                                </Link>
                            )}
                        </div>
                    </div>
                </div>

                {/* Worker Information Cards */}
                <div className="grid grid-cols-1 gap-8 lg:grid-cols-2">
                    {/* Personal Information */}
                    <div className="rounded-2xl border border-white/20 bg-white/70 p-6 shadow-lg backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/70">
                        <div className="mb-6 flex items-center gap-3">
                            <div className="rounded-xl bg-gradient-to-r from-main-500 to-main-600 p-2">
                                <User size={20} className="text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-50">
                                Personal Information
                            </h3>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3 dark:bg-gray-700/50">
                                <MapPin size={18} className="text-main-500" />
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        City
                                    </p>
                                    <p className="font-semibold text-gray-800 dark:text-gray-200">
                                        {worker.city}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3 dark:bg-gray-700/50">
                                <Mail size={18} className="text-main-500" />
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Email
                                    </p>
                                    <p className="font-semibold text-gray-800 dark:text-gray-200">
                                        {worker.email}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3 dark:bg-gray-700/50">
                                <Phone size={18} className="text-main-500" />
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Phone
                                    </p>
                                    <p className="font-semibold text-gray-800 dark:text-gray-200">
                                        {worker.phoneNumber}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Professional Information */}
                    <div className="rounded-2xl border border-white/20 bg-white/70 p-6 shadow-lg backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/70">
                        <div className="mb-6 flex items-center gap-3">
                            <div className="rounded-xl bg-gradient-to-r from-green-500 to-green-600 p-2">
                                <Award size={20} className="text-white" />
                            </div>
                            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-50">
                                Professional Details
                            </h3>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3 dark:bg-gray-700/50">
                                <Clock size={18} className="text-green-500" />
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Experience
                                    </p>
                                    <p className="font-semibold text-gray-800 dark:text-gray-200">
                                        {worker.yearsOfExperience} Years
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3 dark:bg-gray-700/50">
                                <DollarSign
                                    size={18}
                                    className="text-green-500"
                                />
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Hourly Rate
                                    </p>
                                    <p className="font-semibold text-gray-800 dark:text-gray-200">
                                        ${worker.hourlyRate}/hour
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 rounded-lg bg-gray-50 p-3 dark:bg-gray-700/50">
                                <Star size={18} className="text-yellow-500" />
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400">
                                        Rating
                                    </p>
                                    <p className="font-semibold text-gray-800 dark:text-gray-200">
                                        {worker.ratingsAverage} ⭐
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* About Section */}
                <div className="rounded-2xl border border-white/20 bg-white/70 p-6 shadow-lg backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/70">
                    <h3 className="mb-4 text-xl font-bold text-gray-800 dark:text-gray-50">
                        About {worker.name}
                    </h3>
                    <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                        {worker.bio}
                    </p>
                </div>

                {/* Reviews Section */}
                {reviews.length > 0 && <TestimonialList reviews={reviews} />}
            </div>
        </div>
    );
}

const TestimonialList = ({ reviews }: { reviews: IReview[] }) => {
    return (
        <div className="rounded-2xl border border-white/20 bg-white/70 p-8 shadow-lg backdrop-blur-sm dark:border-gray-700/50 dark:bg-gray-800/70">
            <div className="mb-8 flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="rounded-xl bg-gradient-to-r from-yellow-500 to-yellow-600 p-2">
                        <Star size={20} className="fill-current text-white" />
                    </div>
                    <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-50">
                        Latest Reviews
                    </h2>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                    {reviews.length} review{reviews.length !== 1 ? "s" : ""}
                </div>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                {reviews.slice(0, 4).map((testimonial) => (
                    <div key={testimonial._id}>
                        <TestimonialCard testimonial={testimonial} />
                    </div>
                ))}
            </div>
            {reviews.length > 4 && (
                <div className="mt-6 text-center">
                    <p className="text-sm text-gray-500 dark:text-gray-400">
                        Showing 4 of {reviews.length} reviews
                    </p>
                </div>
            )}
        </div>
    );
};
