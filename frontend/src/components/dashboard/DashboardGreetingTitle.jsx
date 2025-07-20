import { useAuth } from "../../context/AuthContext";

const DashboardGreetingTitle = () => {
  const { userData } = useAuth();

  return (
    <p className="w-[60%] overflow-hidden text-ellipsis whitespace-nowrap sm:text-lg">
      Hello,&nbsp;
      <span className="font-normal text-accent-color sm:self-start sm:text-2xl">
        {userData?.username || "-"}
      </span>
    </p>
  );
};

export default DashboardGreetingTitle;
