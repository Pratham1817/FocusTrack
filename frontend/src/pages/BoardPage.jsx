import { DndContext, rectIntersection } from "@dnd-kit/core";

import BoardPageHeader from "../components/board/BoardPageHeader";
import Modal from "../components/common/Modal";
import AddNewNoteForm from "../components/board/AddNewNoteForm";
import NoteDetails from "../components/common/NoteDetails";
import NoteDetailsHeader from "../components/board/NoteDetailsHeader";
import BoardColumnContainer from "../components/board/BoardColumnContainer";
import DraggingNote from "../components/board/DraggingNote";
import { useNotes } from "../context/NotesContext";

const BoardPage = () => {
  const {
    sensors,
    handleDragEnd,
    addNoteModalOpen,
    handleAddNoteModal,
    selectedCol,
    noteModalOpen,
    handleNoteModal,
  } = useNotes();

  return (
    <>
      <BoardPageHeader />
      <DndContext
        sensors={sensors}
        onDragEnd={handleDragEnd}
        collisionDetection={rectIntersection}
      >
        <BoardColumnContainer />
        <DraggingNote />
      </DndContext>

      {addNoteModalOpen && (
        <Modal
          onModalOpen={() => handleAddNoteModal()}
          headerText="Add note on: "
          headerSpan={`"${selectedCol}"`}
        >
          <AddNewNoteForm />
        </Modal>
      )}

      {noteModalOpen && (
        <Modal
          onModalOpen={(e) => handleNoteModal(e)}
          headerText={<NoteDetailsHeader />}
        >
          <NoteDetails />
        </Modal>
      )}
    </>
  );
};

export default BoardPage;
