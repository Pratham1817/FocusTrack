import BoardsFormActionBtns from "./BoardsFormActionBtns";
import { useBoards } from "../../context/BoardsContext";

const BoardsForm = () => {
  const { handleBoardTitle, boardTitle, handleSubmitBoard } = useBoards();

  return (
    <form onSubmit={handleSubmitBoard}>
      <input
        autoFocus
        type="text"
        placeholder="Enter board name"
        value={boardTitle}
        onChange={handleBoardTitle}
        className="w-full rounded border-2 border-accent-color p-1 outline-none placeholder:text-xs placeholder:sm:text-base"
      />
      <BoardsFormActionBtns />
    </form>
  );
};
export default BoardsForm;
