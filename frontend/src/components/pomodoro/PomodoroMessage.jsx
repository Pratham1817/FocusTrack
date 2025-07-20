import { usePomodoro } from "../../context/PomoContext";

const PomodoroMessage = () => {
  const { isFocus } = usePomodoro();

  return (
    <span className="text-xs opacity-70 sm:text-base">
      {isFocus
        ? "Focus mode on! Press 'Start' to focus."
        : "Take a short break!"}
    </span>
  );
};
export default PomodoroMessage;
