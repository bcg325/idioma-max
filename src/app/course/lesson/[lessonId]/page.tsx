"use client";
import { useState, createContext, Dispatch, SetStateAction } from "react";
import Exercise from "@/components/exercise/Exercise";
import ProgressTopBar from "@/components/ui/ProgressTopBar";
import Button from "@/components/ui/Button";
import ExerciseModal from "@/components/exercise/FeedbackModal";

type exerciseType = "vocab" | "sentence_blank" | "grammar";

const exercises = [
  {
    id: "1",
    word: "How are you?",
    answer: "Como estas?",
    options: ["Estas como?", "Estas bien", "Tu estas?"],
    imageUrl: "/language.jpg",
    exerciseType: "vocab" as exerciseType,
  },
  {
    id: "2",
    word: "My name is",
    answer: "mi nombre es",
    options: ["mi", "nombre", "es", "otra", "dia", "hola", "nada"],
    imageUrl: "/language.jpg",
    exerciseType: "grammar" as exerciseType,
  },
  {
    id: "4",
    word: "Good morning",
    answer: "Buenos dias",
    options: ["Buenas noches", "Buenas tardes", "Buena dia"],
    imageUrl: "/language.jpg",
    exerciseType: "vocab" as exerciseType,
  },
  {
    id: "5",
    word: "yo ~ español",
    answer: "hablo",
    options: ["perdon", "bebo", "como"],
    imageUrl: "/language.jpg",
    exerciseType: "sentence_blank" as exerciseType,
  },
  {
    id: "6",
    word: "goodbye",
    answer: "adiós",
    options: ["hola", "por favor", "gracias"],
    imageUrl: "/language.jpg",
    exerciseType: "vocab" as exerciseType,
  },
  {
    id: "7",
    word: "Thank you",
    answer: "Gracias",
    options: ["option1", "option2", "option3"],
    imageUrl: "/language.jpg",
    exerciseType: "vocab" as exerciseType,
  },
];

interface UserAnswerContextType {
  userAnswer: string;
  setUserAnswer: Dispatch<SetStateAction<string>>;
}

type FeedbackType = {
  isCorrect: boolean;
} | null;

export const UserAnswerContext = createContext<UserAnswerContextType>({
  userAnswer: "",
  setUserAnswer: () => {},
});

const formatFillBlankAnswer = (sentence: string, answer: string) => {
  const tempSentence = sentence.trim().split(" ");
  const delimiterIndex = tempSentence.indexOf("~");

  tempSentence.splice(delimiterIndex, 1, answer);
  return tempSentence.join(" ");
};

const LessonPage = ({ params }: { params: { lessonId: string } }) => {
  const [currExerciseIndex, setCurrExerciseIndex] = useState<number>(0);
  const [userAnswer, setUserAnswer] = useState<string>("");
  const [feedback, setFeedback] = useState<FeedbackType>(null);

  const currentExercise = exercises[currExerciseIndex];

  const nextExercise = () => {
    setUserAnswer("");
    setFeedback(null);

    if (currExerciseIndex < exercises.length - 1) {
      setCurrExerciseIndex((prev) => prev + 1);
    } else {
      alert("FINISHED ALL EXERCISES");
    }
  };

  const handleCheckAnswer = () => {
    const correct = userAnswer === currentExercise.answer;
    setFeedback({ isCorrect: correct });
  };

  const correctAnswer =
    currentExercise.exerciseType === "sentence_blank" && !feedback?.isCorrect
      ? formatFillBlankAnswer(currentExercise.word, currentExercise.answer)
      : currentExercise.answer;

  return (
    <UserAnswerContext.Provider value={{ userAnswer, setUserAnswer }}>
      <div className="container min-h-fit h-screen flex flex-col">
        <ProgressTopBar
          current={currExerciseIndex + 1}
          total={exercises.length}
          closeLink="/course"
        />
        <ExerciseModal
          isOpen={!!feedback}
          isCorrect={feedback?.isCorrect || false}
          correctAnswer={correctAnswer}
          onClose={nextExercise}
        />
        <Exercise
          word={currentExercise.word}
          exerciseType={currentExercise.exerciseType}
          answer={currentExercise.answer}
          options={currentExercise.options}
          imageUrl={currentExercise.imageUrl}
        />
        <div className="flex justify-center w-full py-3">
          <Button
            disabled={!userAnswer}
            className="text-white w-44"
            onClick={handleCheckAnswer}
          >
            Check
          </Button>
        </div>
      </div>
    </UserAnswerContext.Provider>
  );
};
export default LessonPage;
