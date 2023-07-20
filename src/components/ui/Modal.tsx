import { useRef, useEffect } from "react";
import Button from "./Button";
import { IoClose } from "react-icons/io5";
interface ModalProps {
  isOpen: boolean;
  handleClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, handleClose, children }) => {
  if (!isOpen) {
    return;
  }

  return (
    <>
      <div className="fixed inset-0 z-50 h-fit px-6 pt-3 pb-6 mx-auto my-auto bg-white shadow-lg w-full sm:w-5/6 rounded-xl max-w-xl">
        <div className="">
          <Button
            onClick={() => handleClose()}
            color="bg-white"
            rounding="rounded-full"
            className="p-0 shadow-none hover:bg-grayLight"
          >
            <IoClose size={26} />
          </Button>
          {children}
        </div>
      </div>
      <div
        onClick={handleClose}
        className="fixed inset-0 z-40 bg-neutral-800/50 overflow-hidden flex items-center justify-center"
      ></div>
    </>
  );
};
export default Modal;
