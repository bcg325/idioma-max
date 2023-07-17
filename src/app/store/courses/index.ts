export const getLessonById = async (lessonId: string) => {
  const res = await fetch(`/api/lessons/${lessonId}`);
  const data = await res.json();

  return data;
};

export const updateCourseProgress = async (
  courseId: string,
  lessonId: string
) => {
  const res = await fetch("/api/course-progress/", {
    method: "POST",
    body: JSON.stringify({
      courseId: courseId,
      lessonId: lessonId,
    }),
    headers: { "Content-Type": "application/json" },
  });
  const data = await res.json();
  return data;
};

export const getUserProgress = async (courseId: string) => {
  const res = await fetch(`/api/course-progress/${courseId}`);
  const data = await res.json();
  return data;
};
