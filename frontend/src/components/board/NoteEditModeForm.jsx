import FormInput from "../common/FormInput";
import NoteEditModeActionBtns from "./NoteEditModeActionBtns";
import { useNotes } from "../../context/NotesContext";

const NoteEditModeForm = () => {
  const { noteForm, handleNoteForm, handleUpdateNote } = useNotes();

  return (
    <form onSubmit={handleUpdateNote} className="flex w-full flex-col gap-4">
      <FormInput
        id="title"
        type="textarea"
        autoFocus
        value={noteForm.title}
        onChange={handleNoteForm}
        labelText="Title:"
        inputStyles="h-[4rem] w-full resize-none px-2 py-1 font-normal focus:outline-accent-color dark:text-black"
      />

      <FormInput
        id="description"
        type="textarea"
        value={noteForm.description}
        onChange={handleNoteForm}
        labelText="Description:"
        inputStyles="h-full w-full resize-none px-2 py-1 font-normal focus:outline-accent-color dark:text-black"
      />
      <NoteEditModeActionBtns />
    </form>
  );
};

export default NoteEditModeForm;
