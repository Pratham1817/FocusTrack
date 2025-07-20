import DashboardGreetingTitle from "./DashboardGreetingTitle";
import DashboardTime from "./DashboardTime";

const DashboardHeader = () => {
  return (
    <div className="flex w-full items-end justify-around rounded-sm bg-neutral-100 py-2 shadow sm:h-[4rem] dark:bg-neutral-800 dark:shadow-neutral-300">
      <DashboardGreetingTitle />
      <DashboardTime />
    </div>
  );
};

export default DashboardHeader;
