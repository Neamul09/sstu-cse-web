import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const courseId = searchParams.get("courseId");
        const type = searchParams.get("type"); // VIDEO, NOTES, LINK

        const materials = await prisma.material.findMany({
            where: {
                ...(courseId && { courseId }),
                ...(type && { type: type.toUpperCase() as any })
            },
            include: {
                course: { select: { code: true, name: true } },
                uploader: { select: { name: true } }
            },
            orderBy: { createdAt: "desc" }
        });

        return NextResponse.json(materials);
    } catch (error) {
        console.error("Fetch materials error:", error);
        return NextResponse.json({ error: "Failed to fetch materials" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await auth();
        // Only Teachers and Admins can upload materials
        if (!session || !["ADMIN", "TEACHER"].includes(session.user?.role)) {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { title, type, url, courseId } = await req.json();

        if (!title || !type || !url || !courseId) {
            return NextResponse.json({ error: "Missing required fields" }, { status: 400 });
        }

        const material = await prisma.material.create({
            data: {
                title,
                type: type.toUpperCase(),
                url,
                courseId,
                uploaderId: session.user.id
            }
        });

        return NextResponse.json(material, { status: 201 });
    } catch (error) {
        console.error("Upload material error:", error);
        return NextResponse.json({ error: "Failed to upload material" }, { status: 500 });
    }
}
