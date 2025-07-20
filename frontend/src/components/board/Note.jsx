import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";

import { useNotes } from "../../context/NotesContext";
import { FolderOpenOutlined } from "@ant-design/icons";

const Note = ({ note }) => {
  const { handleNoteModal, handleArchiveNote } = useNotes();

  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({
    id: note._id,
    data: {
      type: "Note",
    },
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    cursor: isDragging ? "grabbing" : "pointer",
    backgroundColor: isDragging ? "white" : "",
    opacity: isDragging ? 0.2 : 1,
  };

  // Hide note if it's on Completed column and marked as archived
  if (note.archived) return;

  return (
    <li
      ref={setNodeRef}
      {...listeners}
      {...attributes}
      style={style}
      onClick={(e) => handleNoteModal(e, note)}
      className="transition-bg-accent-color group z-50 mx-1 my-2 flex cursor-pointer touch-manipulation items-center justify-between rounded-md border-[1px] border-accent-color bg-neutral-100 p-1 shadow-md ease-out hover:bg-accent-color dark:bg-neutral-800/70"
    >
      <p className="ml-1 overflow-hidden text-ellipsis whitespace-nowrap text-sm text-black group-hover:text-white  lg:text-base dark:text-white">
        {note.title}: {note.description}
      </p>
      {note.columnTitle === "Completed" && (
        <span
          onClick={(e) => {
            e.stopPropagation();
            handleArchiveNote(note._id);
          }}
          className="pl-2 pr-1 text-accent-color group-hover:text-white dark:text-white"
        >
          <FolderOpenOutlined />
        </span>
      )}
    </li>
  );
};

export default Note;
