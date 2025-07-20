import Button from "../common/Button";
import { useBoards } from "../../context/BoardsContext";

const BoardsFormActionBtns = () => {
  const { handleCancel } = useBoards();

  return (
    <div className="text-md mt-1 flex items-center justify-center text-white">
      <Button type="submit" stylesType="submit" className="p-1">
        &#10003;
      </Button>
      <Button onClick={handleCancel} stylesType="cancel" className="p-1">
        &#10005;
      </Button>
    </div>
  );
};

export default BoardsFormActionBtns;
