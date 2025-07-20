import { Link, useNavigate } from "react-router-dom";
import { PoweroffOutlined, UserOutlined } from "@ant-design/icons";

import Button from "../common/Button";
import { useAuth } from "../../context/AuthContext";

const SettingsActionBtns = () => {
  const navigate = useNavigate();
  const { handleLogout } = useAuth();
  
  return (
    <div className="absolute bottom-0 flex w-full flex-col items-start justify-start gap-2 p-2">
      <Link
        to="/home/account"
        className="group w-full rounded-sm border border-accent-color bg-neutral-100 py-1 text-center transition ease-out hover:bg-accent-color hover:text-white dark:bg-neutral-800/70"
      >
        <span className="mr-2 text-accent-color group-hover:text-white">
          <UserOutlined />
        </span>
        Edit Account
      </Link>

      <Button
        className="w-full rounded-sm bg-red-500 py-1 text-white"
        onClick={() => handleLogout(navigate)}
      >
        <span className="mr-2">
          <PoweroffOutlined />
        </span>
        Logout
      </Button>
    </div>
  );
};

export default SettingsActionBtns;
