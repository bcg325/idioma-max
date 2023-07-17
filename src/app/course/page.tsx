"use client";
import CourseSelectBar from "@/components/course/CourseSelectBar";
import UnitCard from "@/components/course/UnitCard";
import { useSession } from "next-auth/react";
import { useQuery } from "@tanstack/react-query";
import { mapUserProgress } from "@/utils/mapUserProgress";
import { getUserProgress } from "@/app/store/courses";
import { useCourse } from "@/hooks/useCourse";

const CoursePage = () => {
  const { data: session, status } = useSession();
  const { courses, course, selectCourse } = useCourse();

  if (!course) {
    return <div>Loading...</div>;
  }

  const courseProgress = useQuery({
    queryKey: ["courseProgress", session?.user.id, course.id],
    queryFn: () => getUserProgress(course.id),
    enabled: status === "authenticated",
    refetchOnMount: false,
  });

  if (status === "unauthenticated") {
    const localCourseProgress = localStorage.getItem("courseProgress");
    if (localCourseProgress) {
      const localCourseProgressData = JSON.parse(localCourseProgress);
      mapUserProgress(course, localCourseProgressData[course.id] || {});
    } else {
      mapUserProgress(course, {});
    }
  }
  if (courseProgress.data) {
    mapUserProgress(course, courseProgress.data || {});
  }

  return (
    <div>
      <CourseSelectBar
        courses={courses}
        currentCourse={course}
        selectCourse={selectCourse}
      />
      <div className="container lg:max-w-5xl">
        {course.units.map((unit) => (
          <UnitCard
            key={unit.id}
            id={unit.id}
            courseId={course.id}
            name={unit.name}
            lessons={unit.lessons}
          />
        ))}
      </div>
    </div>
  );
};
export default CoursePage;
