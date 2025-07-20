import { useCalendar } from "../../context/CalendarContext";

const CalendarEmptyCells = () => {
  const { firstDayOfMonth } = useCalendar();

  return Array.from({ length: firstDayOfMonth }).map((_, i) => (
    <div
      key={`empty-cell-${i}`}
      className="border-b border-r dark:border-neutral-800"
    />
  ));
};
export default CalendarEmptyCells;
