"use client";
import { useState, useEffect } from "react";
import Button from "../ui/Button";
import { BsCheckCircle } from "react-icons/bs";
import { AiOutlineCloseCircle } from "react-icons/ai";
import { useTranslations } from "next-intl";

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
  const t = useTranslations("Lesson.feedback");

  const title = isCorrect ? t("correct") : t("incorrect");
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = () => {
    setShowModal(false);
    setTimeout(() => {
      onClose();
    }, 150);
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
            onClick={handleClose}
          >
            {t("continue")}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default FeedbackModal;
