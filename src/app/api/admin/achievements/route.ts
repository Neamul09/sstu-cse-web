import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();
  if (!session || session.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const achievements = await prisma.achievement.findMany({
      orderBy: { date: "desc" },
    });
    return NextResponse.json(achievements);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch achievements" }, { status: 500 });
  }
}

export async function POST(req: Request) {
  const session = await auth();
  if (!session || session.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { title, description, date, category } = await req.json();
    const achievement = await prisma.achievement.create({
      data: {
        title,
        description,
        date: new Date(date),
        category,
      },
    });
    return NextResponse.json(achievement);
  } catch (error) {
    return NextResponse.json({ error: "Failed to create achievement" }, { status: 500 });
  }
}

export async function DELETE(req: Request) {
  const session = await auth();
  if (!session || session.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

  try {
    await prisma.achievement.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Delete failed" }, { status: 500 });
  }
}
