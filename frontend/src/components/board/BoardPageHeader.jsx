import { useParams } from "react-router-dom";
import { DeleteOutlined } from "@ant-design/icons";

import Button from "../common/Button";
import { useBoards } from "../../context/BoardsContext";

const BoardPageHeader = () => {
  const { boardTitle } = useParams();
  const { handleDeleteBoard } = useBoards();

  return (
    <div className="flex items-center justify-center p-2">
      <h1 className="skew-x-[-10deg] overflow-hidden text-ellipsis whitespace-nowrap rounded-sm border-2 border-accent-color bg-accent-color px-4 text-white">
        {boardTitle}
      </h1>
      <span className="mr-3 skew-x-[-10deg] px-2 rounded-sm border-2 border-l-0 border-accent-color dark:bg-neutral-800 dark:text-white">
        board
      </span>

      <Button onClick={handleDeleteBoard} stylesType="boardHeader">
        <DeleteOutlined />
      </Button>
    </div>
  );
};

export default BoardPageHeader;
