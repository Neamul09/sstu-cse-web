import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const semester = searchParams.get("semester");

        const courses = await prisma.course.findMany({
            where: semester ? { semester: parseInt(semester) } : undefined,
            orderBy: [
                { semester: "asc" },
                { code: "asc" }
            ]
        });

        return NextResponse.json(courses);
    } catch (error) {
        console.error("Fetch courses error:", error);
        return NextResponse.json({ error: "Failed to fetch courses" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await auth();
        if (!session || session.user?.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized. Admin only." }, { status: 401 });
        }

        const { code, name, credits, semester, syllabusUrl } = await req.json();

        if (!code || !name || !credits || !semester) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const course = await prisma.course.create({
            data: {
                code: code.toUpperCase(),
                name,
                credits: parseFloat(credits),
                semester: parseInt(semester),
                syllabusUrl
            }
        });

        return NextResponse.json(course, { status: 201 });
    } catch (error) {
        console.error("Create course error:", error);
        return NextResponse.json({ error: "Failed to create course" }, { status: 500 });
    }
}
