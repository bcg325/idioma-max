"use client";
import Image from "next/image";
import Button from "../ui/Button";
import LessonHeader from "../lesson/LessonHeader";
import MultipleChoice from "./MultipleChoice";
import Build from "./Build";
import FillBlank from "./FillBlank";
import { useEffect } from "react";
import shuffle from "../utils/shuffle";

import Input from "../ui/Input";
interface ExerciseProps {
  word: string;
  answer: string;
  options: string[];
  imageUrl: string;
  exerciseType: "vocab" | "sentence_blank" | "grammar";
}
// type input = "" | "multiple_choice" | "keyboard" | "fill_blank" | "build";

const Exercise: React.FC<ExerciseProps> = ({
  word,
  answer,
  imageUrl,
  exerciseType,
  options,
}) => {
  let title = "";
  // let inputType: input = "";

  if (exerciseType === "vocab") {
    title = "Translate the word";
    // inputType = "multiple_choice"; //or keyboard
  }

  if (exerciseType === "sentence_blank") {
    title = "Fill in the blank";
    // inputType = "fill_blank"; //or keyboard
  }

  if (exerciseType === "grammar") {
    title = "Build the sentence";
    // inputType = "build";
  }

  return (
    <div className="flex flex-col justify-center items-center h-full ">
      <LessonHeader
        title={title}
        word={word}
        imageUrl={imageUrl}
        isFillBlank={exerciseType === "sentence_blank"}
      />
      <div className="flex flex-col items-center justify-center h-full w-full max-w-2xl">
        {exerciseType === "vocab" && options && (
          <MultipleChoice options={options} answer={answer} />
        )}
        {exerciseType === "grammar" && options && <Build options={options} />}
        {exerciseType === "sentence_blank" && options && (
          <FillBlank sentence={word} options={options} answer={answer} />
        )}
        {/* {inputType === "keyboard" && <p>Keyboard</p>} */}
      </div>
    </div>
  );
};
export default Exercise;
