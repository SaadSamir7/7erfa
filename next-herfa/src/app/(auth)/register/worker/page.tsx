"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
    Mail,
    Lock,
    Eye,
    EyeOff,
    Phone,
    MapPin,
    User,
    Briefcase,
    Clock,
    DollarSign,
    FileText,
    Camera,
    Upload,
    X,
} from "lucide-react";
import Link from "next/link";

export default function WorkerSignupForm() {
    const [showPassword, setShowPassword] = useState(false);
    const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
    const [profileImage, setProfileImage] = useState<File | null>(null);
    const [profileImagePreview, setProfileImagePreview] = useState<
        string | null
    >(null);

    const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (file) {
            // Validate file type
            if (!file.type.startsWith("image/")) {
                alert("Please select a valid image file");
                return;
            }

            // Validate file size (2MB limit)
            if (file.size > 2 * 1024 * 1024) {
                alert("Image size should be less than 2MB");
                return;
            }

            setProfileImage(file);

            // Create preview
            const reader = new FileReader();
            reader.onload = (e) => {
                setProfileImagePreview(e.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const removeImage = () => {
        setProfileImage(null);
        setProfileImagePreview(null);
        const fileInput = document.getElementById(
            "profileImage"
        ) as HTMLInputElement;
        if (fileInput) fileInput.value = "";
    };

    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const formData = new FormData(e.currentTarget);

        // Add profile image if selected
        if (profileImage) {
            formData.append("photo", profileImage);
        }

        // Add role
        formData.append("role", "worker");

        // Convert FormData to object for console display
        const formObject = Object.fromEntries(formData.entries());
        console.log("Worker Registration Form Data:", formObject);
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="mb-10 w-full max-w-2xl"
        >
            <div className="rounded-xl bg-gradient-to-r from-main-50/50 to-main-100/50 p-1 dark:from-main-900/20 dark:to-main-800/20">
                <form
                    onSubmit={handleSubmit}
                    className="space-y-6 rounded-lg border border-white/20 bg-white p-8 shadow-xl backdrop-blur-sm dark:bg-gray-800"
                >
                    {/* Header */}
                    <div className="space-y-4 text-center">
                        <h3 className="bg-gradient-to-r from-gray-800 via-main-600 to-main-700 bg-clip-text text-4xl font-extrabold text-transparent dark:from-white dark:via-main-300 dark:to-main-400">
                            Worker Registration
                        </h3>
                        <p className="font-medium text-gray-600 dark:text-gray-300">
                            Create your worker account to join{" "}
                            <span className="font-semibold text-main-600 dark:text-main-400">
                                7erfa
                            </span>
                        </p>
                    </div>

                    <div className="space-y-6">
                        {/* Name Field */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                                <User className="h-4 w-4 text-main-500" />
                                Full Name
                            </label>
                            <input
                                name="name"
                                type="text"
                                placeholder="Enter your full name"
                                className="w-full rounded-xl border border-gray-300/50 bg-white/50 px-4 py-3 text-sm transition-all duration-200 placeholder:text-gray-400 focus:border-main-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-main-400/20 dark:border-gray-600/50 dark:bg-gray-700/50 dark:text-gray-100 dark:placeholder:text-gray-500"
                                required
                            />
                        </div>

                        {/* Email Field */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                                <Mail className="h-4 w-4 text-main-500" />
                                Email Address
                            </label>
                            <input
                                name="email"
                                type="email"
                                placeholder="Enter your email"
                                className="w-full rounded-xl border border-gray-300/50 bg-white/50 px-4 py-3 text-sm transition-all duration-200 placeholder:text-gray-400 focus:border-main-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-main-400/20 dark:border-gray-600/50 dark:bg-gray-700/50 dark:text-gray-100 dark:placeholder:text-gray-500"
                                required
                            />
                        </div>

                        {/* Password Fields */}
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                                    <Lock className="h-4 w-4 text-main-500" />
                                    Password
                                </label>
                                <div className="relative">
                                    <input
                                        name="password"
                                        type={
                                            showPassword ? "text" : "password"
                                        }
                                        placeholder="Enter password"
                                        className="w-full rounded-xl border border-gray-300/50 bg-white/50 px-4 py-3 pr-12 text-sm transition-all duration-200 placeholder:text-gray-400 focus:border-main-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-main-400/20 dark:border-gray-600/50 dark:bg-gray-700/50 dark:text-gray-100 dark:placeholder:text-gray-500"
                                        required
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
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                                    <Lock className="h-4 w-4 text-main-500" />
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <input
                                        name="passwordConfirm"
                                        type={
                                            showPasswordConfirm
                                                ? "text"
                                                : "password"
                                        }
                                        placeholder="Confirm password"
                                        className="w-full rounded-xl border border-gray-300/50 bg-white/50 px-4 py-3 pr-12 text-sm transition-all duration-200 placeholder:text-gray-400 focus:border-main-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-main-400/20 dark:border-gray-600/50 dark:bg-gray-700/50 dark:text-gray-100 dark:placeholder:text-gray-500"
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() =>
                                            setShowPasswordConfirm(
                                                !showPasswordConfirm
                                            )
                                        }
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-colors hover:text-gray-600 dark:hover:text-gray-300"
                                    >
                                        {showPasswordConfirm ? (
                                            <EyeOff size={18} />
                                        ) : (
                                            <Eye size={18} />
                                        )}
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Phone Number Field */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                                <Phone className="h-4 w-4 text-main-500" />
                                Phone Number
                            </label>
                            <input
                                name="phoneNumber"
                                type="tel"
                                placeholder="Enter your phone number"
                                className="w-full rounded-xl border border-gray-300/50 bg-white/50 px-4 py-3 text-sm transition-all duration-200 placeholder:text-gray-400 focus:border-main-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-main-400/20 dark:border-gray-600/50 dark:bg-gray-700/50 dark:text-gray-100 dark:placeholder:text-gray-500"
                                required
                            />
                        </div>

                        {/* City Field */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                                <MapPin className="h-4 w-4 text-main-500" />
                                City
                            </label>
                            <input
                                name="city"
                                type="text"
                                placeholder="Enter your city"
                                className="w-full rounded-xl border border-gray-300/50 bg-white/50 px-4 py-3 text-sm transition-all duration-200 placeholder:text-gray-400 focus:border-main-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-main-400/20 dark:border-gray-600/50 dark:bg-gray-700/50 dark:text-gray-100 dark:placeholder:text-gray-500"
                                required
                            />
                        </div>

                        {/* Profile Image Field */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                                <Camera className="h-4 w-4 text-main-500" />
                                Profile Photo (Optional)
                            </label>

                            {!profileImagePreview ? (
                                <div className="relative">
                                    <input
                                        id="profileImage"
                                        name="profileImage"
                                        type="file"
                                        accept="image/*"
                                        onChange={handleImageChange}
                                        className="hidden"
                                    />
                                    <label
                                        htmlFor="profileImage"
                                        className="flex cursor-pointer flex-col items-center justify-center rounded-xl border-2 border-dashed border-gray-300 bg-gray-50 py-8 transition-all duration-200 hover:border-main-400 hover:bg-main-50/50 dark:border-gray-600 dark:bg-gray-700/30 dark:hover:border-main-500 dark:hover:bg-main-900/20"
                                    >
                                        <Upload className="mb-2 h-8 w-8 text-gray-400 dark:text-gray-500" />
                                        <span className="text-sm font-medium text-gray-600 dark:text-gray-300">
                                            Click to upload photo
                                        </span>
                                        <span className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                                            PNG, JPG up to 2MB
                                        </span>
                                    </label>
                                </div>
                            ) : (
                                <div className="relative">
                                    <img
                                        src={profileImagePreview}
                                        alt="Profile preview"
                                        className="mx-auto h-40 w-40 rounded-xl border-2 border-main-200 object-cover dark:border-main-700"
                                    />
                                    <button
                                        type="button"
                                        onClick={removeImage}
                                        className="absolute -right-2 -top-2 rounded-full bg-red-500 p-1.5 text-white shadow-lg transition-all duration-200 hover:scale-110 hover:bg-red-600"
                                    >
                                        <X className="h-4 w-4" />
                                    </button>
                                </div>
                            )}
                        </div>

                        {/* Skill Selection */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                                <Briefcase className="h-4 w-4 text-main-500" />
                                Skill
                            </label>
                            <select
                                name="skill"
                                className="w-full rounded-xl border border-gray-300/50 bg-white/50 px-4 py-3 text-sm transition-all duration-200 focus:border-main-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-main-400/20 dark:border-gray-600/50 dark:bg-gray-700/50 dark:text-gray-100"
                                required
                                defaultValue=""
                            >
                                <option value="" disabled>
                                    Select your skill
                                </option>
                                <option value="Electrical">Electrical</option>
                                <option value="Mechanical">Mechanical</option>
                                <option value="Carpentry">Carpentry</option>
                                <option value="Painting">Painting</option>
                                <option value="Plumber">Plumber</option>
                                <option value="Worker">
                                    Construction Worker
                                </option>
                            </select>
                        </div>

                        {/* Experience and Rate */}
                        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                                    <Clock className="h-4 w-4 text-main-500" />
                                    Years of Experience
                                </label>
                                <input
                                    name="yearsOfExperience"
                                    type="number"
                                    min="0"
                                    placeholder="Years of experience"
                                    className="w-full rounded-xl border border-gray-300/50 bg-white/50 px-4 py-3 text-sm transition-all duration-200 placeholder:text-gray-400 focus:border-main-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-main-400/20 dark:border-gray-600/50 dark:bg-gray-700/50 dark:text-gray-100 dark:placeholder:text-gray-500"
                                    required
                                />
                            </div>
                            <div className="space-y-2">
                                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                                    <DollarSign className="h-4 w-4 text-main-500" />
                                    Hourly Rate (EGP)
                                </label>
                                <input
                                    name="hourlyRate"
                                    type="number"
                                    min="0"
                                    placeholder="Hourly rate"
                                    className="w-full rounded-xl border border-gray-300/50 bg-white/50 px-4 py-3 text-sm transition-all duration-200 placeholder:text-gray-400 focus:border-main-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-main-400/20 dark:border-gray-600/50 dark:bg-gray-700/50 dark:text-gray-100 dark:placeholder:text-gray-500"
                                    required
                                />
                            </div>
                        </div>

                        {/* Bio */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                                <FileText className="h-4 w-4 text-main-500" />
                                Bio
                            </label>
                            <textarea
                                name="bio"
                                rows={4}
                                placeholder="Write a brief bio about yourself and your experience"
                                className="w-full resize-none rounded-xl border border-gray-300/50 bg-white/50 px-4 py-3 text-sm transition-all duration-200 placeholder:text-gray-400 focus:border-main-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-main-400/20 dark:border-gray-600/50 dark:bg-gray-700/50 dark:text-gray-100 dark:placeholder:text-gray-500"
                                required
                            />
                        </div>

                        {/* Submit Button */}
                        <button
                            type="submit"
                            className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-main-500 to-main-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:scale-105 hover:from-main-600 hover:to-main-700 hover:shadow-xl"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
                            <div className="relative">
                                Create Worker Account
                            </div>
                        </button>

                        {/* Login Link */}
                        <div className="border-t border-gray-200 pt-4 text-center dark:border-gray-700">
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
                </form>
            </div>
        </motion.div>
    );
}
