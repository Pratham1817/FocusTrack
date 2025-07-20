import Button from "../common/Button";
import { useNotes } from "../../context/NotesContext";

const NoteEditModeActionBtns = () => {
  const { handleToggleEditNote, isSubmitting } = useNotes();

  return (
    <div className="absolute bottom-4 right-6">
      <Button type="submit" stylesType="saveEdit">
        {isSubmitting ? "Saving" : "Save"}
      </Button>
      <Button onClick={handleToggleEditNote} stylesType="cancelEdit">
        Cancel
      </Button>
    </div>
  );
};
export default NoteEditModeActionBtns;
