import NoteViewMode from "../board/NoteViewMode";
import NoteEditModeForm from "../board/NoteEditModeForm";
import { useNotes } from "../../context/NotesContext";

const NoteDetails = () => {
  const { isEditing } = useNotes();

  return (
    <div className="scrollbar-custom mt-8 h-[90%] w-full overflow-y-auto pr-2">
      {!isEditing ? <NoteViewMode /> : <NoteEditModeForm />}
    </div>
  );
};

export default NoteDetails;
