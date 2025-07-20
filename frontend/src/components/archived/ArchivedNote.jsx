import ArchivedNoteBtns from "./ArchivedNoteBtns";
import { useNotes } from "../../context/NotesContext";

const ArchivedNote = ({ note }) => {
  const { handleNoteModal } = useNotes();

  return (
    <li className="flex items-center justify-between gap-2">
      <div
        tabIndex="0"
        onKeyDown={(e) => handleNoteModal(e, note)}
        onClick={(e) => handleNoteModal(e, note)}
        className="transition-bg-accent-color my-1 w-full cursor-pointer touch-manipulation overflow-hidden text-ellipsis whitespace-nowrap rounded-md border-[1px] border-accent-color bg-neutral-100 px-2 py-1 text-sm shadow-md ease-out hover:bg-accent-color hover:text-white lg:text-base dark:bg-neutral-800/70 dark:text-white"
      >
        {note.title}: {note.description}
      </div>
      <ArchivedNoteBtns note={note} />
    </li>
  );
};

export default ArchivedNote;
