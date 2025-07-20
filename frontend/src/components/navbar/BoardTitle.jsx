import { NavLink } from "react-router-dom";

const BoardTitle = ({ board }) => {
  return (
    <NavLink
      to={`/home/board/${board.boardTitle}/${board._id}`}
      className={({ isActive }) =>
        isActive
          ? "overflow-hidden text-ellipsis whitespace-nowrap block text-accent-color"
          : "block cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap dark:text-white "
      }
    >
      {board.boardTitle}
    </NavLink>
  );
};
export default BoardTitle;
