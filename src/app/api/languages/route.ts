import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const res = await prisma.language.findMany();
  return NextResponse.json(res);
}
