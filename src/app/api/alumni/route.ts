import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET(req: Request) {
    try {
        const { searchParams } = new URL(req.url);
        const batch = searchParams.get("batch");
        const search = searchParams.get("search");

        const alum = await prisma.alumni.findMany({
            where: {
                ...(batch && batch !== "All Batches" && { batch }),
                ...(search && {
                    OR: [
                        { name: { contains: search, mode: 'insensitive' } },
                        { company: { contains: search, mode: 'insensitive' } }
                    ]
                })
            },
            orderBy: { batch: 'desc' }
        });

        return NextResponse.json(alum);
    } catch (error) {
        console.error("Fetch alumni error:", error);
        return NextResponse.json({ error: "Failed to fetch alumni" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await auth();
        // Allow ADMIN to add or ALUMNI themselves to register (we default to ADMIN authorization here for security)
        if (!session || session.user?.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { name, batch, designation, company, story, photo } = await req.json();

        if (!name || !batch) {
            return NextResponse.json({ error: "Name and Batch are required" }, { status: 400 });
        }

        const newAlumnus = await prisma.alumni.create({
            data: {
                name,
                batch,
                designation,
                company,
                story,
                photo
            }
        });

        return NextResponse.json(newAlumnus, { status: 201 });
    } catch (error) {
        console.error("Create alumni error:", error);
        return NextResponse.json({ error: "Failed to create alumni record" }, { status: 500 });
    }
}
