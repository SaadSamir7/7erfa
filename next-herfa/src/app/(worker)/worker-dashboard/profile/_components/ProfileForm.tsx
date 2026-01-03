"use client";
import Link from "next/link";
import { useRouter } from "next/navigation"; // ✅ استخدم useRouter
import {
    User,
    Mail,
    Phone,
    MapPin,
    Clock,
    DollarSign,
    Edit3,
    Camera,
    Save,
    ArrowLeft,
} from "lucide-react";
import { WorkerUser } from "@/types/user";
import { updateWorkerProfile } from "@/lib/actions/updateWorkerProfile";
import { useSession } from "next-auth/react";
import { useState } from "react";

interface ProfileFormProps {
    user: WorkerUser;
    userType: "worker" | "customer";
}

export default function ProfileForm({ user, userType }: ProfileFormProps) {
    const { update, status } = useSession();
    const router = useRouter();
    const [error, setError] = useState<string | null>(null);
    const loading = status === "loading";

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        const formData = new FormData(e.currentTarget);

        try {
            const result = await updateWorkerProfile(formData, user!.token!);

            if (!result.success) {
                setError(result.error || "Failed to update profile");
                return;
            }

            // Update session with new data directly (avoids extra API call)
            await update({
                user: {
                    ...user,
                    ...result.data,
                    token: user.token,
                },
            });

            router.push("/worker-dashboard/profile");
        } catch (error: unknown) {
            console.error("Error:", error);
            setError(
                error instanceof Error
                    ? error.message
                    : "An unexpected error occurred"
            );
        }
    };

    return (
        <div className="mt-8">
            <div className="rounded-xl bg-gradient-to-r from-main-50/50 to-main-100/50 p-1 dark:from-main-900/20 dark:to-main-800/20">
                <form
                    onSubmit={handleSubmit}
                    className="space-y-6 rounded-lg bg-white p-6 dark:bg-gray-800"
                >
                    {/* ✅ Error Message */}
                    {error && (
                        <div className="rounded-lg bg-red-50 p-4 text-red-800 dark:bg-red-900/20 dark:text-red-200">
                            ❌ {error}
                        </div>
                    )}

                    <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
                        {/* Full Name */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                                <User className="h-4 w-4 text-main-500" />
                                Full Name
                            </label>
                            <input
                                id="name"
                                type="text"
                                name="name"
                                defaultValue={user?.name || ""}
                                required
                                disabled={loading}
                                className="w-full rounded-xl border border-gray-300/50 bg-white/50 px-4 py-3 text-sm transition-all duration-200 focus:border-main-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-main-400/20 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600/50 dark:bg-gray-700/50 dark:text-gray-100"
                            />
                        </div>

                        {/* City */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                                <MapPin className="h-4 w-4 text-main-500" />
                                City
                            </label>
                            <input
                                id="city"
                                type="text"
                                name="city"
                                defaultValue={user?.city || ""}
                                disabled={loading}
                                className="w-full rounded-xl border border-gray-300/50 bg-white/50 px-4 py-3 text-sm transition-all duration-200 focus:border-main-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-main-400/20 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600/50 dark:bg-gray-700/50 dark:text-gray-100"
                            />
                        </div>

                        {/* Email */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                                <Mail className="h-4 w-4 text-main-500" />
                                Email
                            </label>
                            <input
                                id="email"
                                type="email"
                                name="email"
                                defaultValue={user?.email || ""}
                                required
                                disabled={loading}
                                className="w-full rounded-xl border border-gray-300/50 bg-white/50 px-4 py-3 text-sm transition-all duration-200 focus:border-main-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-main-400/20 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600/50 dark:bg-gray-700/50 dark:text-gray-100"
                            />
                        </div>

                        {/* Phone */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                                <Phone className="h-4 w-4 text-main-500" />
                                Phone Number
                            </label>
                            <input
                                id="phone"
                                type="tel"
                                name="phoneNumber"
                                defaultValue={user?.phoneNumber || ""}
                                disabled={loading}
                                className="w-full rounded-xl border border-gray-300/50 bg-white/50 px-4 py-3 text-sm transition-all duration-200 focus:border-main-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-main-400/20 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600/50 dark:bg-gray-700/50 dark:text-gray-100"
                            />
                        </div>

                        {/* Worker-specific fields */}
                        {userType === "worker" && (
                            <>
                                {/* Hourly Rate */}
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                                        <DollarSign className="h-4 w-4 text-main-500" />
                                        Hourly Rate ($)
                                    </label>
                                    <input
                                        id="hourlyRate"
                                        type="number"
                                        name="hourlyRate"
                                        defaultValue={user?.hourlyRate || ""}
                                        disabled={loading}
                                        className="w-full rounded-xl border border-gray-300/50 bg-white/50 px-4 py-3 text-sm transition-all duration-200 focus:border-main-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-main-400/20 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600/50 dark:bg-gray-700/50 dark:text-gray-100"
                                    />
                                </div>

                                {/* Years of Experience */}
                                <div className="space-y-2">
                                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                                        <Clock className="h-4 w-4 text-main-500" />
                                        Years of Experience
                                    </label>
                                    <input
                                        id="yearsOfExperience"
                                        type="number"
                                        name="yearsOfExperience"
                                        defaultValue={
                                            user?.yearsOfExperience || ""
                                        }
                                        disabled={loading}
                                        className="w-full rounded-xl border border-gray-300/50 bg-white/50 px-4 py-3 text-sm transition-all duration-200 focus:border-main-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-main-400/20 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600/50 dark:bg-gray-700/50 dark:text-gray-100"
                                    />
                                </div>
                            </>
                        )}
                    </div>

                    {/* Bio - Full Width (Worker only) */}
                    {userType === "worker" && (
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                                <Edit3 className="h-4 w-4 text-main-500" />
                                Professional Bio
                            </label>
                            <textarea
                                id="bio"
                                name="bio"
                                rows={4}
                                placeholder="Tell us about your professional experience and expertise..."
                                defaultValue={user?.bio || ""}
                                disabled={loading}
                                className="w-full resize-none rounded-xl border border-gray-300/50 bg-white/50 px-4 py-3 text-sm transition-all duration-200 focus:border-main-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-main-500/20 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600/50 dark:bg-gray-700/50 dark:text-gray-100"
                            />
                        </div>
                    )}

                    {/* Profile Picture Upload */}
                    <div className="space-y-2">
                        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                            <Camera className="h-4 w-4 text-main-500" />
                            Profile Picture
                        </label>
                        <div className="relative">
                            <input
                                id="image"
                                type="file"
                                name="image"
                                accept="image/*"
                                disabled={loading}
                                className="w-full rounded-xl border border-gray-300/50 bg-white/50 px-4 py-3 text-sm transition-all duration-200 file:mr-4 file:rounded-lg file:border-0 file:bg-main-50 file:px-4 file:py-2 file:text-sm file:font-medium file:text-main-700 hover:file:bg-main-100 focus:border-main-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-main-500/20 disabled:cursor-not-allowed disabled:opacity-50 dark:border-gray-600/50 dark:bg-gray-700/50 dark:text-gray-100 dark:file:bg-main-900/30 dark:file:text-main-300"
                            />
                        </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex justify-end space-x-4 pt-4">
                        <Link
                            href="/worker-dashboard/profile"
                            className="group relative overflow-hidden rounded-xl border-2 border-gray-300 bg-white px-8 py-3 font-semibold text-gray-700 shadow-lg transition-all duration-300 hover:border-gray-400 hover:bg-gray-50 dark:border-gray-600 dark:bg-gray-800 dark:text-gray-200 dark:hover:border-gray-500 dark:hover:bg-gray-700"
                        >
                            <div className="relative flex items-center gap-2">
                                <ArrowLeft size={18} />
                                Cancel
                            </div>
                        </Link>
                        <button
                            type="submit"
                            disabled={loading}
                            className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-main-500 to-main-600 px-8 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-main-600 hover:to-main-700 hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-50 disabled:hover:scale-100"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                            <div className="relative flex items-center gap-2">
                                <Save size={18} />
                                {loading ? "Saving..." : "Save Changes"}
                            </div>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
