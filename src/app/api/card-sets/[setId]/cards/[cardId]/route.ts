import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

//PATCH: update card in cardset
export async function PATCH(
  req: NextRequest,
  { params }: { params: { setId: string; cardId: string } }
) {
  const { setId, cardId } = params;
  const { frontText, backText } = await req.json();
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  if (!frontText || !backText) {
    return NextResponse.json({ error: "Invalid fields" });
  }

  if (!userId) {
    return NextResponse.json({ error: "Not logged in" }, { status: 400 });
  }

  const cardSet = await prisma.cardSet.findUnique({
    where: {
      id: setId,
    },
  });

  if (cardSet?.creatorId !== userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 400 });
  }

  const updatedCard = await prisma.card.update({
    where: {
      id: cardId,
    },
    data: {
      setId,
      frontText,
      backText,
    },
    select: {
      id: true,
      frontText: true,
      backText: true,
    },
  });

  if (!updatedCard) {
    return NextResponse.json(
      { error: "Failed to update card" },
      { status: 400 }
    );
  }

  return NextResponse.json(updatedCard, { status: 200 });
}

//DELETE: remove card from cardset
export async function DELETE(
  req: NextRequest,
  { params }: { params: { setId: string; cardId: string } }
) {
  const { setId, cardId } = params;
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  if (!userId) {
    return NextResponse.json({ error: "Not logged in" }, { status: 400 });
  }

  const cardSet = await prisma.cardSet.findUnique({
    where: {
      id: setId,
    },
  });

  if (cardSet?.creatorId !== userId) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 400 });
  }

  const deletedCard = await prisma.card.delete({
    where: {
      id: cardId,
    },
  });

  if (!deletedCard) {
    return NextResponse.json(
      { error: "Failed to delete card" },
      { status: 400 }
    );
  }

  return NextResponse.json({ id: deletedCard.id }, { status: 200 });
}
