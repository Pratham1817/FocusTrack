import { createContext, useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
  useSensors,
  useSensor,
  MouseSensor,
  TouchSensor,
  KeyboardSensor,
} from "@dnd-kit/core";
import { arrayMove } from "@dnd-kit/sortable";

import { showToast } from "../utils/helpers";
import { useFetch } from "../hooks/useFetch";
import { useThemeColors } from "./ThemeContext";

const NotesContext = createContext();

const NotesProvider = ({ children }) => {
  const { boardId } = useParams();
  const { isLight } = useThemeColors();

  const {
    data: notes,
    setData: setNotes,
    isLoading: notesIsLoading,
  } = useFetch(`/api/boards/board/${boardId}`, !boardId);

  const { data: pinnedNotes, setData: setPinnedNotes } = useFetch(
    "/api/notes/pinned",
  );

  const {
    data: archivedNotes,
    setData: setArchivedNotes,
    isLoading: archivedNotesLoading,
  } = useFetch("/api/notes/archived");

  const [noteForm, setNoteForm] = useState({
    title: "",
    description: "",
  });
  const [newNoteForm, setNewNoteForm] = useState({
    title: "",
    description: "",
    priority: "low",
  });
  const [selectedCol, setSelectedCol] = useState(null);
  const [selectedNote, setSelectedNote] = useState(null);
  const [noteModalOpen, setNoteModalOpen] = useState(false);
  const [addNoteModalOpen, setAddNoteModalOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleToggleEditNote = () => setIsEditing((isEditing) => !isEditing);

  const handleNoteForm = (e) => {
    setNoteForm((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleNewNoteForm = (e) => {
    setNewNoteForm((prev) => ({
      ...prev,
      [e.target.id]: e.target.value,
    }));
  };

  const handleAddNoteModal = (colTitle) => {
    setAddNoteModalOpen((isOpen) => !isOpen);

    colTitle ? setSelectedCol(colTitle) : setSelectedCol(null);

    // Clearing form in case form fields were filled but adding new note was cancelled
    if (newNoteForm.title || newNoteForm.description)
      setNewNoteForm({
        title: "",
        description: "",
        priority: "low",
      });
  };

  const handleNoteModal = (e, note) => {
    if (e.type === "click" || (e.type === "keydown" && e.key === "Enter")) {
      setNoteModalOpen((isOpen) => !isOpen);
      note ? setSelectedNote(note) : setSelectedNote(null);

      // Close editing mode if previously rendered
      if (isEditing) setIsEditing(false);
    }
  };

  const handleAddNewNote = async (e) => {
    e.preventDefault();

    if (!newNoteForm.title || !newNoteForm.description)
      return showToast("All fields are required!", "error", isLight);

    try {
      setIsSubmitting(true);

      const newNote = {
        title: newNoteForm.title,
        description: newNoteForm.description,
        priority: newNoteForm.priority,
        boardId,
        columnTitle: selectedCol,
      };

      const res = await fetch("/api/notes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(newNote),
        credentials: "include",
      });

      const data = await res.json();
      setNotes((prevNotes) => [...prevNotes, data]);

      handleAddNoteModal();
      setNewNoteForm({
        title: "",
        description: "",
        priority: "low",
      });
    } catch (err) {
      console.log(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePinNote = async () => {
    try {
      const res = await fetch(
        `/api/notes/${selectedNote._id}`,
        {
          method: "PATCH",
          body: JSON.stringify({ pinned: !selectedNote.pinned }),
          headers: { "Content-Type": "application/json" },
        },
      );

      if (!res.ok)
        throw new Error(
          `Something went wrong with deleting the note with id: ${selectedNote._id}`,
        );

      const newPinnedNote = await res.json();

      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note._id === newPinnedNote._id ? newPinnedNote : note,
        ),
      );
      setPinnedNotes((prevPinnedNote) => [...prevPinnedNote, newPinnedNote]);
      setSelectedNote(newPinnedNote);

      showToast("Note pinned successfully!", "success", isLight);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleUnpinNote = async (noteId) => {
    try {
      const res = await fetch(`/api/notes/${noteId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ pinned: false }),
      });

      if (!res.ok)
        throw new Error(
          `Something went wrong with unpinning the note with id: ${noteId}`,
        );

      const updatedNote = await res.json();

      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note._id === updatedNote._id ? updatedNote : note,
        ),
      );

      setPinnedNotes((prevPinnedNotes) =>
        prevPinnedNotes.filter((note) => note._id !== updatedNote._id),
      );

      setSelectedNote({ ...selectedNote, pinned: false });
      showToast("Note unpinned successfully!", "success", isLight);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleArchiveNote = async (noteId) => {
    try {
      const res = await fetch(`/api/notes/${noteId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ archived: true }),
      });

      if (!res.ok)
        throw new Error(
          `Something went wrong with unpinning the note with id: ${noteId}`,
        );

      const archivedNote = await res.json();

      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note._id === archivedNote._id ? archivedNote : note,
        ),
      );
      setArchivedNotes((prevArchived) => [...prevArchived, archivedNote]);

      // This if block will run, if note was previously pinned and now note got archived. Basically removing it from pinned notes list on PomodoroPage
      if (archivedNote.pinned) {
        setPinnedNotes((prevNotes) =>
          prevNotes.filter((note) => note._id !== archivedNote._id),
        );
      }

      showToast("Note successfully archived!", "success", isLight);
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleUnarchiveNote = async (noteId) => {
    try {
      const res = await fetch(`/api/notes/${noteId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ archived: false }),
      });
      const unarchivedNote = await res.json();

      setArchivedNotes((prevArchivedNotes) =>
        prevArchivedNotes.filter((note) => note._id !== unarchivedNote._id),
      );

      if (unarchivedNote.pinned) {
        setPinnedNotes((prev) => [...prev, unarchivedNote]);
      }
      showToast(
        "Note restored successfully to it's corresponding board!",
        "success",
        isLight,
      );
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleDeleteNote = async (noteId) => {
    try {
      setIsDeleting(true);
      const res = await fetch(
        `/api/notes/${noteId ? noteId : selectedNote._id}`,
        {
          method: "DELETE",
        },
      );

      if (!res.ok)
        throw new Error(
          `Something went wrong with deleting the note with id: ${selectedNote._id}`,
        );

      const deletedNote = await res.json();
      const newNotes = notes.filter((note) => note._id !== deletedNote._id);
      setNotes(newNotes);

      setPinnedNotes((prevPinnedNotes) =>
        prevPinnedNotes.filter((note) => note._id !== deletedNote._id),
      );

      setArchivedNotes((prevArchivedNote) =>
        prevArchivedNote.filter((note) => note._id !== deletedNote._id),
      );

      // Close note modal on successful delete
      if (!noteId) {
        setNoteModalOpen((isOpen) => !isOpen);
        setSelectedNote(null);
      }

      showToast("Note deleted successfully!", "success", isLight);
    } catch (err) {
      console.log(err.message);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleUpdateNote = async (e) => {
    e.preventDefault();

    if (!noteForm.title || !noteForm.description)
      return showToast("Fields cannot be empty!", "error", isLight);

    try {
      setIsSubmitting(true);
      const res = await fetch(
        `/api/notes/${selectedNote._id}`,
        {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            title: noteForm.title,
            description: noteForm.description,
          }),
        },
      );

      if (!res.ok)
        throw new Error(
          `Something went wrong with updating the note of id: ${selectedNote._id}`,
        );

      const updatedNote = await res.json();

      setSelectedNote({
        ...selectedNote,
        title: noteForm.title,
        description: noteForm.description,
      });

      setNotes((prevNotes) =>
        prevNotes.map((note) =>
          note._id === updatedNote._id ? updatedNote : note,
        ),
      );

      // Updating the value of note if previously was pinned and now gets updated
      if (updatedNote.pinned) {
        setPinnedNotes((prevPinnedNotes) =>
          prevPinnedNotes.map((note) =>
            note._id === updatedNote._id ? updatedNote : note,
          ),
        );
      }

      showToast("Note's details updated successfully!", "success", isLight);
      setIsEditing(false);
    } catch (err) {
      console.log(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Setting values of selectedNote to form values of note editing mode
  useEffect(() => {
    if (selectedNote && isEditing) {
      setNoteForm({
        title: selectedNote.title,
        description: selectedNote.description,
      });
    }
  }, [selectedNote, isEditing]);

  const updateNotesOrder = async (updatedNotes) => {
    try {
      await fetch(`/api/notes/${boardId}`, {
        method: "PUT",
        body: JSON.stringify(updatedNotes),
        headers: { "Content-Type": "application/json" },
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  const updateNotesCol = async (id, priority, columnTitle) => {
    try {
      await fetch(`/api/notes/${id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          priority: priority.toLowerCase(),
          columnTitle: columnTitle,
        }),
      });
    } catch (err) {
      console.log(err.message);
    }
  };

  const handleDragEnd = (e) => {
    const { active, over } = e;

    // Checking if draggable element left dragged in the same position
    if (active.id === over.id && !over) return;

    const dragIsNote = active.data.current?.type === "Note";
    const dropIsNote = over.data.current?.type === "Note";
    const dropIsColumn = over.data.current?.type === "Column";

    if (dragIsNote && dropIsNote) {
      const originalPos = notes.findIndex((note) => note._id === active.id);
      const newPos = notes.findIndex((note) => note._id === over.id);

      const updatedNotes = arrayMove(notes, originalPos, newPos);
      updateNotesOrder(updatedNotes);
      setNotes(updatedNotes);
    }

    if (dragIsNote && dropIsColumn) {
      const originalPosition = notes.findIndex(
        (note) => note._id === active.id,
      );

      const bodyArr = over.id.split(" ");
      const priority = bodyArr[0].toLowerCase();
      const columnTitle = bodyArr[1];

      // Preventing unecessary updates on backend when note is being dragged at the same column of where it was
      if (
        notes[originalPosition].columnTitle === columnTitle &&
        notes[originalPosition].priority === priority
      )
        return;

      // Else update notes order on backend
      updateNotesCol(active.id, priority, columnTitle);
      notes[originalPosition].columnTitle = columnTitle;
      notes[originalPosition].priority = priority;

      const updatedNotes = arrayMove(notes, originalPosition, originalPosition);
      setNotes(updatedNotes);
    }
  };

  // Sensors of external library dnd-kit
  const sensors = useSensors(
    useSensor(MouseSensor, {
      activationConstraint: {
        distance: 10,
      },
    }),
    useSensor(TouchSensor, {
      activationConstraint: {
        distance: 5,
      },
    }),
    useSensor(KeyboardSensor),
  );

  return (
    <NotesContext.Provider
      value={{
        notes,
        notesIsLoading,
        isEditing,
        isSubmitting,
        isDeleting,
        noteForm,
        newNoteForm,
        selectedNote,
        selectedCol,
        sensors,
        noteModalOpen,
        addNoteModalOpen,
        pinnedNotes,
        archivedNotes,
        archivedNotesLoading,
        setArchivedNotes,
        setNotes,
        handleNoteForm,
        handleNewNoteForm,
        handleAddNoteModal,
        handleToggleEditNote,
        handleNoteModal,
        handleAddNewNote,
        handlePinNote,
        handleUnpinNote,
        handleArchiveNote,
        handleUnarchiveNote,
        handleDeleteNote,
        handleUpdateNote,
        updateNotesOrder,
        updateNotesCol,
        handleDragEnd,
      }}
    >
      {children}
    </NotesContext.Provider>
  );
};

const useNotes = () => {
  const context = useContext(NotesContext);

  if (context === undefined)
    throw new Error("NoteContext was used outside of NoteProvider");

  return context;
};

export { NotesProvider, useNotes };
