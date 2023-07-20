import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

export async function POST(req: Request, res: Response) {
  const { courseId } = await req.json();
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  if (!courseId) {
    return NextResponse.json({ error: "Invalid fields", status: 400 });
  }

  if (!userId) {
    return NextResponse.json({ error: "User not logged in", status: 400 });
  }

  const newCardSet = await prisma.cardSet.create({
    data: {
      name: "Untitled",
      courseId,
      creatorId: userId,
    },
  });

  if (!newCardSet) {
    return NextResponse.json(
      { error: "Failed to create card set" },
      { status: 400 }
    );
  }

  return NextResponse.json({ id: newCardSet.id }, { status: 200 });
}
