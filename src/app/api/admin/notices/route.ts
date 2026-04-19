import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

// GET all notices for admin table
export async function GET() {
  const session = await auth();
  if (!session || session.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const notices = await prisma.notice.findMany({
      orderBy: { createdAt: "desc" },
    });
    return NextResponse.json(notices);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch notices" }, { status: 500 });
  }
}

// POST a new notice
export async function POST(req: Request) {
  const session = await auth();
  if (!session || session.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { title, body, category, pinned } = await req.json();
    const notice = await prisma.notice.create({
      data: {
        title,
        body,
        category,
        pinned: pinned || false,
        authorId: session.user.id!,
      },
    });
    return NextResponse.json(notice);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to create notice" }, { status: 500 });
  }
}

// DELETE a notice
export async function DELETE(req: Request) {
  const session = await auth();
  if (!session || session.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { searchParams } = new URL(req.url);
  const id = searchParams.get("id");

  if (!id) return NextResponse.json({ error: "Missing ID" }, { status: 400 });

  try {
    await prisma.notice.delete({ where: { id } });
    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete notice" }, { status: 500 });
  }
}
