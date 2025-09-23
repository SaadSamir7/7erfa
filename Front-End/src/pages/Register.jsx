import AuthHeader from "../ui/AuthHeader";
import SignupForm from "../components/auth/SignupForm";

const Register = () => {
  return (
    <div className="flex  min-h-screen w-full flex-col items-center gap-20 bg-gradient-to-br from-orange-50 via-amber-50/30 to-main-50/40 dark:from-gray-900 dark:via-gray-800 dark:to-main-900/20 lg:gap-12">
      <AuthHeader />
      <SignupForm />
    </div>
  );
};

export default Register;
