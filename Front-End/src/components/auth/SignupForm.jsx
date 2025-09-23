import { useForm } from "react-hook-form";
import { useSignupCustomer } from "./useSignupCustomer";
import { useSignupWorker } from "./useSignupWorker";
import { useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import toast from "react-hot-toast";
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
  UserPlus,
  Camera,
  Upload,
  X,
} from "lucide-react";

import {
  isValidEmail,
  isValidPassword,
  isValidPhoneNumber,
} from "../../utils/helper";

function SignupForm() {
  const { signupCustomer, customerIsPending } = useSignupCustomer();
  const { signupWorker, workerIsPending } = useSignupWorker();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const [role, setRole] = useState("worker");
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [profileImagePreview, setProfileImagePreview] = useState(null);

  const handleRoleChange = (event) => {
    setRole(event.target.value);
  };

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      // Validate file type
      if (!file.type.startsWith("image/")) {
        toast.error("Please select a valid image file");
        return;
      }

      // Validate file size (2MB limit)
      if (file.size > 2 * 1024 * 1024) {
        toast.error("Image size should be less than 2MB");
        return;
      }

      setProfileImage(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileImagePreview(e.target.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setProfileImage(null);
    setProfileImagePreview(null);
    // Reset the file input
    const fileInput = document.getElementById("profileImage");
    if (fileInput) fileInput.value = "";
  };

  const onSubmit = (data) => {
    // Create FormData to handle file upload
    const formData = new FormData();

    // Append all form fields
    Object.keys(data).forEach((key) => {
      formData.append(key, data[key]);
    });

    // Append role
    formData.append("role", role);

    // Append profile image if selected
    if (profileImage) {
      formData.append("photo", profileImage);
    }

    if (role === "customer") {
      signupCustomer(formData);
    } else if (role === "worker") {
      signupWorker(formData);
    }
  };

  const isLoading = customerIsPending || workerIsPending;
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="w-full max-w-2xl mb-10"
    >
      <div className="bg-gradient-to-r from-main-50/50 to-main-100/50 dark:from-main-900/20 dark:to-main-800/20 rounded-xl p-1">
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white dark:bg-gray-800 rounded-lg p-8 space-y-6 shadow-xl backdrop-blur-sm border border-white/20"
          aria-label="Registration Form"
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
                      <UserPlus className="h-8 w-8 text-white" />
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
                {role === "worker" ? "Worker" : "Customer"} Registration
              </motion.h3>

              {/* Subtitle */}
              <motion.p
                initial={{ y: 20, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                transition={{ delay: 0.4, duration: 0.5 }}
                className="text-gray-600 dark:text-gray-300 font-medium"
              >
                Create your account to join{" "}
                <span className="text-main-600 dark:text-main-400 font-semibold">
                  7erfa
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
          {/* Role Selection */}
          <div className="space-y-4">
            <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
              <User className="h-4 w-4 text-main-500" />I want to register as
            </label>
            <div className="grid grid-cols-2 gap-4">
              <label className="relative cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="worker"
                  checked={role === "worker"}
                  onChange={handleRoleChange}
                  className="peer sr-only"
                />
                <div className="group flex items-center justify-center gap-2 rounded-xl border-2 border-gray-200 bg-white/50 py-4 px-6 transition-all duration-200 peer-checked:border-main-500 peer-checked:bg-main-50 hover:border-main-300 dark:border-gray-600 dark:bg-gray-700/50 dark:peer-checked:border-main-400 dark:peer-checked:bg-main-900/20">
                  <Briefcase className="h-5 w-5 text-gray-500 transition-colors peer-checked:text-main-600 group-hover:text-main-500 dark:text-gray-400 dark:peer-checked:text-main-400" />
                  <span className="font-medium text-gray-700 transition-colors peer-checked:text-main-700 dark:text-gray-300 dark:peer-checked:text-main-300">
                    Worker
                  </span>
                </div>
              </label>
              <label className="relative cursor-pointer">
                <input
                  type="radio"
                  name="role"
                  value="customer"
                  checked={role === "customer"}
                  onChange={handleRoleChange}
                  className="peer sr-only"
                />
                <div className="group flex items-center justify-center gap-2 rounded-xl border-2 border-gray-200 bg-white/50 py-4 px-6 transition-all duration-200 peer-checked:border-main-500 peer-checked:bg-main-50 hover:border-main-300 dark:border-gray-600 dark:bg-gray-700/50 dark:peer-checked:border-main-400 dark:peer-checked:bg-main-900/20">
                  <User className="h-5 w-5 text-gray-500 transition-colors peer-checked:text-main-600 group-hover:text-main-500 dark:text-gray-400 dark:peer-checked:text-main-400" />
                  <span className="font-medium text-gray-700 transition-colors peer-checked:text-main-700 dark:text-gray-300 dark:peer-checked:text-main-300">
                    Customer
                  </span>
                </div>
              </label>
            </div>
          </div>

          <div className="space-y-6">
            {/* Name Field */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                <User className="h-4 w-4 text-main-500" />
                Full Name
              </label>
              <input
                id="name"
                name="name"
                type="text"
                placeholder="Enter your full name"
                className={`w-full rounded-xl border bg-white/50 py-3 px-4 text-sm transition-all duration-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-main-400/20 dark:bg-gray-700/50 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 ${
                  errors.name
                    ? "border-red-400 focus:border-red-400 focus:ring-red-400/20"
                    : "border-gray-300/50 focus:border-main-400 dark:border-gray-600/50"
                }`}
                {...register("name", { required: "Name is required" })}
                required
              />
              {errors?.name && (
                <p className="text-sm text-red-500">{errors.name}</p>
              )}
            </div>

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
                placeholder="Enter your email"
                {...register("email", {
                  required: "Email is required",
                  validate: (value) =>
                    isValidEmail(value) || "Please enter a valid email",
                })}
                className={`w-full rounded-xl border bg-white/50 py-3 px-4 text-sm transition-all duration-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-main-400/20 dark:bg-gray-700/50 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 ${
                  errors.email
                    ? "border-red-400 focus:border-red-400 focus:ring-red-400/20"
                    : "border-gray-300/50 focus:border-main-400 dark:border-gray-600/50"
                }`}
                required
              />
              {errors?.email && (
                <p className="text-sm text-red-500 flex items-center gap-1">
                  {errors.email.message}
                </p>
              )}
            </div>

            {/* Password Fields */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                    {...register("password", {
                      required: "Password is required",
                      validate: (value) =>
                        isValidPassword(value) ||
                        "Password must be at least 8 characters, include uppercase, lowercase, number, and special character",
                    })}
                    placeholder="Enter password"
                    className={`w-full rounded-xl border bg-white/50 py-3 px-4 pr-12 text-sm transition-all duration-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-main-400/20 dark:bg-gray-700/50 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 ${
                      errors.password
                        ? "border-red-400 focus:border-red-400 focus:ring-red-400/20"
                        : "border-gray-300/50 focus:border-main-400 dark:border-gray-600/50"
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
                {errors?.password && (
                  <p className="text-sm text-red-500">{errors.password}</p>
                )}
              </div>
              <div className="space-y-2">
                <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                  <Lock className="h-4 w-4 text-main-500" />
                  Confirm Password
                </label>
                <div className="relative">
                  <input
                    id="passwordConfirm"
                    name="passwordConfirm"
                    {...register("passwordConfirm", {
                      required: "Confirm Password is required",
                      validate: (value) =>
                        value === watch("password") || "Passwords do not match",
                    })}
                    type={showPasswordConfirm ? "text" : "password"}
                    placeholder="Confirm password"
                    className={`w-full rounded-xl border bg-white/50 py-3 px-4 pr-12 text-sm transition-all duration-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-main-400/20 dark:bg-gray-700/50 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 ${
                      errors.passwordConfirm
                        ? "border-red-400 focus:border-red-400 focus:ring-red-400/20"
                        : "border-gray-300/50 focus:border-main-400 dark:border-gray-600/50"
                    }`}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPasswordConfirm(!showPasswordConfirm)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                  >
                    {showPasswordConfirm ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
                {errors?.passwordConfirm && (
                  <p className="text-sm text-red-500">
                    {errors.passwordConfirm}
                  </p>
                )}
              </div>
            </div>

            {/* Phone Number Field */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                <Phone className="h-4 w-4 text-main-500" />
                Phone Number
              </label>
              <input
                id="phoneNumber"
                name="phoneNumber"
                type="tel"
                {...register("phoneNumber", {
                  required: "Phone number is required",
                  validate: (value) =>
                    isValidPhoneNumber(value) ||
                    "Please enter a valid phone number",
                })}
                placeholder="Enter your phone number"
                className={`w-full rounded-xl border bg-white/50 py-3 px-4 text-sm transition-all duration-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-main-400/20 dark:bg-gray-700/50 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 ${
                  errors.phoneNumber
                    ? "border-red-400 focus:border-red-400 focus:ring-red-400/20"
                    : "border-gray-300/50 focus:border-main-400 dark:border-gray-600/50"
                }`}
                required
              />
              {errors?.phoneNumber && (
                <p className="text-sm text-red-500">{errors.phoneNumber}</p>
              )}
            </div>

            {/* City Field */}
            <div className="space-y-2">
              <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                <MapPin className="h-4 w-4 text-main-500" />
                City
              </label>
              <input
                id="city"
                name="city"
                type="text"
                {...register("city", { required: "City is required" })}
                placeholder="Enter your city"
                className={`w-full rounded-xl border bg-white/50 py-3 px-4 text-sm transition-all duration-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-main-400/20 dark:bg-gray-700/50 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 ${
                  errors.city
                    ? "border-red-400 focus:border-red-400 focus:ring-red-400/20"
                    : "border-gray-300/50 focus:border-main-400 dark:border-gray-600/50"
                }`}
                required
              />
              {errors?.city && (
                <p className="text-sm text-red-500">{errors.city}</p>
              )}
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
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 bg-white/50 rounded-xl cursor-pointer hover:border-main-400 hover:bg-main-50/30 transition-all duration-200 dark:border-gray-600 dark:bg-gray-700/50 dark:hover:border-main-400 dark:hover:bg-main-900/20"
                  >
                    <Upload className="h-8 w-8 text-gray-400 mb-2" />
                    <span className="text-sm text-gray-600 dark:text-gray-300 font-medium">
                      Click to upload profile photo
                    </span>
                    <span className="text-xs text-gray-400 mt-1">
                      PNG, JPG up to 2MB
                    </span>
                  </label>
                </div>
              ) : (
                <div className="relative">
                  <div className="flex items-center gap-4 p-4 border border-gray-300 bg-white/50 rounded-xl dark:border-gray-600 dark:bg-gray-700/50">
                    <img
                      src={profileImagePreview}
                      alt="Profile preview"
                      className="h-16 w-16 rounded-full object-cover border-2 border-main-200"
                    />
                    <div className="flex-1">
                      <p className="text-sm font-medium text-gray-700 dark:text-gray-200">
                        Profile photo selected
                      </p>
                      <p className="text-xs text-gray-500 dark:text-gray-400">
                        Ready to upload
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={removeImage}
                      className="p-1 rounded-full hover:bg-red-100 dark:hover:bg-red-900/20 transition-colors"
                      title="Remove image"
                    >
                      <X className="h-4 w-4 text-red-500" />
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Worker-specific fields */}
            {role === "worker" && (
              <>
                {/* Skill Selection */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                    <Briefcase className="h-4 w-4 text-main-500" />
                    Skill
                  </label>
                  <select
                    id="skill"
                    name="skill"
                    className={`w-full rounded-xl border bg-white/50 py-3 px-4 text-sm transition-all duration-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-main-400/20 dark:bg-gray-700/50 dark:text-gray-100 ${
                      errors.skill
                        ? "border-red-400 focus:border-red-400 focus:ring-red-400/20"
                        : "border-gray-300/50 focus:border-main-400 dark:border-gray-600/50"
                    }`}
                    required
                    defaultValue=""
                    {...register("skill", { required: "Skill is required" })}
                  >
                    <option value="" disabled className="text-gray-400">
                      Select your skill
                    </option>
                    <option value="Electrical">Electrical</option>
                    <option value="Mechanical">Mechanical</option>
                    <option value="Carpentry">Carpentry</option>
                    <option value="Painting">Painting</option>
                    <option value="Plumber">Plumber</option>
                    <option value="Worker">Construction Worker</option>
                  </select>
                  {errors?.skill && (
                    <p className="text-sm text-red-500">{errors.skill}</p>
                  )}
                </div>

                {/* Experience and Rate */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                      <Clock className="h-4 w-4 text-main-500" />
                      Years of Experience
                    </label>
                    <input
                      id="yearsOfExperience"
                      name="yearsOfExperience"
                      type="number"
                      min="0"
                      {...register("yearsOfExperience", {
                        required: "Years of experience is required",
                      })}
                      placeholder="Years of experience"
                      className={`w-full rounded-xl border bg-white/50 py-3 px-4 text-sm transition-all duration-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-main-400/20 dark:bg-gray-700/50 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 ${
                        errors.yearsOfExperience
                          ? "border-red-400 focus:border-red-400 focus:ring-red-400/20"
                          : "border-gray-300/50 focus:border-main-400 dark:border-gray-600/50"
                      }`}
                      required
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                      <DollarSign className="h-4 w-4 text-main-500" />
                      Hourly Rate (EGP)
                    </label>
                    <input
                      id="hourlyRate"
                      name="hourlyRate"
                      type="number"
                      min="0"
                      {...register("hourlyRate", {
                        required: "Hourly rate is required",
                      })}
                      placeholder="Hourly rate"
                      className={`w-full rounded-xl border bg-white/50 py-3 px-4 text-sm transition-all duration-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-main-400/20 dark:bg-gray-700/50 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 ${
                        errors.hourlyRate
                          ? "border-red-400 focus:border-red-400 focus:ring-red-400/20"
                          : "border-gray-300/50 focus:border-main-400 dark:border-gray-600/50"
                      }`}
                      required
                    />
                  </div>
                </div>
                {errors?.yearsOfExperience && (
                  <p className="text-sm text-red-500">
                    {errors.yearsOfExperience}
                  </p>
                )}
                {errors?.hourlyRate && (
                  <p className="text-sm text-red-500">{errors.hourlyRate}</p>
                )}

                {/* Bio */}
                <div className="space-y-2">
                  <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 dark:text-gray-200">
                    <FileText className="h-4 w-4 text-main-500" />
                    Bio
                  </label>
                  <textarea
                    id="bio"
                    name="bio"
                    rows="4"
                    {...register("bio", { required: "Bio is required" })}
                    placeholder="Write a brief bio about yourself and your experience"
                    className={`w-full rounded-xl border bg-white/50 py-3 px-4 text-sm transition-all duration-200 focus:bg-white focus:outline-none focus:ring-2 focus:ring-main-400/20 dark:bg-gray-700/50 dark:text-gray-100 placeholder:text-gray-400 dark:placeholder:text-gray-500 resize-none ${
                      errors.bio
                        ? "border-red-400 focus:border-red-400 focus:ring-red-400/20"
                        : "border-gray-300/50 focus:border-main-400 dark:border-gray-600/50"
                    }`}
                    required
                  />
                  {errors?.bio && (
                    <p className="text-sm text-red-500">{errors.bio}</p>
                  )}
                </div>
              </>
            )}

            {/* General Error */}
            {errors?.general && (
              <div className="bg-red-50 border border-red-200 text-red-600 px-4 py-3 rounded-xl text-sm dark:bg-red-900/20 dark:border-red-800 dark:text-red-400">
                {errors.general}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              disabled={isLoading}
              className="group relative w-full overflow-hidden rounded-xl bg-gradient-to-r from-main-500 to-main-600 px-6 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:from-main-600 hover:to-main-700 hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
              aria-label="Create Account"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              <div className="relative">
                {isLoading ? "Creating Account..." : "Create Account"}
              </div>
            </button>

            {/* Login Link */}
            <div className="text-center pt-4 border-t border-gray-200 dark:border-gray-700">
              <p className="text-gray-600 dark:text-gray-300">
                Already have an account?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-main-600 hover:text-main-700 dark:text-main-400 dark:hover:text-main-300 transition-colors"
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

export default SignupForm;
