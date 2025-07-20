import { createPortal } from "react-dom";
import { CloseOutlined } from "@ant-design/icons";

import Button from "./Button";

const Modal = ({ onModalOpen, headerText, headerSpan, children }) => {
  return createPortal(
    <div
      onClick={onModalOpen}
      className="fixed left-0 top-0 z-50 grid h-dvh w-dvw place-items-center bg-black/30"
    >
      <aside
        onClick={(e) => e.stopPropagation()}
        className="relative rounded flex h-[28rem] max-w-7xl w-3/4 flex-col gap-1 overflow-hidden bg-neutral-100 p-4 dark:bg-neutral-800 dark:text-white"
      >
        <div className="absolute left-0 top-3 flex w-full justify-between items-center px-4">
          <h2 className="text-xs font-semibold italic sm:text-base">
            {headerText}
            {headerSpan && (
              <span>
                {headerSpan}
              </span>
            )}
          </h2>
          <Button onClick={onModalOpen}>
            <CloseOutlined />
          </Button>
        </div>
        {children}
      </aside>
    </div>,
    document.getElementById("root"),
  );
};

export default Modal;
