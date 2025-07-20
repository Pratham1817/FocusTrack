import {
  BarChartOutlined,
  CalendarOutlined,
  FieldTimeOutlined,
  FolderOpenOutlined,
  UserOutlined,
} from "@ant-design/icons";

import BoardsForm from "./BoardsForm";
import AddBoardNav from "./AddBoardNav";
import NavigationBtn from "./NavigationBtn";
import List from "../common/List";
import BoardTitle from "./BoardTitle";
import { useBoards } from "../../context/BoardsContext";

const Navbar = () => {
  const { addBoard, boards, isLoading } = useBoards();

  return (
    <nav className="fixed left-0 mt-10 h-full w-20 bg-neutral-100 transition-colors ease-linear lg:w-28 dark:bg-neutral-800">
      <ul className="flex flex-col items-center gap-1 px-1 text-sm lg:text-base">
        <NavigationBtn
          to="/home"
          navText="Dashboard"
          icon={<BarChartOutlined />}
        />

        <AddBoardNav />
        {addBoard && <BoardsForm />}
        <List
          items={boards}
          isLoading={isLoading}
          loadingStyles="h-20"
          listContainerStyles="w-full overflow-hidden px-2"
          renderItem={(board) => <BoardTitle key={board._id} board={board} />}
        />

        <NavigationBtn
          to="/home/calendar"
          navText="Calendar"
          icon={<CalendarOutlined />}
        />
        <NavigationBtn
          to="/home/pomo"
          navText="Pomodoro"
          icon={<FieldTimeOutlined />}
        />
        <NavigationBtn
          to="/home/archived"
          navText="Archived"
          icon={<FolderOpenOutlined />}
        />
        <NavigationBtn
          to="/home/account"
          navText="Account"
          icon={<UserOutlined />}
        />
      </ul>
    </nav>
  );
};
export default Navbar;
