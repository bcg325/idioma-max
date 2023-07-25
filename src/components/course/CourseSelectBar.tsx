"use client";
import { Course } from "@/types";

interface CourseSelectBarProps {
  courses: Course[];
  currentCourse: Course;
  selectCourse: (courseId: string) => void;
}

const CourseSelectBar: React.FC<CourseSelectBarProps> = ({
  courses,
  currentCourse,
  selectCourse,
}) => {
  const handleCourseChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    selectCourse(e.target.value);
  };

  return (
    <div className="sticky top-0 z-10 sm:top-11 w-full h-11 bg-primary500 text-white pr-2">
      <div className="h-full container max-w-7xl">
        <select
          value={currentCourse.id}
          onChange={handleCourseChange}
          name="course"
          id="course"
          className="bg-primary500 h-full p-2 outline-none"
        >
          {courses.map((course) => (
            <option key={course.id} value={course.id} className="p-3">
              {course.name}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default CourseSelectBar;
