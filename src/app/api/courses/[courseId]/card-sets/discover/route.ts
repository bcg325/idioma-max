import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";

export async function GET(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  const { courseId } = params;
  const { searchParams } = new URL(req.url);
  const limit = searchParams.get("limit");

  const discoverSetsCount = await prisma.cardSet.count({
    where: {
      creatorId: "cljq35vem0000vcccn8s8bx2t",
      courseId,
    },
  });

  const discoverSets = await prisma.cardSet.findMany({
    where: {
      creatorId: "cljq35vem0000vcccn8s8bx2t",
      courseId,
    },
    take: limit ? +limit : undefined,
    select: {
      id: true,
      name: true,
      imageUrl: true,
      _count: {
        select: {
          cards: true,
        },
      },
    },
  });

  if (!discoverSets) {
    return NextResponse.json(
      { error: "Discover card sets not found" },
      { status: 404 }
    );
  }

  return NextResponse.json(
    { count: discoverSetsCount, sets: discoverSets },
    { status: 200 }
  );
}
