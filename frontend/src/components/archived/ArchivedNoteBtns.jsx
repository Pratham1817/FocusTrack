import { DeleteOutlined, RollbackOutlined } from "@ant-design/icons";

import Button from "../common/Button";
import { useNotes } from "../../context/NotesContext";

const ArchivedNoteBtns = ({ note }) => {
  const { handleUnarchiveNote, handleDeleteNote } = useNotes();

  return (
    <>
      <Button
        className="cursor-pointer font-extrabold hover:text-accent-color dark:text-white"
        onClick={() => handleUnarchiveNote(note._id)}
      >
        <RollbackOutlined />
      </Button>
      <Button
        className="ml-1 cursor-pointer hover:text-accent-color dark:text-white"
        onClick={() => handleDeleteNote(note._id)}
      >
        <DeleteOutlined />
      </Button>
    </>
  );
};

export default ArchivedNoteBtns;
