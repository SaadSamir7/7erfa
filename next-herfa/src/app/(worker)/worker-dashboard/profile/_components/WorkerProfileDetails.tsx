import { WorkerUser } from "@/types/user";
import {
    User,
    Mail,
    Phone,
    MapPin,
    Clock,
    DollarSign,
    Star,
} from "lucide-react";

interface WorkerProfileDetailsProps {
    user: WorkerUser;
}

export default function WorkerProfileDetails({ user }: WorkerProfileDetailsProps) {

    return (
        <div className="mt-8 space-y-6">
            {/* Stats Cards Grid */}
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-4">
                {/* Experience Card */}
                <div className="relative overflow-hidden rounded-xl border border-main-200/50 bg-gradient-to-r from-main-50 to-main-100 p-6 dark:border-main-700/50 dark:from-main-900/20 dark:to-main-800/20">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-main-600 dark:text-main-400">
                                Experience
                            </p>
                            <p className="text-2xl font-bold text-main-900 dark:text-main-100">
                                {user?.yearsOfExperience || 0}
                            </p>
                            <p className="text-xs text-main-600/70 dark:text-main-400/70">
                                Years
                            </p>
                        </div>
                        <div className="rounded-full bg-main-500/10 p-3">
                            <Clock className="h-6 w-6 text-main-500" />
                        </div>
                    </div>
                </div>

                {/* Hourly Rate Card */}
                <div className="relative overflow-hidden rounded-xl border border-amber-200/50 bg-gradient-to-r from-amber-50 to-yellow-50 p-6 dark:border-amber-700/50 dark:from-amber-900/20 dark:to-yellow-900/20">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-amber-600 dark:text-amber-400">
                                Hourly Rate
                            </p>
                            <p className="text-2xl font-bold text-amber-900 dark:text-amber-100">
                                ${user?.hourlyRate || 0}
                            </p>
                            <p className="text-xs text-amber-600/70 dark:text-amber-400/70">
                                Per hour
                            </p>
                        </div>
                        <div className="rounded-full bg-amber-500/10 p-3">
                            <DollarSign className="h-6 w-6 text-amber-500" />
                        </div>
                    </div>
                </div>

                {/* Skill Card */}
                <div className="relative overflow-hidden rounded-xl border border-orange-200/50 bg-gradient-to-r from-orange-50 to-red-50 p-6 dark:border-orange-700/50 dark:from-orange-900/20 dark:to-red-900/20">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-orange-600 dark:text-orange-400">
                                Specialization
                            </p>
                            <p className="truncate text-lg font-bold text-orange-900 dark:text-orange-100">
                                {user?.skill}
                            </p>
                            <p className="text-xs text-orange-600/70 dark:text-orange-400/70">
                                Primary Skill
                            </p>
                        </div>
                        <div className="rounded-full bg-orange-500/10 p-3">
                            <Star className="h-6 w-6 text-orange-500" />
                        </div>
                    </div>
                </div>

                {/* Location Card */}
                <div className="relative overflow-hidden rounded-xl border border-yellow-200/50 bg-gradient-to-r from-yellow-50 to-orange-50 p-6 dark:border-yellow-700/50 dark:from-yellow-900/20 dark:to-orange-900/20">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-yellow-600 dark:text-yellow-400">
                                Location
                            </p>
                            <p className="truncate text-lg font-bold text-yellow-900 dark:text-yellow-100">
                                {user?.city}
                            </p>
                            <p className="text-xs text-yellow-600/70 dark:text-yellow-400/70">
                                Current City
                            </p>
                        </div>
                        <div className="rounded-full bg-yellow-500/10 p-3">
                            <MapPin className="h-6 w-6 text-yellow-500" />
                        </div>
                    </div>
                </div>
            </div>

            {/* Information Cards */}
            <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                {/* Contact Information Card */}
                <div className="group relative overflow-hidden rounded-xl border border-gray-200/50 bg-gradient-to-br from-white to-gray-50/30 p-6 shadow-lg backdrop-blur-sm dark:border-gray-600/50 dark:from-gray-700/50 dark:to-gray-800/30">
                    <div className="absolute inset-0 bg-gradient-to-br from-main-500/5 to-main-600/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                    <div className="relative z-10">
                        <div className="mb-4 flex items-center gap-3">
                            <div className="rounded-full bg-main-500/10 p-2">
                                <Mail className="h-5 w-5 text-main-500" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                                Contact Information
                            </h3>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3 rounded-lg bg-white/50 p-3 dark:bg-gray-700/50">
                                <Phone className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        Phone
                                    </p>
                                    <p className="font-medium text-gray-800 dark:text-gray-200">
                                        {user?.phoneNumber}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 rounded-lg bg-white/50 p-3 dark:bg-gray-700/50">
                                <Mail className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        Email
                                    </p>
                                    <p className="font-medium text-gray-800 dark:text-gray-200">
                                        {user?.email}
                                    </p>
                                </div>
                            </div>
                            <div className="flex items-center gap-3 rounded-lg bg-white/50 p-3 dark:bg-gray-700/50">
                                <MapPin className="h-4 w-4 text-gray-500 dark:text-gray-400" />
                                <div>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">
                                        City
                                    </p>
                                    <p className="font-medium text-gray-800 dark:text-gray-200">
                                        {user?.city}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Professional Bio Card */}
                <div className="group relative overflow-hidden rounded-xl border border-gray-200/50 bg-gradient-to-br from-white to-gray-50/30 p-6 shadow-lg backdrop-blur-sm dark:border-gray-600/50 dark:from-gray-700/50 dark:to-gray-800/30">
                    <div className="absolute inset-0 bg-gradient-to-br from-main-500/5 to-main-600/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                    <div className="relative z-10">
                        <div className="mb-4 flex items-center gap-3">
                            <div className="rounded-full bg-main-500/10 p-2">
                                <User className="h-5 w-5 text-main-500" />
                            </div>
                            <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-100">
                                Professional Bio
                            </h3>
                        </div>
                        <div className="rounded-lg bg-white/50 p-4 dark:bg-gray-700/50">
                            <p className="leading-relaxed text-gray-700 dark:text-gray-300">
                                {user?.bio ||
                                    "No bio provided yet. Click 'Edit Profile' to add your professional background and expertise."}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
