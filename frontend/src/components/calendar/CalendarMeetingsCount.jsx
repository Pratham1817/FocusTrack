import { useCalendar } from "../../context/CalendarContext";

const CalendarMeetingsCount = ({ count, index }) => {
  const { handleMeetingDetailsModalOpen } = useCalendar();

  return (
    <span
      tabIndex={0}
      onKeyDown={(e) => {
        e.stopPropagation();
        handleMeetingDetailsModalOpen(e, index + 1);
      }}
      onClick={(e) => {
        e.stopPropagation();
        handleMeetingDetailsModalOpen(e, index + 1);
      }}
      className="absolute bottom-0 right-0 flex h-2 w-2 items-center justify-center rounded-full border border-neutral-800 bg-accent-color p-2 text-xs text-white transition-colors ease-linear hover:bg-neutral-100 hover:text-black md:bottom-1 md:right-1 md:h-3 md:w-3 md:p-3 hover:dark:bg-neutral-800 hover:dark:text-white"
    >
      {count}
    </span>
  );
};
export default CalendarMeetingsCount;
