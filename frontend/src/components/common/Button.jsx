import { twMerge } from "tailwind-merge";

const Button = ({
  type = "button",
  stylesType,
  className,
  children,
  ...props
}) => {
  const variants = {
    submit: "w-1/2 rounded p-1 bg-green-500 sm:p-2",
    cancel: "w-1/2 rounded p-1 bg-red-500 sm:p-2",
    pomo: "rounded shadow-lg bg-white dark:bg-neutral-800 dark:shadow-neutral-600 hover:bg-accent-color hover:text-white transition ease-out border-2 border-accent-color px-4 py-1 md:px-6 md:py-2",
    pomoReset:
      "absolute right-2 top-2 rounded bg-accent-color px-4 py-1 text-white sm:right-3 sm:top-3 sm:text-lg",
    boardHeader: "hover:text-accent-color dark:text-white",
    account: "rounded-sm mt-6 w-full bg-accent-color p-2 text-white",
    calendar:
      "rounded-md bg-neutral-100 px-3 hover:bg-accent-color border border-accent-color transition-colors ease-out dark:bg-neutral-800 dark:text-white hover:text-white sm:text-lg",
    saveEdit:
      "rounded border-[1px] border-black/40 px-2 py-0.5 font-semibold hover:border-accent-color hover:text-accent-color focus:text-accent-color focus:outline-accent-color dark:border-white/40",
    cancelEdit: "focus: ml-2 px-2 py-0.5",
    editAccDetails:
      "mt-4 max-w-xl rounded bg-accent-color py-2 text-sm text-white sm:text-base mx-auto my-0 w-full mt-6",
    forgotPass: "text-sm text-accent-color underline",
    goBack: "absolute left-4 top-4 hover:text-accent-color",
    error: "rounded border px-6 py-2 text-base hover:border-2",
    unpin:
      "rounded-e-md border-l-2 bg-neutral-400 hover:bg-accent-color transition-colors ease-out dark:bg-neutral-700 border-neutral-500 px-2 py-[0.3rem] text-white dark:border-neutral-100/50",
  };

  return (
    <button
      {...props}
      type={type}
      className={twMerge(variants[stylesType], className)}
    >
      {children}
    </button>
  );
};
export default Button;
