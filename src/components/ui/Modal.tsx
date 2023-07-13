"use client";
import { useState, useEffect } from "react";

interface ModalProps {
  isOpen?: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 300);
  };

  if (!isOpen) {
    return;
  }

  return (
    <div
      className="
        flex 
        items-center 
        justify-center 
        fixed 
        overflow-x-hidden
        overflow-y-auto
        z-50
        inset-0
        bg-neutral-800/50
        "
    >
      <div
        className={`
        fixed
        bottom-0
        bg-white
        w-full
        
        
        translate-all
        ease-in
        duration-150
        ${showModal ? "translate-y-0" : "translate-y-full"}
        ${showModal ? "opacity-100" : "opacity-0"}
`}
      >
        {children}
      </div>
    </div>
  );
};
export default Modal;
