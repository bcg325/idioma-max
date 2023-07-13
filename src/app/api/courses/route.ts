import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const res = await prisma.course.findMany({
    select: {
      id: true,
      name: true,
      description: true,
    },
  });
  return NextResponse.json(res);
}
