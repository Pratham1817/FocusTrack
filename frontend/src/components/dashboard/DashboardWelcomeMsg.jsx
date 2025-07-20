import PageHeaderTitle from "../common/PageHeaderTitle";

const DashboardWelcomeMsg = () => {
  return (
    <div className="text-center">
      <PageHeaderTitle headerText="Dashboard" />
      <p className="text-sm">
        Welcome to your productivity dashboard. Here you can track your notes,
        review meeting summaries, and monitor your Pomodoro sessions. Stay on
        top of your tasks with detailed analytics and insights.
      </p>
    </div>
  );
};

export default DashboardWelcomeMsg;
