import NoteDetailsHeaderBtns from "./NoteDetailsHeaderBtns";
import { useNotes } from "../../context/NotesContext";

const NoteDetailsHeader = () => {
  const { isEditing } = useNotes();

  return (
    <header className="flex w-full items-center justify-between gap-4">
      {!isEditing ? (
        <NoteDetailsHeaderBtns />
      ) : (
        <span className="text-accent-color">Editing note...</span>
      )}
    </header>
  );
};
export default NoteDetailsHeader;
