import { auth } from "@/auth";

async function HeaderWorkerDashboard() {
    const session = await auth();
    const user = session?.user;

    return (
        <div className="relative mb-8 mt-2 overflow-hidden rounded-2xl bg-gradient-to-r from-main-600 via-main-500 to-main-700 p-8 shadow-xl">
            <div className="absolute inset-0 bg-black/10"></div>
            <div className="relative z-10">
                <h1 className="mb-2 text-4xl font-extrabold text-white">
                    Welcome ,{user?.name || "User"}
                </h1>
                <p className="text-lg font-medium text-main-100">
                    Here&apos;s what&apos;s happening with your tasks today.
                </p>
            </div>
            {/* Decorative elements */}
            <div className="absolute right-0 top-0 h-40 w-40 rounded-full bg-white/10 blur-3xl"></div>
            <div className="absolute bottom-0 left-0 h-32 w-32 rounded-full bg-main-400/20 blur-2xl"></div>
        </div>
    );
}

export default HeaderWorkerDashboard;
