import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  const courseId = params.courseId;
  const res = await prisma.course.findUnique({
    where: {
      id: courseId,
    },
    include: {
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
  return NextResponse.json(res);
}
