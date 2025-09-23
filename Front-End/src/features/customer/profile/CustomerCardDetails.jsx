import { motion } from "framer-motion";
import { useUser } from "../../../components/auth/useUser";
import { Edit3, Mail, MapPin, Camera, X } from "lucide-react";
import { useState } from "react";
import ProfileForm from "../../profile/ProfileForm";
import CustomerCardDisplay from "./CustomerCardDisplay";
import FullPageLoader from "../../../ui/FullPageLoader";

const VITE_API_URL = import.meta.env.VITE_API_URL;

function CustomerCardDetails() {
  const { user, isPending: userPending } = useUser();
  const [isEditing, setIsEditing] = useState(false);

  if (userPending) {
    return <FullPageLoader />;
  }

  return (
    <>
      <div className="mb-8 flex flex-col items-center gap-6 lg:flex-row">
        <div className="relative group">
          <div className="absolute inset-0 bg-gradient-to-r from-main-400 to-main-500 rounded-full opacity-75 blur-lg group-hover:opacity-100 transition-opacity duration-300"></div>
          <div className="relative bg-gradient-to-r from-main-500 to-main-600 p-1 rounded-full">
            <img
              src={
                user?.image && user?.image !== "default.png"
                  ? `${VITE_API_URL}/uploads/${user?.image}?t=${user?.imageUpdatedAt || Date.now()}`
                  : "/default.png"
              }
              alt="Profile"
              className="h-32 w-32 rounded-full bg-white p-1 object-cover"
            />
          </div>
          {isEditing && (
            <div className="absolute -bottom-2 -right-2 bg-gradient-to-r from-main-500 to-main-600 rounded-full p-2 shadow-lg">
              <Camera className="h-4 w-4 text-white" />
            </div>
          )}
        </div>

        <div className="flex flex-col items-center lg:items-start lg:flex-1">
          <div className="flex items-center gap-4 mb-2 w-full lg:justify-between">
            <h2 className="text-2xl lg:text-3xl font-bold bg-gradient-to-r from-gray-800 to-main-600 bg-clip-text text-transparent dark:from-white dark:to-main-400 capitalize">
              {user?.name}
            </h2>

            {/* Edit Button */}
            <motion.button
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              onClick={() => setIsEditing(!isEditing)}
              className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-main-500 to-main-600 px-4 py-2 font-semibold text-white shadow-lg transition-all duration-300 hover:from-main-600 hover:to-main-700 hover:shadow-xl text-sm"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-white/20 to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>
              <div className="relative flex items-center gap-2">
                {isEditing ? (
                  <>
                    <X size={16} />
                    Cancel
                  </>
                ) : (
                  <>
                    <Edit3 size={16} />
                    Edit
                  </>
                )}
              </div>
            </motion.button>
          </div>
          <div className="flex items-center gap-2 text-gray-600 dark:text-gray-300 mb-4">
            <Mail className="h-4 w-4" />
            <span>{user?.email}</span>
          </div>
          <div className="flex flex-wrap gap-3">
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-main-50 to-main-100 dark:from-main-900/30 dark:to-main-800/30 px-4 py-2 rounded-full border border-main-200 dark:border-main-700">
              <div className="h-2 w-2 bg-main-500 rounded-full"></div>
              <span className="text-sm font-semibold text-main-700 dark:text-main-300">
                Customer
              </span>
            </div>
            <div className="inline-flex items-center gap-2 bg-gradient-to-r from-green-50 to-emerald-50 dark:from-green-900/30 dark:to-emerald-900/30 px-4 py-2 rounded-full border border-green-200 dark:border-green-700">
              <MapPin className="h-3 w-3 text-green-600 dark:text-green-400" />
              <span className="text-sm font-semibold text-green-700 dark:text-green-300">
                {user?.city}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div>
        {isEditing ? (
          <ProfileForm
            userType="customer"
            onEditComplete={() => setIsEditing(false)}
          />
        ) : (
          <CustomerCardDisplay />
        )}
      </div>
    </>
  );
}

export default CustomerCardDetails;
