import { User } from "lucide-react";

function WorkerProfileHeader() {
    return (
        <div className="relative mb-6 overflow-hidden p-4 text-center">
            {/* Background decorative elements */}
            <div className="absolute inset-0 flex items-center justify-center opacity-5 dark:opacity-10">
                <User className="h-72 w-96 text-main-600" />
            </div>

            <div className="relative z-10">
                {/* Main Heading */}
                <h1 className="mb-4 bg-gradient-to-r from-gray-800 via-main-600 to-main-500 bg-clip-text text-3xl font-black text-transparent dark:from-white dark:via-main-400 dark:to-main-300 lg:text-5xl xl:text-6xl">
                    Professional
                    <span className="block bg-gradient-to-r from-main-500 to-main-600 bg-clip-text font-extrabold text-transparent">
                        Profile Hub
                    </span>
                </h1>

                {/* Subtitle */}
                <p className="mx-auto max-w-3xl text-base leading-relaxed text-gray-600 dark:text-gray-300 lg:text-lg">
                    Manage your professional information, showcase your
                    expertise, and maintain your profile to attract quality
                    clients.
                </p>
            </div>
        </div>
    );
}

export default WorkerProfileHeader;
