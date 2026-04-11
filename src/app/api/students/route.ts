import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const batch = searchParams.get("batch");

        const students = await prisma.studentProfile.findMany({
            where: batch ? { batch } : undefined,
            include: {
                user: {
                    select: { name: true, email: true, image: true, role: true }
                }
            }
        });

        const formattedStudents = students.map((s) => ({
            id: s.id,
            userId: s.userId,
            studentId: s.studentId,
            name: s.user.name,
            email: s.user.email,
            image: s.user.image,
            batch: s.batch,
            section: s.section,
            cgpa: s.cgpa,
            bio: s.bio,
        }));

        return NextResponse.json(formattedStudents);
    } catch (error) {
        console.error("Fetch students error:", error);
        return NextResponse.json({ error: "Failed to fetch student list" }, { status: 500 });
    }
}
