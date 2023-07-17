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
    return NextResponse.json({});
  }
  const userCourseProgress = await prisma.userCourseProgress.findMany({
    where: {
      courseId,
      userId,
    },
    select: {
      lessonId: true,
    },
  });

  let userProgressObj: UserProgress = {};

  for (const progress of userCourseProgress) {
    userProgressObj[progress.lessonId as string] = true;
  }

  return NextResponse.json(userProgressObj);
}
