import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const type = searchParams.get("type"); // STUDENT, FACULTY, MILESTONE

        const achievements = await prisma.achievement.findMany({
            where: type ? { type: type.toUpperCase() as any } : undefined,
            orderBy: { date: "desc" }
        });

        return NextResponse.json(achievements);
    } catch (error) {
        console.error("Fetch achievements error:", error);
        return NextResponse.json({ error: "Failed to fetch achievements" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session || session.user?.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized. Admin only." }, { status: 401 });
        }

        const { title, description, type, date, imageUrl } = await req.json();

        if (!title || !description || !type || !date) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const achievement = await prisma.achievement.create({
            data: {
                title,
                description,
                type: type.toUpperCase(),
                date: new Date(date),
                imageUrl
            }
        });

        return NextResponse.json(achievement, { status: 201 });
    } catch (error) {
        console.error("Create achievement error:", error);
        return NextResponse.json({ error: "Failed to create achievement" }, { status: 500 });
    }
}
