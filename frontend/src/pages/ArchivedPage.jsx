import Modal from "../components/common/Modal";
import NoteDetails from "../components/common/NoteDetails";
import PageHeaderTitle from "../components/common/PageHeaderTitle";
import List from "../components/common/List";
import ArchivedNote from "../components/archived/ArchivedNote";
import { useNotes } from "../context/NotesContext";

const ArchivedPage = () => {
  const { noteModalOpen, handleNoteModal, archivedNotes } = useNotes();

  return (
    <section className="mx-auto my-0 mt-6 flex h-[90%] max-w-7xl flex-col items-center gap-4 dark:text-white">
      <PageHeaderTitle headerText="Archived Notes" />
      <List
        items={archivedNotes}
        emptyListMsg="You don't have any archived notes yet!"
        emptyListStyles="text-center"
        listContainerStyles="w-[95%] overflow-y-auto px-4 md:w-2/3 scrollbar-custom"
        renderItem={(archivedNote) => (
          <ArchivedNote key={archivedNote._id} note={archivedNote} />
        )}
      />

      {noteModalOpen && (
        <Modal
          onModalOpen={(e) => handleNoteModal(e)}
          headerText="Archived note details:"
        >
          <NoteDetails />
        </Modal>
      )}
    </section>
  );
};

export default ArchivedPage;
