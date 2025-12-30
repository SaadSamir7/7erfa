import { auth } from "@/auth";
import { WorkerUser } from "@/types/user";
import ProfileForm from "../_components/ProfileForm";

export default async function EditProfilePage() {
    const session = await auth();
    const user = session?.user as WorkerUser;

    return (
        <div className="mb-8 space-y-6">
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
                        Edit Profile
                    </h1>
                    <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
                        Update your profile information
                    </p>
                </div>
            </div>

            <div className="group relative overflow-hidden rounded-2xl border border-gray-200/50 bg-gradient-to-br from-white to-gray-50/30 shadow-xl backdrop-blur-sm dark:border-gray-600/50 dark:from-gray-700/50 dark:to-gray-800/30">
                <div className="absolute inset-0 bg-gradient-to-br from-main-500/5 to-main-600/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

                <div className="relative z-10 p-8">
                    <ProfileForm user={user} userType="worker" />
                </div>
            </div>
        </div>
    );
}
