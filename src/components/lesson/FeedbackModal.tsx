import Modal from "../ui/Modal";
import Button from "../ui/Button";
import { BsCheckCircle } from "react-icons/bs";
import { AiOutlineCloseCircle } from "react-icons/ai";

interface FeedbackModalProps {
  isOpen?: boolean;
  isCorrect: boolean;
  correctAnswer: string;
  onClose: () => void;
}

const FeedbackModal: React.FC<FeedbackModalProps> = ({
  isOpen,
  isCorrect,
  correctAnswer,
  onClose,
}) => {
  const title = isCorrect ? "Correct!" : "Correct answer:";

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <div
        className={`
        w-full 
        text-center 
        flex flex-col 
        items-center 
        ${isCorrect ? "bg-green-50 text-green-900" : "bg-red-100 text-red-900"}
        `}
      >
        <div className="w-full items-center justify-center mt-4 mb-3">
          {isCorrect ? (
            <BsCheckCircle className="mx-auto mb-2" size={30} />
          ) : (
            <AiOutlineCloseCircle className="mx-auto mb-2" size={30} />
          )}
          <h2 className="text-xl font-bold">{title}</h2>
        </div>
        <div className="mb-5">
          {!isCorrect && <p className="text-lg">{correctAnswer}</p>}
        </div>
        <Button
          color={isCorrect ? "bg-green-900" : "bg-red-900 "}
          className="my-3 text-white w-44"
          onClick={onClose}
        >
          Continue
        </Button>
      </div>
    </Modal>
  );
};
export default FeedbackModal;
