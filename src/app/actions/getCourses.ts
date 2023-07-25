import { prisma } from "@/lib/db";
import { Course } from "@/types";

const getCourses = async () => {
  const courseData = await prisma.course.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      fromLanguage: {
        select: {
          locale: true,
        },
      },
      units: {
        orderBy: {
          position: "asc",
        },
        select: {
          id: true,
          name: true,
          description: true,
          lessons: {
            orderBy: {
              position: "asc",
            },
            select: {
              id: true,
              name: true,
              description: true,
            },
          },
        },
      },
    },
  });
  return courseData as Course[];
};

export default getCourses;
