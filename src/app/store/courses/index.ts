import axios from "axios";
import { Lesson } from "@/types";

export const getLessonById = async (lessonId: string) => {
  const res = await axios.get(`/api/lessons/${lessonId}`);
  return res.data;
};

export const updateCourseProgress = async (
  courseId: string,
  lessonId: string
) => {
  const res = await axios.post("/api/course-progress/", {
    courseId,
    lessonId,
  });
  return res.data;
};

export const getUserProgress = async (courseId: string) => {
  const res = await axios.get(`/api/course-progress/${courseId}`);
  return res.data;
};
