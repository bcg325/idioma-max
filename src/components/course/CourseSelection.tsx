"use client";

import {
  createContext,
  useState,
  useEffect,
  Dispatch,
  SetStateAction,
  useMemo,
  useCallback,
} from "react";
import { Course } from "@/types";
import { usePathname, useRouter } from "next-intl/client";
interface CourseContextType {
  courses: Course[];
  course: Course | null;
  selectCourse: (courseId: string, change: boolean) => void;
}

export const CourseContext = createContext<CourseContextType>({
  courses: [],
  course: null,
  selectCourse: () => null,
});

interface CourseSelectionProps {
  children: React.ReactNode;
  courses: Course[];
}

const CourseSelection: React.FC<CourseSelectionProps> = ({
  courses,
  children,
}) => {
  const pathname = usePathname();
  const router = useRouter();
  const [course, setCourse] = useState<Course | null>(null);
  const [checkedCourse, setCheckedCourse] = useState(false);

  const selectCourse = useCallback(
    (courseId: string, change: boolean) => {
      const newCourse = courses.find(
        (course) => course.id === courseId
      ) as Course;
      setCourse(newCourse);

      if (typeof window != "undefined") {
        localStorage.setItem("currentCourseId", JSON.stringify(courseId));
      }

      if (change) {
        router.push("/", { locale: newCourse.fromLanguage.locale });
      }
    },
    [courses, router]
  );

  useEffect(() => {
    if (!course && typeof window != "undefined") {
      const localCurrentCourseId = localStorage.getItem("currentCourseId");
      if (localCurrentCourseId) {
        selectCourse(JSON.parse(localCurrentCourseId), false);
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
        <div className=" flex flex-col justify-center h-full w-full bg-grayLight">
          <h1 className="text-3xl font-semibold text-center">Pick a course</h1>
          <div className="flex flex-wrap gap-4 items-center justify-center mt-5">
            {courses.map((course) => (
              <button
                key={course.id}
                onClick={() => selectCourse(course.id, true)}
                className="bg-white text-center border-2 border-gray shadow-lg rounded-xl p-3"
              >
                <h1 className="text-lg font-medium">{course.name}</h1>
                <p className="text-sm">{course.description}</p>
              </button>
            ))}
          </div>
          <p className="text-center">Or log in</p>
        </div>
      )}
    </CourseContext.Provider>
  );
};
export default CourseSelection;
