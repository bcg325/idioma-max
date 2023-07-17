import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: Request, res: Response) {
  const { courseId, lessonId } = await req.json();
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  if (!courseId || !lessonId) {
    return NextResponse.json({ error: "Invalid fields", status: 400 });
  }

  if (!userId) {
    return NextResponse.json({ error: "User not logged in", status: 400 });
  }

  const createCourseProgress = await prisma.userCourseProgress.upsert({
    where: {
      userId,
      courseId,
      lessonId,
    },
    create: {
      userId,
      courseId,
      lessonId,
    },
    update: {},
  });

  return NextResponse.json({
    message: "Successfully updated course progress",
    status: 201,
  });
}
