import { MONTHS } from "../../utils/constants";
import { useCalendar } from "../../context/CalendarContext";

const CalendarDate = () => {
  const { currMonth, currYear } = useCalendar();

  return (
    <h1 className="decoration text-xl underline underline-offset-2 decoration-accent-color sm:text-2xl dark:text-white">
      {MONTHS[currMonth]}, {currYear}
    </h1>
  );
};
export default CalendarDate;
