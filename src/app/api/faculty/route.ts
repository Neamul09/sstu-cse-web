import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET() {
    try {
        const facultyMembers = await prisma.teacherProfile.findMany({
            include: {
                user: {
                    select: { name: true, email: true, image: true, role: true }
                }
            }
        });

        // Flatten the nested user object directly into the returned result for easier frontend consumption
        const formattedFaculty = facultyMembers.map((member) => ({
            id: member.id,
            userId: member.userId,
            name: member.user.name,
            email: member.user.email,
            image: member.user.image,
            designation: member.designation,
            officeHours: member.officeHours,
            researchInterests: member.researchInterests,
            publications: member.publications ? JSON.parse(member.publications) : [],
        }));

        return NextResponse.json(formattedFaculty);
    } catch (error) {
        console.error("Fetch faculty error:", error);
        return NextResponse.json({ error: "Failed to fetch faculty list" }, { status: 500 });
    }
}
