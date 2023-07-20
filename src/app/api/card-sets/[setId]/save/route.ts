import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/db";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
//POST: save cardset to user

export async function POST(
  req: NextRequest,
  { params }: { params: { setId: string } }
) {
  const { setId } = params;
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  if (!userId) {
    return NextResponse.json({ error: "Not logged in" }, { status: 400 });
  }

  const savedCardSet = await prisma.savedCardSets.create({
    data: {
      userId,
      cardSetId: setId,
    },
  });

  if (!savedCardSet) {
    return NextResponse.json({ error: "Failed to save card" }, { status: 400 });
  }

  return NextResponse.json(
    { message: "Successfully saved card set" },
    { status: 200 }
  );
}

//DELETE: remove saved cardset
export async function DELETE(
  req: NextRequest,
  { params }: { params: { setId: string } }
) {
  const { setId } = params;
  const session = await getServerSession(authOptions);
  const userId = session?.user.id;

  if (!userId) {
    return NextResponse.json({ error: "Not logged in" }, { status: 400 });
  }

  const savedCardSet = await prisma.savedCardSets.delete({
    where: {
      cardSetId_userId: {
        cardSetId: setId,
        userId,
      },
    },
  });

  if (!savedCardSet) {
    return NextResponse.json(
      { error: "Failed to unsave card set" },
      { status: 400 }
    );
  }
  return NextResponse.json(
    { message: "Successfully unsaved card set" },
    { status: 200 }
  );
}
