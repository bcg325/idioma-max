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

  const courseProgress = useQuery({
    queryKey: ["courseProgress", session?.user.id, course!.id],
    queryFn: () => getUserProgress(course!.id),
    enabled: !!session?.user,
    refetchOnMount: false,
  });

  if (!course) {
    return;
  }
  if (status === "unauthenticated") {
    const localCourseProgress = localStorage.getItem("courseProgress");
    if (localCourseProgress) {
      const localCourseProgressData = JSON.parse(localCourseProgress);
      console.log(localCourseProgressData);
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
        {course.units.map((unit, index) => (
          <UnitCard
            key={unit.id}
            id={unit.id}
            courseId={course.id}
            name={unit.name}
            lessons={unit.lessons}
            order={index + 1}
          />
        ))}
      </div>
    </div>
  );
};
export default CoursePage;
