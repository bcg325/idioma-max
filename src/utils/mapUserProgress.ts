import { Course } from "@/types/index";
type CourseProgress = {
  [key: string]: boolean;
};

export const mapUserProgress = (
  courseData: Course,
  courseProgress: CourseProgress
) => {
  const noProgress = Object.keys(courseProgress).length === 0;
  let lastCompletedLesson = false;
  for (const unit of courseData.units) {
    for (const lesson of unit.lessons) {
      if (!noProgress && courseProgress[lesson.id as keyof CourseProgress]) {
        lesson.status = "completed";
        lastCompletedLesson = true;
      } else {
        lesson.status = "locked";
        if (lastCompletedLesson) {
          lesson.status = "current";
          lastCompletedLesson = false;
        }
      }
    }
  }
  if (noProgress) {
    courseData.units[0].lessons[0].status = "current";
  }
};
