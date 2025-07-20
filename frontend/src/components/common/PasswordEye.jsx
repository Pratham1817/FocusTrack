import { EyeInvisibleOutlined, EyeOutlined } from "@ant-design/icons";
import { useAuth } from "../../context/AuthContext";

const PasswordEye = () => {
  const { handleTogglePassVisible, passVisible } = useAuth();

  return (
    <span
      tabIndex="0"
      onClick={handleTogglePassVisible}
      onKeyDown={handleTogglePassVisible}
      className="absolute right-3 top-[57%] dark:text-white cursor-pointer px-1 text-accent-color opacity-50 hover:opacity-100 focus:opacity-100"
    >
      {passVisible ? <EyeOutlined /> : <EyeInvisibleOutlined />}
    </span>
  );
};

export default PasswordEye;
