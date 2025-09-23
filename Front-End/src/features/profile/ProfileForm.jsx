import { Form } from "react-router-dom";
import { motion } from "framer-motion";
import { useForm } from "react-hook-form";
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
} from "lucide-react";

import { useUser } from "../../components/auth/useUser";
import useUpdateCustomerData from "../../components/Customer/useUpdateCustomerData";

const ProfileForm = ({ userType = "worker", onEditComplete }) => {
  const { user } = useUser();
  const { updateCustomer, isUpdating } = useUpdateCustomerData();
  const { register, handleSubmit } = useForm();

  function onSubmit(data) {
    const formData = { ...data };
    if (data.image && data.image.length > 0) {
      formData.image = data.image[0];
    } else {
      delete formData.image;
    }

    updateCustomer(formData, {
      onSuccess: () => {
        onEditComplete();
      },
    });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="mt-8"
    >
      <div className="bg-gradient-to-r from-main-50/50 to-main-100/50 dark:from-main-900/20 dark:to-main-800/20 rounded-xl p-1">
        <Form
          method="patch"
          className="bg-white dark:bg-gray-800 rounded-lg p-6 space-y-6"
          encType="multipart/form-data"
          onSubmit={handleSubmit(onSubmit)}
        >
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
                {...register("name")}
                defaultValue={user?.name || ""}
                className="w-full rounded-xl border border-gray-300/50 bg-white/50 py-3 px-4 text-sm transition-all duration-200 focus:border-main-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-main-400/20 dark:border-gray-600/50 dark:bg-gray-700/50 dark:text-gray-100"
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
                {...register("city")}
                className="w-full rounded-xl border border-gray-300/50 bg-white/50 py-3 px-4 text-sm transition-all duration-200 focus:border-main-400 focus:bg-white focus:outline-none focus:ring-2 focus:ring-main-400/20 dark:border-gray-600/50 dark:bg-gray-700/50 dark:text-gray-100"
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
                {...register("email")}
                className={`w-full rounded-xl border py-3 px-4 text-sm transition-all duration-200 focus:outline-none focus:ring-2 dark:text-gray-100 `}
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
                {...register("phoneNumber")}
                defaultValue={user?.phoneNumber || ""}
                className={`w-full rounded-xl border py-3 px-4 text-sm transition-all duration-200 focus:outline-none focus:ring-2 dark:text-gray-100 `}
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
                    className={`w-full rounded-xl border py-3 px-4 text-sm transition-all duration-200 focus:outline-none focus:ring-2 dark:text-gray-100 `}
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
                    defaultValue={user?.yearsOfExperience || ""}
                    className={`w-full rounded-xl border py-3 px-4 text-sm transition-all duration-200 focus:outline-none focus:ring-2 dark:text-gray-100 `}
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
                rows="4"
                placeholder="Tell us about your professional experience and expertise..."
                defaultValue={user?.bio || ""}
                className="w-full rounded-xl border border-gray-300/50 bg-white/50 py-3 px-4 text-sm transition-all duration-200 focus:border-main-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-main-500/20 dark:border-gray-600/50 dark:bg-gray-700/50 dark:text-gray-100 resize-none"
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
                {...register("image")}
                className="w-full rounded-xl border border-gray-300/50 bg-white/50 py-3 px-4 text-sm transition-all duration-200 focus:border-main-500 focus:bg-white focus:outline-none focus:ring-2 focus:ring-main-500/20 dark:border-gray-600/50 dark:bg-gray-700/50 dark:text-gray-100 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-medium file:bg-main-50 file:text-main-700 hover:file:bg-main-100 dark:file:bg-main-900/30 dark:file:text-main-300"
              />
            </div>
          </div>

          {/* General Error Message */}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-4 pt-4">
            <button
              type="submit"
              disabled={isUpdating}
              className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-main-500 to-main-600 px-8 py-3 font-semibold text-white shadow-lg transition-all duration-300 hover:from-main-600 hover:to-main-700 hover:shadow-xl hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              <div className="relative flex items-center gap-2">
                <Save size={18} />
                {isUpdating ? "Updating..." : "Save Changes"}
              </div>
            </button>
          </div>
        </Form>
      </div>
    </motion.div>
  );
};

export default ProfileForm;
