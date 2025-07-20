import { ArrowRightOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

import HeroBenefitsList from "./HeroBenefitsList";
import HeroHeader from "./HeroHeader";

const HeroText = () => {
  return (
    <div className="w-full space-y-8 md:w-1/2 lg:w-2/3">
      <HeroHeader />
      <HeroBenefitsList />

      <Link
        to="/account"
        className="flex w-64 items-center justify-center gap-2 rounded-lg bg-blue-600 px-4 py-4 font-semibold text-white transition-colors duration-200 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        aria-describedby="cta-description"
      >
        Get Started Free
        <ArrowRightOutlined className="h-5 w-5" aria-hidden="true" />
      </Link>
      <p className="text-sm text-gray-500">
        No credit card required • Free forever plan available
      </p>
    </div>
  );
};

export default HeroText;
