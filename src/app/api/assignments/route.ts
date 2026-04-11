import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(req: Request) {
    try {
        const session = await auth();
        if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { searchParams } = new URL(req.url);
        const courseId = searchParams.get("courseId");

        const assignments = await prisma.assignment.findMany({
            where: courseId ? { courseId } : undefined,
            include: {
                course: { select: { code: true } },
                // For Students, we might want to attach their specific submissions
                submissions: session.user.role === "STUDENT" ? {
                    where: { studentId: session.user.id }
                } : true
            },
            orderBy: { dueDate: "asc" }
        });

        return NextResponse.json(assignments);
    } catch (error) {
        console.error("Fetch assignments error:", error);
        return NextResponse.json({ error: "Failed to fetch assignments" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await auth();
        // Only Teachers and Admins can create assignments
        if (!session || !["ADMIN", "TEACHER"].includes(session.user?.role)) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { title, description, dueDate, courseId } = await req.json();

        if (!title || !dueDate || !courseId) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const assignment = await prisma.assignment.create({
            data: {
                title,
                description,
                dueDate: new Date(dueDate),
                courseId,
                creatorId: session.user.id
            }
        });

        return NextResponse.json(assignment, { status: 201 });
    } catch (error) {
        console.error("Create assignment error:", error);
        return NextResponse.json({ error: "Failed to create assignment" }, { status: 500 });
    }
}
