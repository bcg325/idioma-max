import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { lessonId: string } }
) {
  const { lessonId } = params;
  const lesson = await prisma.lesson.findUnique({
    where: {
      id: lessonId,
    },
    select: {
      id: true,
      unit: {
        select: {
          id: true,
          courseId: true,
        },
      },
      position: true,
      exercises: {
        orderBy: {
          position: "asc",
        },
        select: {
          id: true,
          term: true,
          termLang: true,
          answer: true,
          options: true,
          optionsLang: true,
          imageUrl: true,
          readingPageId: true,
          exerciseType: {
            select: {
              name: true,
            },
          },
        },
      },
    },
  });

  return NextResponse.json(lesson);
}
