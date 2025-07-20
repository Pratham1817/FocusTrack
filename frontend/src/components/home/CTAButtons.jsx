import { ArrowRightOutlined, GithubOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const CTAButtons = () => {
  return (
    <div className="flex flex-col justify-center gap-4 sm:flex-row">
      <Link
        to="/account"
        className="flex items-center justify-center gap-2 rounded-lg border border-blue-600 bg-white px-8 py-4 text-lg font-semibold text-blue-600 shadow-lg transition-colors duration-200 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
        aria-describedby="cta-description"
      >
        Get Started Free
        <ArrowRightOutlined className="h-5 w-5" aria-hidden="true" />
      </Link>

      <a
        href="https://github.com/gneo0/TaskFlow-pro"
        target="_blank"
        className="flex items-center justify-center gap-2 rounded-lg border-2 border-white px-8 py-4 text-lg font-semibold transition-colors duration-200 hover:bg-white hover:text-blue-600 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-blue-600"
        aria-label="View live demo of TaskFlow Pro"
      >
        <GithubOutlined className="h-5 w-5" aria-hidden="true" />
        View on GitHub
      </a>
    </div>
  );
};

export default CTAButtons;
