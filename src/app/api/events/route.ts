import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
    try {
        const events = await prisma.event.findMany({
            orderBy: { date: "asc" },
        });
        return NextResponse.json(events);
    } catch (error) {
        console.error("Fetch events error:", error);
        return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session?.user || !["ADMIN", "TEACHER", "CR"].includes(session.user.role)) {
            return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
        }

        const body = await req.json();
        const { title, description, date, imageUrl, category } = body;

        if (!title || !description || !date) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const event = await prisma.event.create({
            data: {
                title,
                description,
                date: new Date(date),
                imageUrl,
                category,
            }
        });

        return NextResponse.json(event, { status: 201 });
    } catch (error) {
        console.error("Create event error:", error);
        return NextResponse.json({ error: "Failed to create event" }, { status: 500 });
    }
}
