import { RetweetOutlined } from "@ant-design/icons";

import PomodoroTime from "./PomodoroTime";
import PomodoroCompleted from "./PomodoroCompleted";
import PomodoroBtns from "./PomodoroBtns";
import PomodoroMessage from "./PomodoroMessage";
import Button from "../common/Button";
import { usePomodoro } from "../../context/PomoContext";

const Pomodoro = () => {
  const { handleReset } = usePomodoro();

  return (
    <div className="relative flex h-full w-full flex-col items-center justify-evenly rounded-md bg-neutral-100 text-black sm:w-2/3 dark:bg-neutral-800 dark:text-white">
      <PomodoroTime />
      <div className="flex flex-col items-center gap-2">
        <PomodoroMessage />
        <PomodoroBtns />
      </div>

      <PomodoroCompleted />

      <Button onClick={handleReset} stylesType="pomoReset">
        <RetweetOutlined />
      </Button>
    </div>
  );
};

export default Pomodoro;
