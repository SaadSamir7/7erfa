import CustomerProfileHeader from "./_components/CustomerProfileHeader";
import CustomerCardDetails from "./_components/CustomerCardDetails";
import { auth } from "@/auth";
import { CustomerUser } from "@/types/user";

const ProfilePage = async () => {
    const session = await auth();
    const user = session?.user as CustomerUser;

    return (
        <div className="mb-8 space-y-6">
            <CustomerProfileHeader />
            <div className="group relative overflow-hidden rounded-2xl border border-gray-200/50 bg-gradient-to-br from-white to-gray-50/30 shadow-xl backdrop-blur-sm dark:border-gray-600/50 dark:from-gray-700/50 dark:to-gray-800/30">
                <div className="absolute inset-0 bg-gradient-to-br from-main-500/5 to-main-600/5 opacity-0 transition-opacity duration-300 group-hover:opacity-100"></div>

                <div className="relative z-10 p-8">
                    <CustomerCardDetails user={user} />
                </div>
            </div>
        </div>
    );
};

export default ProfilePage;
