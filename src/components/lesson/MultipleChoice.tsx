"use client";
import { useState, useEffect, useContext } from "react";
import { UserAnswerContext } from "@/app/course/lesson/[lessonId]/page";
import shuffle from "../../utils/shuffle";

interface MultipleChoiceProps {
  options: string[];
  answer: string;
}

const MultipleChoice: React.FC<MultipleChoiceProps> = ({ options, answer }) => {
  const [choices, setChoices] = useState<string[]>([...options]);
  const { userAnswer, setUserAnswer } = useContext(UserAnswerContext);

  useEffect(() => {
    const optionsCopy = [...options, answer];
    shuffle(optionsCopy);
    setChoices(optionsCopy);
  }, [options, answer]);

  return (
    <div className="flex flex-col gap-1.5 w-full">
      {choices.map((choice, index) => (
        <button
          key={index}
          onClick={() => setUserAnswer(choice)}
          className={`
          ${
            userAnswer === choice
              ? "bg-primary100/80 border-primary400 "
              : "bg-white border-gray hover:bg-grayLight"
          }
          border-2 
          font-medium
          
          px-2 
          py-2.5
          rounded-xl
          shadow-md"
          `}
        >
          {choice}
        </button>
      ))}
    </div>
  );
};
export default MultipleChoice;
