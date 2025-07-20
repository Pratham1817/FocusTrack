const BoardColumn = ({ children }) => {
  return (
    <div className="flex h-4/5 w-full flex-col justify-between overflow-x-hidden rounded border-2 shadow-[2px_5px_8px_-1px] shadow-neutral-300 dark:shadow-neutral-400 md:h-full dark:border-neutral-800">
      {children}
    </div>
  );
};

export default BoardColumn;
