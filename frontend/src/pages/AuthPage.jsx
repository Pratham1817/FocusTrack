import { Toaster } from "react-hot-toast";

import AuthFormHeader from "../components/auth/AuthFormHeader";
import AuthFormsContainer from "../components/auth/AuthFormsContainer";

const AuthPage = () => {
  return (
    <section className="flex h-dvh w-dvw flex-col items-center justify-center dark:bg-neutral-800/70">
      <AuthFormHeader />
      <AuthFormsContainer />
      <Toaster position="bottom-left" />
    </section>
  );
};

export default AuthPage;
