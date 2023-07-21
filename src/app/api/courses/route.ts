import { prisma } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  const courses = await prisma.course.findMany({
    select: {
      id: true,
      name: true,
      description: true,
      fromLanguage: {
        select: {
          locale: true,
        },
      },
      units: {
        orderBy: {
          position: "asc",
        },
        select: {
          id: true,
          name: true,
          description: true,
          lessons: {
            orderBy: {
              position: "asc",
            },
            select: {
              id: true,
              name: true,
              description: true,
            },
          },
        },
      },
    },
  });

  if (!courses) {
    return NextResponse.json({ error: "No courses found" }, { status: 404 });
  }
  return NextResponse.json(courses, { status: 200 });
}
