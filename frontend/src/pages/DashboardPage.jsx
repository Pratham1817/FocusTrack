import DashboardWelcomeMsg from "../components/dashboard/DashboardWelcomeMsg";
import DashboardStatsList from "../components/dashboard/DashboardStatsList";
import DashboardAreaChart from "../components/dashboard/DashboardAreaChart";
import DashboardBarChart from "../components/dashboard/DashboardBarChart";
import DashboardHeader from "../components/dashboard/DashboardHeader";
import { useFetch } from "../hooks/useFetch";

const DashboardPage = () => {
  const { data: notes } = useFetch("/api/notes");
  const { data: meetings } = useFetch("/api/meetings");
  const pomoCount = localStorage.getItem("pomoCount");

  return (
    <section className="mx-auto my-0 flex h-[90%] max-w-7xl flex-col items-center justify-around gap-4 px-4 pt-4 dark:text-white">
      <DashboardHeader />
      <DashboardWelcomeMsg />
      <DashboardStatsList
        notes={notes}
        meetings={meetings}
        pomoCount={pomoCount}
      />
      <div className="mt-4 flex h-1/2 w-full flex-col items-center gap-12 md:flex-row md:items-start md:justify-center md:gap-0">
        <DashboardBarChart notes={notes} />
        <DashboardAreaChart meetings={meetings} />
      </div>
    </section>
  );
};

export default DashboardPage;
