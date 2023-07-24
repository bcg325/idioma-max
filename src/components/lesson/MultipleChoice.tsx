"use client";
import { useState, useEffect, useContext } from "react";
import { UserAnswerContext } from "./UserAnswerProvider";
import shuffle from "../../utils/shuffle";
import useTTS from "@/hooks/useTTS";

interface MultipleChoiceProps {
  options: string[];
  answer: string;
  lang: string;
}

const MultipleChoice: React.FC<MultipleChoiceProps> = ({
  options,
  answer,
  lang,
}) => {
  const [choices, setChoices] = useState<string[]>([]);
  const { userAnswer, setUserAnswer } = useContext(UserAnswerContext);
  const playSound = useTTS();

  useEffect(() => {
    const optionsCopy = [...options, answer];
    shuffle(optionsCopy);
    setChoices(optionsCopy);
  }, [options, answer]);

  const handleChoiceClick = (choice: string) => {
    playSound(choice, lang);
    setUserAnswer(choice);
  };

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {choices.map((choice, index) => (
        <button
          key={index}
          onClick={() => handleChoiceClick(choice)}
          className={`
           border-2 
          font-medium
          px-2 
          py-2.5
          rounded-xl
          shadow-md
          ${
            userAnswer === choice
              ? "bg-primary100/80 border-primary400 shadow-none "
              : "bg-white border-gray hover:bg-grayLight"
          }
          `}
        >
          {choice}
        </button>
      ))}
    </div>
  );
};
export default MultipleChoice;
