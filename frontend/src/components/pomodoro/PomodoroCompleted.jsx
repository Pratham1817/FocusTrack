import PomodoroCompletedDots from "./PomodoroCompletedDots";

const PomodoroCompleted = () => {
  return (
    <div className="flex w-full flex-col items-center px-2">
      <p>Pomodoros completed:</p>
      <PomodoroCompletedDots />
    </div>
  );
};
export default PomodoroCompleted;
