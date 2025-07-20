import { useNotes } from "../../context/NotesContext";

const NoteViewMode = () => {
  const { selectedNote } = useNotes();

  return (
    <>
      <p className="break-words font-semibold">
        Title:&nbsp;
        <span className="font-normal">{selectedNote?.title}</span>
      </p>
      <p className="mt-1 break-words font-semibold">
        Description:&nbsp;
        <span className="font-normal">{selectedNote?.description}</span>
      </p>
    </>
  );
};
export default NoteViewMode;
