import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

interface CardSetInfo {
  id: string;
  name: string;
  createdAt: Date;
  _count: {
    cards: number;
  };
}
export async function GET(
  req: NextRequest,
  { params }: { params: { courseId: string } }
) {
  const { courseId } = params;
  const { searchParams } = new URL(req.url);
  const limit = searchParams.get("limit");
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;
  if (!userId) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  const userCreatedSetsCount = await prisma.cardSet.count({
    where: {
      creatorId: userId,
      courseId,
    },
  });
  const userCreatedSets = await prisma.cardSet.findMany({
    where: {
      creatorId: userId,
      courseId,
    },
    take: limit ? +limit : undefined,
    select: {
      id: true,
      name: true,
      createdAt: true,
      imageUrl: true,
      _count: {
        select: {
          cards: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const userSavedSetsCount = await prisma.savedCardSets.count({
    where: {
      userId,
      cardSet: {
        courseId,
      },
    },
  });

  const userSavedSets = await prisma.savedCardSets.findMany({
    where: {
      userId,
      cardSet: {
        courseId,
      },
    },
    take: limit ? +limit : undefined,
    select: {
      createdAt: true,
      cardSet: {
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
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  let userSaved: CardSetInfo[] = [];
  if (userSavedSets) {
    userSaved = userSavedSets.map((savedSet) => {
      return {
        ...savedSet.cardSet,
        _count: savedSet.cardSet._count,
        createdAt: savedSet.createdAt,
      };
    });
  }

  const userCreated = (userCreatedSets as CardSetInfo[]) || [];

  const sortedUserSets = userCreated.concat(userSaved).sort((a, b) => {
    const dateA = new Date(a.createdAt).getTime();
    const dateB = new Date(b.createdAt).getTime();
    return dateB - dateA;
  });

  let userSets = {
    count: userCreatedSetsCount + userSavedSetsCount,
    sets: limit ? sortedUserSets.slice(0, +limit) : sortedUserSets,
  };

  return NextResponse.json(userSets, { status: 200 });
}
