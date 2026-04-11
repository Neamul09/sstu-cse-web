import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const category = searchParams.get("category");

        // Convert to uppercase since enum is uppercase
        const validCategory = category ? category.toUpperCase() : undefined;

        const notices = await prisma.notice.findMany({
            where: validCategory ? { category: validCategory as any } : undefined,
            orderBy: { createdAt: "desc" },
            include: {
                author: {
                    select: { name: true, role: true }
                }
            }
        });

        return NextResponse.json(notices);
    } catch (error) {
        console.error("Fetch notices error:", error);
        return NextResponse.json({ error: "Failed to fetch notices" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session?.user || !["ADMIN", "TEACHER", "CR"].includes(session.user.role)) {
            return NextResponse.json({ error: "Unauthorized. Only Admins, Teachers, and CRs can post notices." }, { status: 401 });
        }

        const body = await req.json();
        const { title, content, category, pinned } = body;

        if (!title || !content) {
            return NextResponse.json({ error: "Title and content are required" }, { status: 400 });
        }

        const notice = await prisma.notice.create({
            data: {
                title,
                body: content,
                category: category || "GENERAL",
                pinned: pinned || false,
                authorId: session.user.id,
            }
        });

        return NextResponse.json(notice, { status: 201 });
    } catch (error) {
        console.error("Create notice error:", error);
        return NextResponse.json({ error: "Failed to create notice" }, { status: 500 });
    }
}
