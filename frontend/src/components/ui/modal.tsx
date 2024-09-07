import { ReactNode } from 'react';

interface ModalProps {
  isOpen: boolean;
  children: ReactNode;
}

const Modal = ({ isOpen, children }: ModalProps) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-opacity-30 flex items-center h-full w-full z-50 justify-center ">
      <div className="bg-white text-primary rounded-lg shadow-lg px-3 py-6 w-[300px] lg:w-1/3">
        {/* Modal Content */}
        {children}
      </div>
    </div>
  );
};

export default Modal;
