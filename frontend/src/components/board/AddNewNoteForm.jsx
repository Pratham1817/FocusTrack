import Button from "../common/Button";
import FormInput from "../common/FormInput";
import LoadingSpinner from "../common/LoadingSpinner";
import { useNotes } from "../../context/NotesContext";

const AddNewNoteForm = () => {
  const {
    isSubmitting,
    newNoteForm,
    handleNewNoteForm,
    handleAddNewNote,
    handleAddNoteModal,
  } = useNotes();

  return (
    <form
      onSubmit={handleAddNewNote}
      className="mt-6 flex h-full w-full flex-col justify-start gap-1 dark:text-white"
    >
      <FormInput
        autoFocus
        id="title"
        labelText="Title:"
        inputStyles="focus:outline-accent-color"
        value={newNoteForm.title}
        onChange={handleNewNoteForm}
      />
      <FormInput
        id="description"
        type="textarea"
        labelText="Description:"
        inputStyles="focus:outline-accent-color"
        value={newNoteForm.description}
        onChange={handleNewNoteForm}
      />
      <FormInput
        id="priority"
        type="select"
        labelText="Priority:"
        inputStyles="focus:outline-accent-color"
        optionsArr={["low", "medium", "high"]}
        value={newNoteForm.priority}
        onChange={handleNewNoteForm}
      />
      <div className="mt-3 flex w-full gap-1 text-white">
        <Button type="submit" stylesType="submit">
          {isSubmitting ? <LoadingSpinner /> : "Submit"}
        </Button>
        <Button onClick={() => handleAddNoteModal()} stylesType="cancel">
          Cancel
        </Button>
      </div>
    </form>
  );
};

export default AddNewNoteForm;
