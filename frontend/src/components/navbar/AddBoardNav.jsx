import { FolderAddOutlined } from "@ant-design/icons";

import { MAX_BOARDS_COUNT } from "../../utils/constants";
import { useBoards } from "../../context/BoardsContext";

const AddBoardNav = () => {
  const { boardsCount, handleAddBoard } = useBoards();

  return (
    <button
      onClick={handleAddBoard}
      className="ml-1 mt-2 cursor-pointer text-center focus:w-full dark:text-white"
    >
      <span className="block text-lg text-accent-color">
        <FolderAddOutlined />
      </span>
      Board
      <span className="ml-1">
        {boardsCount}/{MAX_BOARDS_COUNT}
      </span>
    </button>
  );
};
export default AddBoardNav;
