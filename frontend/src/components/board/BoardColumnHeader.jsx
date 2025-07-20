import { PlusOutlined } from "@ant-design/icons";

import Button from "../common/Button";
import { useNotes } from "../../context/NotesContext";

const BoardColumnHeader = ({ title }) => {
  const { handleAddNoteModal } = useNotes();

  return (
    <div className="flex w-full items-center justify-between border-b border-dashed border-b-accent-color px-3 py-2">
      <p className="dark:text-white">{title}</p>
      <Button
        onClick={() => handleAddNoteModal(title)}
        className="text-accent-color dark:text-white"
      >
        <PlusOutlined />
      </Button>
    </div>
  );
};
export default BoardColumnHeader;
