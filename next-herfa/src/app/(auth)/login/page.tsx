import AuthHeader from "./_components/AuthHeader";
import LoginForm from "./_components/LoginForm";

export default function LoginPage() {
    return (
        <div className="flex min-h-screen w-full flex-col items-center gap-20 bg-gradient-to-br from-orange-50 via-amber-50/30 to-main-50/40 dark:from-gray-900 dark:via-gray-800 dark:to-main-900/20 lg:gap-40">
            <AuthHeader />
            <LoginForm />
        </div>
    );
}
