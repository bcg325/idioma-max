"use client";
import { useState } from "react";
import LessonCard from "./LessonCard";
import Image from "next/image";
import { Lesson } from "@/types";
import { IoMdArrowDropdown } from "react-icons/io";

type bgColor = {
  [key: number]: string;
};
interface UnitCardProps {
  id: string;
  courseId: string;
  name: string;
  lessons: Lesson[];
  order: number;
  // currentCoursePos: number;
}

// type Status = "complete" | "current" | "locked";

const UnitCard = ({
  id,
  courseId,
  name,
  lessons,
  order,
}: // currentCoursePos,
UnitCardProps) => {
  const [showLessons, setShowLessons] = useState(true);

  const bgColor: bgColor = {
    1: "bg-unitColor1",
    2: "bg-unitColor2",
    3: "bg-unitColor3",
    4: "bg-unitColor4",
  };
  return (
    <div
      className={`mx-auto rounded-lg mt-8 overflow-y-hidden border-2 border-gray shadow-lg ${bgColor[order]}`}
    >
      <button
        onClick={() => setShowLessons(!showLessons)}
        className="w-full p-2 flex items-center"
      >
        <div className="p-2 mr-2">
          <Image
            src={`/unit-icons/${order}.svg`}
            width={32}
            height={32}
            alt="Unit icon"
          />
        </div>
        <span className="text-2xl font-medium text-white">{name}</span>
        <IoMdArrowDropdown
          size={32}
          className={`text-white transition ease-in ml-auto mr-4 ${
            showLessons ? "" : "-rotate-90"
          }`}
        />
      </button>

      <ul
        className={`
        overflow-hidden
 
        ${showLessons ? "h-full" : "h-0"}
        `}
      >
        {lessons.map((lesson, index) => (
          <LessonCard
            key={lesson.id}
            url={`/course/lesson/${lesson.id}`}
            title={lesson.name}
            description={lesson.description}
            status={lesson.status || "loading"}
            order={index + 1}
          />
        ))}
      </ul>
    </div>
  );
};
export default UnitCard;
