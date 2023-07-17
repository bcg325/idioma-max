import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
export async function GET(
  req: Request,
  { params }: { params: { courseId: string } }
) {
  const { courseId } = params;
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  let userSets;
  if (userId) {
    userSets = await prisma.user.findUnique({
      where: {
        id: userId,
      },
      include: {
        cardSets: {
          where: {
            courseId,
          },
          select: {
            id: true,
            name: true,
            _count: {
              select: {
                cards: true,
              },
            },
          },
        },
        savedCardSets: {
          where: {
            cardSet: {
              courseId,
            },
          },
          select: {
            cardSet: {
              select: {
                id: true,
                name: true,
                _count: {
                  select: {
                    cards: true,
                  },
                },
              },
            },
          },
        },
      },
    });
  }
  const discoverSets = await prisma.cardSet.findMany({
    where: {
      creatorId: "cljq35vem0000vcccn8s8bx2t",
      courseId,
    },
    select: {
      id: true,
      name: true,
      _count: {
        select: {
          cards: true,
        },
      },
    },
  });

  const cardSets = {
    userSets: userSets || [],
    discoverSets: discoverSets,
  };

  console.log(cardSets);

  return NextResponse.json(cardSets);
}
