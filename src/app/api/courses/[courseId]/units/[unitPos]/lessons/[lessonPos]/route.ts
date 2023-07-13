import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  {
    params,
  }: { params: { courseId: string; unitPos: number; lessonPos: number } }
) {
  const { courseId, unitPos, lessonPos } = params;

  const unit = await prisma.unit.findUnique({
    where: {
      courseId_position: {
        courseId,
        position: +unitPos,
      },
    },
    select: {
      id: true,
    },
  });

  if (!unit) {
    return;
  }

  const lesson = await prisma.lesson.findUnique({
    where: {
      unitId_position: {
        unitId: unit.id,
        position: +lessonPos,
      },
    },
    include: {
      exercises: {
        orderBy: {
          position: "asc",
        },
        select: {
          id: true,
          term: true,
          answer: true,
          options: true,
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
