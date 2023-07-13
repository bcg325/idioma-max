"use client";
import { useState } from "react";
import LessonCard from "./LessonCard";
import Image from "next/image";
interface Props {
  title: string;
  id: string;
}

type Status = "complete" | "current" | "locked";
const lessons = [
  {
    id: "1",
    title: "Lesson 1",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, similique.",
    status: "complete",
  },
  {
    id: "2",
    title: "Lesson 2",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, similique.",
    status: "complete",
  },
  {
    id: "3",
    title: "Lesson 3",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, similique.",
    status: "current",
  },
  {
    id: "4",
    title: "Lesson 4",
    description:
      "Lorem ipsum dolor sit amet consectetur adipisicing elit. Vel, similique.",
    status: "locked",
  },
  {
    id: "5",
    title: "Lesson 5",
    description: "Lorem ipsum dolor.",
    status: "locked",
  },
];

const UnitCard = ({ id, title }: Props) => {
  const [showLessons, setShowLessons] = useState(true);
  return (
    <div className="mx-auto border-2 border-gray rounded-lg shadow mt-8 bg-white overflow-y-hidden">
      <button
        onClick={() => setShowLessons(!showLessons)}
        className="w-full p-2 flex items-center"
      >
        <div className="bg-green p-3 mr-5 rounded-lg">icon</div>
        <span className="text-2xl font-medium">{title}</span>
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
            title={lesson.title}
            description={lesson.description}
            status={lesson.status as Status}
          />
        ))}
      </ul>
    </div>
  );
};
export default UnitCard;
