import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(req: Request) {
    try {
        const session = await auth();
        if (!session?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 });

        const { searchParams } = new URL(req.url);
        const courseId = searchParams.get("courseId");
        const date = searchParams.get("date");

        const attendanceRecords = await prisma.attendance.findMany({
            where: {
                ...(courseId && { courseId }),
                ...(date && { date: new Date(date) }),
                // If a Student is fetching, only return their own attendance
                ...(session.user.role === "STUDENT" ? { student: { userId: session.user.id } } : undefined)
            },
            include: {
                student: {
                    select: {
                        studentId: true,
                        user: { select: { name: true } }
                    }
                }
            },
            orderBy: { date: "desc" }
        });

        return NextResponse.json(attendanceRecords);
    } catch (error) {
        console.error("Fetch attendance error:", error);
        return NextResponse.json({ error: "Failed to fetch attendance" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await auth();
        // Only Teachers, Admins, and CRs can mark attendance
        if (!session || !["ADMIN", "TEACHER", "CR"].includes(session.user?.role)) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { courseId, studentProfileId, date, status } = await req.json();

        if (!courseId || !studentProfileId || !date || !status) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const attendance = await prisma.attendance.create({
            data: {
                courseId,
                studentId: studentProfileId,
                date: new Date(date),
                status: status.toUpperCase()
            }
        });

        return NextResponse.json(attendance, { status: 201 });
    } catch (error) {
        console.error("Mark attendance error:", error);
        return NextResponse.json({ error: "Failed to mark attendance" }, { status: 500 });
    }
}
