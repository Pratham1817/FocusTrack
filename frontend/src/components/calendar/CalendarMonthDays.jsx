import clsx from "clsx";

import CalendarDayNumbers from "./CalendarDayNumbers";
import CalendarAddSpan from "./CalendarAddSpan";
import CalendarMeetingsCount from "./CalendarMeetingsCount";
import { useCalendar } from "../../context/CalendarContext";

const CalendarMonthDays = () => {
  const {
    handleMeetingModalOpen,
    daysInMonth,
    currDayOfMonthAndYear,
    dayMeetingsArr,
  } = useCalendar();

  return Array.from({ length: daysInMonth }, (_, i) => (
    <div
      key={i}
      tabIndex={0}
      onKeyDown={(e) => handleMeetingModalOpen(e, i + 1)}
      onClick={(e) => handleMeetingModalOpen(e, i + 1)}
      className={clsx(
        "group relative cursor-pointer border-b border-r py-4 transition-colors duration-75 ease-out hover:bg-accent-color md:py-11 dark:border-neutral-800",
        {
          "bg-neutral-100 text-accent-color hover:bg-neutral-100 dark:bg-neutral-800 hover:dark:bg-neutral-800":
            currDayOfMonthAndYear(i),
        },
      )}
    >
      <CalendarDayNumbers index={i} />
      <CalendarAddSpan />

      {dayMeetingsArr(i).length > 0 && (
        <CalendarMeetingsCount count={dayMeetingsArr(i).length} index={i} />
      )}
    </div>
  ));
};
export default CalendarMonthDays;
