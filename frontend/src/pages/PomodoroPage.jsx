import Modal from "../components/common/Modal";
import NoteDetails from "../components/common/NoteDetails";
import PinnedNotesContainer from "../components/pomodoro/PinnedNotesContainer";
import Pomodoro from "../components/pomodoro/Pomodoro";
import { useNotes } from "../context/NotesContext";

const PomodoroPage = () => {
  const { noteModalOpen, handleNoteModal } = useNotes();

  return (
    <div className="mx-auto flex h-[95%] max-w-[90rem] flex-col items-center justify-start gap-2 p-4 sm:flex-row">
      <Pomodoro />
      <PinnedNotesContainer />
      
      {noteModalOpen && (
        <Modal
          onModalOpen={(e) => handleNoteModal(e)}
          headerText="Pinned note details:"
        >
          <NoteDetails />
        </Modal>
      )}
    </div>
  );
};

export default PomodoroPage;
