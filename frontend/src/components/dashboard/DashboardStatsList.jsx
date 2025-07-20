import {
  BookOutlined,
  CalendarOutlined,
  FieldTimeOutlined,
} from "@ant-design/icons";

import DashboardStat from "./DashboardStat";

const DashboardStatsList = ({ notes, meetings, pomoCount }) => {
  return (
    <ul className="flex w-[90%] flex-col items-center gap-4 sm:flex-row  sm:justify-center">
      <DashboardStat
        icon={<BookOutlined />}
        pText="Total notes: "
        spanText={notes.length > 0 ? notes.length : "-"}
      />
      <DashboardStat
        icon={<CalendarOutlined />}
        pText="Total meetings: "
        spanText={meetings.length > 0 ? meetings.length : "-"}
      />
      <DashboardStat
        icon={<FieldTimeOutlined />}
        pText="Pomodoros completed: "
        spanText={pomoCount > 0 ? pomoCount : "-"}
      />
    </ul>
  );
};

export default DashboardStatsList;
