const PriorityTitle = ({ priority }) => {
  return (
    <h2 className="overflow-hidden py-2 text-center text-xs opacity-40 before:ml-[-55%] before:mr-4 before:inline-block before:w-1/2 before:border-b before:border-black/70 before:align-middle after:ml-4 after:mr-[-55%] after:inline-block after:w-1/2 after:border-b after:border-black/70 after:align-middle after:text-accent-color lg:text-sm dark:text-white dark:opacity-70 before:dark:border-white/40 after:dark:border-white/40">
      {priority} priority
    </h2>
  );
};

export default PriorityTitle;
