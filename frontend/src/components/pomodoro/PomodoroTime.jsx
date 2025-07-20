import { usePomodoro } from "../../context/PomoContext";

const PomodoroTime = () => {
  const { minutes, seconds, isRunning } = usePomodoro();

  return (
    <h1 className="text-5xl sm:text-6xl md:text-7xl">
      {minutes}
      <span className={isRunning ? "animate-pulse" : ""}>:</span>
      <span className="inline-block text-accent-color">
        {seconds < 10 ? `0${seconds}` : seconds}
      </span>
    </h1>
  );
};
export default PomodoroTime;
