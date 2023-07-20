import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

//POST: add card to cardset
export async function POST(
  req: NextRequest,
  { params }: { params: { setId: string } }
) {
  const { setId } = params;
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

  const newCard = await prisma.card.create({
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

  if (!newCard) {
    return NextResponse.json(
      { error: "Failed to create card" },
      { status: 400 }
    );
  }

  return NextResponse.json(newCard, { status: 200 });
}
