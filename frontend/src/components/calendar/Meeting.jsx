import { DeleteOutlined } from "@ant-design/icons";

import Button from "../common/Button";
import { useCalendar } from "../../context/CalendarContext";

const Meeting = ({ meeting }) => {
  const { handleToggleMeetingDetails, handleDeleteMeeting } = useCalendar();

  return (
    <li className="scrollbar-custom flex justify-center gap-2">
      <div
        tabIndex="0"
        onKeyDown={(e) => handleToggleMeetingDetails(e, meeting)}
        onClick={(e) => handleToggleMeetingDetails(e, meeting)}
        className="transition-bg-accent-color m-1 flex w-9/12 cursor-pointer items-center justify-between rounded-md border border-accent-color p-1 pl-2 text-sm text-black ease-out hover:bg-accent-color hover:text-white sm:w-11/12 lg:text-base dark:text-white"
      >
        <p className="overflow-hidden text-ellipsis whitespace-nowrap">
          {meeting.title}: {meeting.description}
        </p>
        {(meeting.startTime || meeting.endTime) && (
          <span className="whitespace-nowrap text-xs md:text-sm">
            {meeting.startTime || "--:--"} until {meeting.endTime || "--:--"}
          </span>
        )}
      </div>
      <Button
        onClick={() => handleDeleteMeeting(meeting._id)}
        className="hover:text-accent-color"
      >
        <DeleteOutlined />
      </Button>
    </li>
  );
};
export default Meeting;
