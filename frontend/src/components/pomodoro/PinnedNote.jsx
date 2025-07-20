import Button from "../common/Button";
import { useNotes } from "../../context/NotesContext";

const PinnedNote = ({ pinnedNote }) => {
  const { handleUnpinNote, handleNoteModal } = useNotes();

  return (
    <li className="mt-2 flex w-full items-center justify-between">
      <div
        tabIndex="0"
        onKeyDown={(e) => handleNoteModal(e, pinnedNote)}
        onClick={(e) => handleNoteModal(e, pinnedNote)}
        className="transition-bg-accent-color w-full cursor-pointer overflow-hidden text-ellipsis whitespace-nowrap rounded-s-md border border-r-0 border-accent-color bg-neutral-100 p-1 pl-2 text-sm text-black ease-out hover:bg-accent-color hover:text-white lg:text-base dark:bg-neutral-800/70 dark:text-white"
      >
        {pinnedNote.title} : {pinnedNote.description}
      </div>
      <Button
        onClick={() => handleUnpinNote(pinnedNote._id)}
        stylesType="unpin"
      >
        Unpin
      </Button>
    </li>
  );
};

export default PinnedNote;
