import { ArrowLeftOutlined } from "@ant-design/icons";

import Button from "../common/Button";
import MeetingDetails from "./MeetingDetails";
import { useCalendar } from "../../context/CalendarContext";

const MeetingDetailsContainer = () => {
  const { handleToggleMeetingDetails } = useCalendar();

  return (
    <div className="scrollbar-custom mt-8 h-[90%] w-full overflow-y-auto pr-2">
      <MeetingDetails />
      <div className="absolute right-9 top-3 text-sm sm:right-11 sm:top-2 sm:text-base">
        <Button
          onClick={(e) => handleToggleMeetingDetails(e)}
          stylesType="saveEdit"
        >
          <ArrowLeftOutlined />
        </Button>
      </div>
    </div>
  );
};

export default MeetingDetailsContainer;
