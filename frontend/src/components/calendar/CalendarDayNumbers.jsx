import clsx from "clsx";
import { useCalendar } from "../../context/CalendarContext";

const CalendarDayNumbers = ({ index }) => {
  const { currDayOfMonthAndYear } = useCalendar();

  return (
    <span
      className={clsx(
        "absolute left-0 top-0 flex h-4 w-4 items-center justify-center rounded-ee-sm border-b border-r bg-neutral-100 px-1 text-xs font-semibold md:h-7 md:w-7 md:text-base dark:bg-neutral-800 dark:text-white",
        {
          "border-accent-color": currDayOfMonthAndYear(index),
        },
      )}
    >
      {index + 1}
    </span>
  );
};
export default CalendarDayNumbers;
