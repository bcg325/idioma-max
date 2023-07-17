"use client";
import LessonHeader from "./LessonHeader";
import MultipleChoice from "./MultipleChoice";
import Build from "./Build";
import FillBlank from "./FillBlank";

interface ExerciseInputProps {
  term: string;
  answer: string;
  options: string[];
  imageUrl: string;
  exerciseType: string;
}

const ExerciseInput: React.FC<ExerciseInputProps> = ({
  term,
  answer,
  imageUrl,
  exerciseType,
  options,
}) => {
  let title = "";

  if (exerciseType === "vocab") {
    title = "Translate the word";
  }

  if (exerciseType === "fill_blank") {
    title = "Fill in the blank";
  }

  if (exerciseType === "grammar") {
    title = "Build the sentence";
  }

  return (
    <div className="flex flex-col justify-center items-center h-full ">
      <LessonHeader
        title={title}
        term={term}
        imageUrl={imageUrl}
        isFillBlank={exerciseType === "fill_blank"}
      />
      <div className="flex flex-col items-center justify-center h-full w-full max-w-2xl">
        {exerciseType === "vocab" && options && (
          <MultipleChoice options={options} answer={answer} />
        )}
        {exerciseType === "grammar" && options && <Build options={options} />}
        {exerciseType === "fill_blank" && options && (
          <FillBlank sentence={term} options={options} answer={answer} />
        )}
      </div>
    </div>
  );
};
export default ExerciseInput;
