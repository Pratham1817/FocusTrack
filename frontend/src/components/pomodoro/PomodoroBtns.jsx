import Button from "../common/Button";
import { usePomodoro } from "../../context/PomoContext";

const PomodoroBtns = () => {
  const { handleStartTimer, handleStopTimer } = usePomodoro();

  return (
    <div className="mt-1 flex gap-4">
      <Button onClick={handleStartTimer} stylesType="pomo">
        Start
      </Button>
      <Button onClick={handleStopTimer} stylesType="pomo">
        Pause
      </Button>
    </div>
  );
};
export default PomodoroBtns;
