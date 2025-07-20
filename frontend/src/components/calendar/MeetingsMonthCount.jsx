import { useCalendar } from "../../context/CalendarContext";

const MeetingsMonthCount = () => {
  const { meetingsOfMonth } = useCalendar();

  return (
    <span className="text-xs dark:text-white">
      Meetings of current month: {meetingsOfMonth}
    </span>
  );
};

export default MeetingsMonthCount;
