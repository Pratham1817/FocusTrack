import CalendarDate from "./CalendarDate";
import CalendarHeaderBtns from "./CalendarHeaderBtns";
import MeetingsMonthCount from "./MeetingsMonthCount";

const CalendarHeader = () => {
  return (
    <>
      <div className="flex items-center justify-between">
        <CalendarDate />
        <CalendarHeaderBtns />
      </div>
      <MeetingsMonthCount />
    </>
  );
};
export default CalendarHeader;
