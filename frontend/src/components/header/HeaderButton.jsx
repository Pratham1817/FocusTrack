import Button from "../common/Button";
import LoadingSpinner from "../common/LoadingSpinner";
import { useAuth } from "../../context/AuthContext";

const HeaderButton = ({ onSettingsOpen }) => {
  const { userData } = useAuth();

  return (
    <div className="mr-2 flex gap-3 text-accent-color dark:text-neutral-100">
      <Button
        onClick={onSettingsOpen}
        className="w-full rounded-md bg-accent-color px-2.5 py-0.5 text-white"
      >
        {userData?.username ? (
          userData.username[0].toUpperCase()
        ) : (
          <LoadingSpinner className="w-4" />
        )}
      </Button>
    </div>
  );
};

export default HeaderButton;
