import Logo from "../common/Logo";

const AuthFormHeader = () => {
  return (
    <div className="w-72 rounded rounded-b-none border-b border-b-accent-color bg-neutral-100/70 py-3 text-center sm:w-96 dark:bg-neutral-800/80">
      <Logo className="text-2xl tracking-normal sm:text-3xl md:text-4xl dark:text-white" />
    </div>
  );
};

export default AuthFormHeader;
