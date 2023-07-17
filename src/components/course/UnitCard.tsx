"use client";
import { useState } from "react";
import LessonCard from "./LessonCard";
import Image from "next/image";
import { Lesson } from "@/types";

interface UnitCardProps {
  id: string;
  courseId: string;
  name: string;
  lessons: Lesson[];
  // currentCoursePos: number;
}

// type Status = "complete" | "current" | "locked";

const UnitCard = ({
  id,
  courseId,
  name,
  lessons,
}: // currentCoursePos,
UnitCardProps) => {
  const [showLessons, setShowLessons] = useState(true);

  return (
    <div className="mx-auto border-2 border-gray rounded-lg shadow mt-8 bg-white overflow-y-hidden">
      <button
        onClick={() => setShowLessons(!showLessons)}
        className="w-full p-2 flex items-center"
      >
        <div className="bg-green p-3 mr-5 rounded-lg">icon</div>
        <span className="text-2xl font-medium">{name}</span>
        <Image
          className={`transition ease-in ml-auto mr-4 ${
            showLessons ? "" : "-rotate-90"
          }`}
          src="/dropdown.svg"
          alt="dropdown"
          width={25}
          height={25}
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
            status={lesson.status || "locked"}
          />
        ))}
      </ul>
    </div>
  );
};
export default UnitCard;
