import { ReactNode } from "react";

interface ModalProps {
  isOpen: boolean;
  children: ReactNode;
}

const Modal = ({ isOpen, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-30 flex items-center h-full w-full z-50 justify-center">
      <div className="bg-white text-primary rounded-lg shadow-lg px-3 py-3 w-full max-w-[90%] lg:max-w-[60%] max-h-[80vh] overflow-y-auto">
        <div className="break-words">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
