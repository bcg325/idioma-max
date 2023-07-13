import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(
  req: Request,
  { params }: { params: { courseId: string; unitPos: number } }
) {
  const { courseId, unitPos } = params;

  const unit = await prisma.unit.findUnique({
    where: {
      courseId_position: {
        courseId,
        position: +unitPos,
      },
    },
    include: {
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
  });
  return NextResponse.json(unit);
}
