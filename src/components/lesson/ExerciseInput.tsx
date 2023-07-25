"use client";
import MultipleChoice from "./MultipleChoice";
import Build from "./Build";
import FillBlank from "./FillBlank";

interface ExerciseInputProps {
  term: string;
  termLang: string;
  answer: string;
  options: string[];
  optionsLang: string;
  imageUrl: string;
  exerciseType: string;
}

const ExerciseInput: React.FC<ExerciseInputProps> = ({
  term,
  termLang,
  answer,
  imageUrl,
  exerciseType,
  options,
  optionsLang,
}) => {
  return (
    <div className="flex flex-col justify-center items-center">
      <div className="flex flex-col items-center justify-center h-full w-full max-w-2xl">
        {exerciseType === "vocab" && options && (
          <MultipleChoice
            options={options}
            lang={optionsLang}
            answer={answer}
          />
        )}
        {exerciseType === "grammar" && options && (
          <Build options={options} lang={optionsLang} />
        )}
        {exerciseType === "fill_blank" && options && (
          <FillBlank
            sentence={term}
            options={options}
            lang={optionsLang}
            answer={answer}
          />
        )}
      </div>
    </div>
  );
};
export default ExerciseInput;
