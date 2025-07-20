import SignUp from "../auth/SignUp";
import Login from "../auth/Login";
import ForgotPass from "../auth/ForgotPass";
import ResetPass from "../auth/ResetPass";
import { useAuth } from "../../context/AuthContext";

const AuthFormsContainer = () => {
  const { signupIsVisible, forgotPassIsVisible, newPassFormVisible } =
    useAuth();

  const renderAuthForm = () => {
    if (signupIsVisible) return <SignUp />;
    if (forgotPassIsVisible) return <ForgotPass />;
    if (newPassFormVisible) return <ResetPass />;
    return <Login />;
  };

  return (
    <div
      className={`flex ${signupIsVisible ? "h-[33rem]" : "h-[27rem]"} relative ${forgotPassIsVisible ? "h-[19rem]" : ""} w-72 flex-col justify-center gap-8 rounded bg-neutral-100 px-6 sm:w-96 dark:bg-neutral-800 dark:text-white`}
    >
      {renderAuthForm()}
    </div>
  );
};

export default AuthFormsContainer;
