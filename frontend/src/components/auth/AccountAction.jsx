import { useAuth } from "../../context/AuthContext";

const AccountAction = ({ pText, spanText }) => {
  const { handleCreateAcc } = useAuth();

  return (
    <p className="text-center text-sm">
      {pText}
      <button
        tabIndex="0"
        onClick={handleCreateAcc}
        className="cursor-pointer text-accent-color underline"
      >
        {spanText}
      </button>
    </p>
  );
};

export default AccountAction;
