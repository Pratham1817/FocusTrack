import { useMemo } from "react";
import {
  SortableContext,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";

import PriorityTitle from "./PriorityTitle";
import NotesList from "./NotesList";
import { filterNotes } from "../../utils/helpers";
import { useNotes } from "../../context/NotesContext";

const PriorityColumn = ({ title, priority }) => {
  const { notes } = useNotes();
  const filteredNotes = useMemo(
    () => filterNotes(notes, title, priority),
    [notes, title, priority],
  );

  const noteIds = useMemo(
    () => filteredNotes.map((note) => note._id),
    [filteredNotes],
  );

  return (
    <div className="mt-1 flex h-[31%] w-full flex-col justify-between">
      <PriorityTitle priority={priority} />

      <SortableContext items={noteIds} strategy={verticalListSortingStrategy}>
        <NotesList
          priority={priority}
          title={title}
          filteredNotes={filteredNotes}
        />
      </SortableContext>
    </div>
  );
};
export default PriorityColumn;
