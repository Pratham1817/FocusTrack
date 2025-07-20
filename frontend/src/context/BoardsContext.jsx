import { createContext, useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { MAX_BOARDS_COUNT } from "../utils/constants";
import { useFetch } from "../hooks/useFetch";
import { useAuth } from "./AuthContext";
import { useThemeColors } from "./ThemeContext";
import { showToast } from "../utils/helpers";

const BoardsContext = createContext();

const BoardsProvider = ({ children }) => {
  const navigate = useNavigate();
  const { boardId } = useParams();

  const { isLight } = useThemeColors();
  const { userData } = useAuth();

  const {
    data: boards,
    setData: setBoards,
    isLoading,
  } = useFetch(
    `/api/boards/${userData?.id}`,
    !userData?.id,
  );

  const [boardTitle, setBoardTitle] = useState("");
  const [addBoard, setAddBoard] = useState(false);

  const boardsCount = boards.length;

  const handleBoardTitle = (e) => setBoardTitle(e.target.value);

  const handleAddBoard = () => {
    // Allowing only 5 boards to be created
    if (boardsCount >= 5)
      return showToast(
        `Only ${MAX_BOARDS_COUNT} boards are allowed!`,
        "error",
        isLight,
      );

    setAddBoard(true);
  };

  const handleSubmitBoard = async (e) => {
    e.preventDefault();
    if (!boardTitle)
      return showToast("Board title cannot be empty!", "error", isLight);

    if (!/^[a-zA-Z0-9 ]*$/.test(boardTitle)) {
      return showToast(
        "Only alphanumerical characters are allowed!",
        "error",
        isLight,
      );
    }

    try {
      const res = await fetch(
        `/api/boards/${userData?.id}`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ boardTitle }),
        },
      );

      if (!res.ok)
        throw new Error("Something went wrong with submitting a board!");
      const board = await res.json();
      setBoards((prevBoards) => [...prevBoards, board]);

      // Cleaning states
      setAddBoard(false);
      setBoardTitle("");

      // Redirect user to last submitted board
      navigate(`/home/board/${boardTitle}/${board.id}`);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleDeleteBoard = async () => {
    try {
      const res = await fetch(
        `/api/boards/board/${boardId}`,
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      if (!res.ok)
        throw new Error("Something went wrong with deleting a board");

      // Updating the array of boards, removing the deleted board with this id
      setBoards((prevBoards) =>
        prevBoards.filter((board) => board.id !== boardId),
      );

      showToast("Board deleted successfully!", "success", isLight);
      navigate("/home");
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleCancel = (e) => {
    e.preventDefault();
    setAddBoard(false);
    setBoardTitle("");
  };

  return (
    <BoardsContext.Provider
      value={{
        boards,
        boardTitle,
        isLoading,
        boardsCount,
        addBoard,
        setBoards,
        setAddBoard,
        setBoardTitle,
        handleAddBoard,
        handleDeleteBoard,
        handleBoardTitle,
        handleCancel,
        handleSubmitBoard,
      }}
    >
      {children}
    </BoardsContext.Provider>
  );
};

const useBoards = () => {
  const context = useContext(BoardsContext);

  if (context === undefined)
    throw new Error("Board's context must be used inside of BoardProvider");

  return context;
};

export { BoardsProvider, useBoards };
