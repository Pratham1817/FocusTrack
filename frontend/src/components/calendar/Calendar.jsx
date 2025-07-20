import CalendarEmptyCells from "./CalendarEmptyCells";
import CalendarMonthDays from "./CalendarMonthDays";
import CalendarWeekDays from "./CalendarWeekDays";

const Calendar = () => {
  return (
    <div className="mt-4 grid grid-cols-7 rounded border-l border-t text-center dark:border-neutral-800">
      <CalendarWeekDays />
      <CalendarEmptyCells />
      <CalendarMonthDays />
    </div>
  );
};
export default Calendar;
