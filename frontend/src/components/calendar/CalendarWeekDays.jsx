import { DAYS } from "../../utils/constants";

const CalendarWeekDays = () => {
  return DAYS.map((day) => (
    <div
      key={day}
      className="border-b border-r dark:border-neutral-800 dark:text-white py-2 sm:py-1"
    >
      <p className="sm:hidden">{day.charAt(0)}</p>
      <p className="hidden sm:block">{day}</p>
    </div>
  ));
};
export default CalendarWeekDays;
