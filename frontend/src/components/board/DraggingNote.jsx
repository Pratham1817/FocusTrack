import { createPortal } from "react-dom";
import { DragOverlay } from "@dnd-kit/core";

const DraggingNote = () => {
  return createPortal(
    <DragOverlay>
      <div className="mx-auto my-0 w-3/4 cursor-grabbing rounded-md border border-accent-color bg-accent-color p-1 pl-2 text-sm text-white md:w-4/5 lg:w-full lg:text-base dark:bg-neutral-800/70">
        Dragging...
      </div>
    </DragOverlay>,
    document.getElementById("root"),
  );
};

export default DraggingNote;
