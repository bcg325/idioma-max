"use client";

import { createContext, useState, useEffect, useCallback } from "react";
import { Course } from "@/types";
import { usePathname, useRouter } from "next-intl/client";
import Image from "next/image";

interface CourseContextType {
  courses: Course[];
  course: Course | null;
  selectCourse: (courseId: string) => void;
}

export const CourseContext = createContext<CourseContextType>({
  courses: [],
  course: null,
  selectCourse: () => null,
});

interface CourseSelectionProps {
  children: React.ReactNode;
  courses: Course[];
  locale: string;
}

const CourseSelection: React.FC<CourseSelectionProps> = ({
  courses,
  children,
  locale,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const [course, setCourse] = useState<Course | null>(null);
  const [checkedCourse, setCheckedCourse] = useState(false);

  const selectCourse = useCallback(
    (courseId: string) => {
      const newCourse = courses.find(
        (course) => course.id === courseId
      ) as Course;
      setCourse(newCourse);

      if (typeof window != "undefined") {
        localStorage.setItem("currentCourseId", JSON.stringify(courseId));
      }
      if (
        (locale && locale != newCourse.fromLanguage.locale) ||
        (!locale && newCourse.fromLanguage.locale != "en")
      ) {
        router.replace(pathname, { locale: newCourse.fromLanguage.locale });
      }
    },
    [courses, router, pathname, locale]
  );

  useEffect(() => {
    if (!course && typeof window != "undefined") {
      const localCurrentCourseId = localStorage.getItem("currentCourseId");
      if (localCurrentCourseId) {
        selectCourse(JSON.parse(localCurrentCourseId));
      }
    }
    setCheckedCourse(true);
  }, [course, selectCourse]);

  if (!checkedCourse) {
    return;
  }

  return (
    <CourseContext.Provider value={{ courses: courses, course, selectCourse }}>
      {course ? (
        children
      ) : (
        <div className="container pt-8 relative flex flex-col justify-between items-center h-full bg-grayLight">
          <Image
            className=""
            src="/im-logo-full.svg"
            width={250}
            height={250}
            alt="Idioma Max logo"
          />
          {/* <h1 className="text-3xl font-semibold text-center">Pick a course</h1>
          <h1 className="text-3xl font-semibold text-center">Elige un curso</h1> */}
          <div className="flex flex-wrap gap-4 items-center justify-center mt-5">
            {courses.map((course) => (
              <button
                key={course.id}
                onClick={() => selectCourse(course.id)}
                className="bg-white text-center border-2 border-gray/50 shadow-lg rounded-xl p-4 hover:bg-primary100/10"
              >
                <h1 className="text-xl font-semibold">{course.name}</h1>
                <p className="text-sm">{course.description}</p>
              </button>
            ))}
          </div>
          <Image
            className="md:w-80 lg:w-96"
            src="/lesson-completed.svg"
            width={260}
            height={260}
            alt="People studying"
          />
        </div>
      )}
    </CourseContext.Provider>
  );
};
export default CourseSelection;
