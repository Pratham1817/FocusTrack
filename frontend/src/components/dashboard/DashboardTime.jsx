import { useTime } from "../../hooks/useTime";

const DashboardTime = () => {
  const { time } = useTime();

  return (
    <p className="sm:text-5xl">
      {time.hour}:{time.minutes < 10 ? `0${time.minutes}` : time.minutes}:
      <span className="text-accent-color">
        {time.seconds < 10 ? `0${time.seconds}` : time.seconds}
      </span>
    </p>
  );
};

export default DashboardTime;
