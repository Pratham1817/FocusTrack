import {
  EditOutlined,
  DeleteOutlined,
  PushpinOutlined,
} from "@ant-design/icons";

import Button from "../common/Button";
import { useNotes } from "../../context/NotesContext";

const NoteDetailsHeaderBtns = () => {
  const {
    isEditing,
    isDeleting,
    selectedNote,
    handleDeleteNote,
    handleToggleEditNote,
    handlePinNote,
    handleUnpinNote,
  } = useNotes();

  return (
    <>
      <Button
        onClick={handleToggleEditNote}
        className={`hover:text-accent-color ${isEditing ? "text-accent-color" : ""}`}
      >
        <EditOutlined />
        <span className="mx-1">Edit</span>
      </Button>
      <Button
        onClick={() => handleDeleteNote()}
        className="hover:text-accent-color"
      >
        <DeleteOutlined />
        <span className="mx-1">{isDeleting ? "Deleting..." : "Delete"}</span>
      </Button>
      <Button
        onClick={() =>
          selectedNote.pinned
            ? handleUnpinNote(selectedNote._id)
            : handlePinNote()
        }
        className={`hover:text-accent-color ${selectedNote?.pinned ? "text-accent-color" : ""}`}
      >
        <PushpinOutlined />
        <span className="mx-1">{selectedNote?.pinned ? "Pinned" : "Pin"}</span>
      </Button>
    </>
  );
};

export default NoteDetailsHeaderBtns;
