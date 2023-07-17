import { useContext } from "react";
import { CourseContext } from "@/components/course/CourseSelection";

export const useCourse = () => {
  const courseData = useContext(CourseContext);
  return courseData;
};
