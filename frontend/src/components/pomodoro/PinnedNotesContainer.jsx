import List from "../common/List";
import PinnedNotesHeader from "./PinnedNotesHeader";
import PinnedNote from "./PinnedNote";
import { useNotes } from "../../context/NotesContext";

const PinnedNotesContainer = () => {
  const { pinnedNotes } = useNotes();

  return (
    <div className="h-[60%] w-full overflow-y-hidden rounded-md border border-accent-color bg-neutral-100 p-4 sm:h-full sm:w-1/3 dark:border-2 dark:bg-neutral-800 dark:text-white">
      <PinnedNotesHeader />
      <List
        items={pinnedNotes}
        emptyListMsg="You don't have pinned any notes yet!"
        emptyListStyles="text-center mt-2 opacity-70"
        listContainerStyles="h-[84%] sm:h-[95%] mt-2 w-full overflow-y-auto scrollbar-custom"
        renderItem={(pinnedNote) => (
          <PinnedNote key={pinnedNote._id} pinnedNote={pinnedNote} />
        )}
      />
    </div>
  );
};

export default PinnedNotesContainer;
