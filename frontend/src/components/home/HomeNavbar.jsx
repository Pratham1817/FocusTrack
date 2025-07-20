import { UserOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const HomeNavbar = () => {
  return (
    <nav className="flex h-12 w-full items-center justify-between border-b px-4 sm:px-6 lg:px-8 py-4">
      <Link to="/" className="font-semibold lg:text-lg text-gray-800">
        TaskFlow Pro
      </Link>

      <Link to="/account" className="text-gray-700 text-sm lg:text-md hover:text-blue-600">
        <span><UserOutlined /></span> My Account
      </Link>
    </nav>
  );
};

export default HomeNavbar;
