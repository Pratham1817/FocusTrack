const DashboardStat = ({ icon, pText, spanText }) => {
  return (
    <li className="flex h-32 w-full flex-col items-center justify-center gap-2 rounded bg-neutral-100 text-center text-accent-color shadow-md transition-colors ease-in hover:border-2 hover:border-accent-color lg:text-xl dark:bg-neutral-800 dark:shadow-neutral-300">
      {icon}
      <p className="text-black dark:text-white">
        {pText}
        <span>{spanText}</span>
      </p>
    </li>
  );
};

export default DashboardStat;
