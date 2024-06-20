import React from "react";
import { IoClose } from "react-icons/io5";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title: string
}

const Modal: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  children,
  title
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white rounded-sm shadow-lg overflow-hidden max-w-lg w-full">
        <div className="p-4 border-b flex justify-between items-center">
          <h2 className="text-lg font-medium">{title}</h2>
          <button
            className="text-gray-700 hover:text-gray-900"
            onClick={onClose}
          >
            <IoClose className="ml-2 mt-1 cursor-pointer text-2xl text-gray-500" />
          </button>
        </div>
        <div className="p-4">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
