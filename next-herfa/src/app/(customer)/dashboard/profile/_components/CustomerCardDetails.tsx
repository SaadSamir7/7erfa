import Image from "next/image";
import Link from "next/link";
import { Edit3, Mail, MapPin } from "lucide-react";
import { CustomerUser } from "@/types/user";
import CustomerProfileDetails from "./CustomerProfileDetails";

const BACKEND_URL = process.env.BACKEND_URL;

export default function CustomerCardDetails({ user }: { user: CustomerUser }) {
    return (
        <>
            <div className="mb-8 flex flex-col items-center gap-6 lg:flex-row">
                <div className="group relative">
                    <div className="absolute inset-0 rounded-full bg-gradient-to-r from-main-400 to-main-500 opacity-75 blur-lg transition-opacity duration-300 group-hover:opacity-100"></div>
                    <div className="relative rounded-full bg-gradient-to-r from-main-500 to-main-600 p-1">
                        <Image
                            height={128}
                            width={128}
                            src={
                                user?.image && user?.image !== "default.png"
                                    ? `${BACKEND_URL}/uploads/${user?.image}?t=${user?.imageUpdatedAt}`
                                    : "/default.png"
                            }
                            alt="Profile"
                            className="h-32 w-32 rounded-full bg-white object-cover p-1"
                        />
                    </div>
                </div>

                <div className="flex flex-col items-center lg:flex-1 lg:items-start">
                    <div className="mb-2 flex w-full items-center gap-4 lg:justify-between">
                        <h2 className="bg-gradient-to-r from-gray-800 to-main-600 bg-clip-text text-2xl font-bold capitalize text-transparent dark:from-white dark:to-main-400 lg:text-3xl">
                            {user?.name}
                        </h2>

                        {/* Edit Button */}
                        <Link
                            href="/dashboard/profile/edit"
                            className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-main-500 to-main-600 px-4 py-2 text-sm font-semibold text-white shadow-lg transition-all duration-300 hover:from-main-600 hover:to-main-700 hover:shadow-xl"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                            <div className="relative flex items-center gap-2">
                                <Edit3 size={16} />
                                Edit
                            </div>
                        </Link>
                    </div>
                    <div className="mb-4 flex items-center gap-2 text-gray-600 dark:text-gray-300">
                        <Mail className="h-4 w-4" />
                        <span>{user?.email}</span>
                    </div>
                    <div className="flex flex-wrap gap-3">
                        <div className="inline-flex items-center gap-2 rounded-full border border-main-200 bg-gradient-to-r from-main-50 to-main-100 px-4 py-2 dark:border-main-700 dark:from-main-900/30 dark:to-main-800/30">
                            <div className="h-2 w-2 rounded-full bg-main-500"></div>
                            <span className="text-sm font-semibold text-main-700 dark:text-main-300">
                                Customer
                            </span>
                        </div>
                        <div className="inline-flex items-center gap-2 rounded-full border border-green-200 bg-gradient-to-r from-green-50 to-emerald-50 px-4 py-2 dark:border-green-700 dark:from-green-900/30 dark:to-emerald-900/30">
                            <MapPin className="h-3 w-3 text-green-600 dark:text-green-400" />
                            <span className="text-sm font-semibold text-green-700 dark:text-green-300">
                                {user?.city}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
            <CustomerProfileDetails user={user} />
        </>
    );
}
