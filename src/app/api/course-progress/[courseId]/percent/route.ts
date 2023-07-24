import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

type UserProgress = {
  [key: string]: boolean;
};
export async function GET(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  const { courseId } = params;
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  if (!userId) {
    return NextResponse.json({ error: "Not logged in" }, { status: 400 });
  }
  const totalLessonCount = await prisma.lesson.count({
    where: {
      unit: {
        courseId,
      },
    },
  });
  const userLessonCount = await prisma.userCourseProgress.count({
    where: {
      courseId,
      userId,
    },
  });

  const lastLessonCompleted = await prisma.userCourseProgress.findMany({
    where: {
      courseId,
      userId,
    },
    orderBy: {
      createdAt: "desc",
    },
    take: 1,
  });

  const progress = {
    completed: userLessonCount,
    total: totalLessonCount,
    percent: userLessonCount / totalLessonCount,
    lastCompletedDate: lastLessonCompleted[0]?.createdAt || null,
  };

  return NextResponse.json(progress);
}
