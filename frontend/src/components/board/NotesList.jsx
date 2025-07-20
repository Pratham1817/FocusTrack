import { useDroppable } from "@dnd-kit/core";

import Note from "./Note";
import LoadingSkeleton from "../common/LoadingSkeleton";
import { useNotes } from "../../context/NotesContext";

const NotesList = ({ priority, title, filteredNotes }) => {
  const { notesIsLoading } = useNotes();
  const { setNodeRef, isOver } = useDroppable({
    id: `${priority} ${title}`,
    data: { type: "Column" },
  });

  if (notesIsLoading) return <LoadingSkeleton />;

  return (
    <ul
      ref={setNodeRef}
      className={`scrollbar-custom h-full overflow-y-auto overflow-x-hidden px-6 py-4 text-white md:px-4 ${isOver ? "bg-accent-color opacity-50" : ""}`}
    >
      {filteredNotes.map((note) => (
        <Note key={note._id} note={note} />
      ))}
    </ul>
  );
};

export default NotesList;
