import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
//GET: cardset by id
export async function GET(
  req: NextRequest,
  { params }: { params: { setId: string } }
) {
  const { setId } = params;
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  const cardSet = await prisma.cardSet.findUnique({
    where: {
      id: setId,
    },
    select: {
      id: true,
      creatorId: true,
      name: true,
      imageUrl: true,
      _count: {
        select: {
          cards: true,
        },
      },
      cards: {
        select: {
          id: true,
          frontText: true,
          backText: true,
        },
        orderBy: {
          createdAt: "asc",
        },
      },
    },
  });

  if (!cardSet) {
    return NextResponse.json({ error: "Card set not found" }, { status: 404 });
  }

  let savedByUser;
  if (userId) {
    savedByUser = await prisma.savedCardSets.findUnique({
      where: {
        cardSetId_userId: {
          cardSetId: cardSet.id,
          userId,
        },
      },
    });
  }

  let editedCardSet;
  if (savedByUser) {
    editedCardSet = {
      ...cardSet,
      saved: true,
    };
  }

  const finalCardSet = editedCardSet || cardSet;

  return NextResponse.json(finalCardSet, { status: 200 });
}

//DELETE: cardset by id, ONLY if user is creator
export async function DELETE(
  req: NextRequest,
  { params }: { params: { setId: string } }
) {
  const { setId } = params;
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  if (!userId) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  const cardSet = await prisma.cardSet.findUnique({
    where: {
      id: setId,
    },
  });
  if (!cardSet) {
    return NextResponse.json({ error: "Card set not found" }, { status: 404 });
  }

  if (cardSet.creatorId !== userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  await prisma.cardSet.delete({
    where: {
      id: setId,
      creatorId: userId,
    },
  });

  return NextResponse.json(
    { message: "Successfully deleted card set" },
    { status: 200 }
  );
}

//PATCH: Edit card set name
export async function PATCH(
  req: NextRequest,
  { params }: { params: { setId: string } }
) {
  const { setId } = params;
  const { setName } = await req.json();
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  if (!userId) {
    return NextResponse.json({ error: "Not logged in" }, { status: 401 });
  }

  const cardSet = await prisma.cardSet.findUnique({
    where: {
      id: setId,
    },
  });
  if (!cardSet) {
    return NextResponse.json({ error: "Card set not found" }, { status: 404 });
  }

  if (cardSet.creatorId !== userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const updatedCardSet = await prisma.cardSet.update({
    where: {
      id: setId,
    },
    data: {
      name: setName,
    },
    select: {
      id: true,
      name: true,
      imageUrl: true,
      _count: {
        select: {
          cards: true,
        },
      },
      cards: {
        select: {
          id: true,
          frontText: true,
          backText: true,
        },
      },
    },
  });

  if (!updatedCardSet) {
    return NextResponse.json(
      { error: "Failed to update card set" },
      { status: 400 }
    );
  }

  return NextResponse.json(updatedCardSet, { status: 200 });
}
