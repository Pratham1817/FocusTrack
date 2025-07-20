import { usePomodoro } from "../../context/PomoContext";

const PomodoroCompletedDots = () => {
  const { pomoCount } = usePomodoro();

  if (!pomoCount) return <span>-</span>;

  return (
    <div className="flex flex-wrap justify-center gap-2">
      {Array.from({ length: pomoCount }, (_, i) => (
        <span
          key={i}
          className="h-2 w-2 rounded-full border-[3px] border-accent-color bg-white p-1"
        ></span>
      ))}
    </div>
  );
};
export default PomodoroCompletedDots;
