import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
    try {
        const session = await auth();
        if (session?.user?.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const alum = await prisma.alumni.findMany({
            orderBy: { createdAt: "desc" },
        });

        return NextResponse.json(alum);
    } catch (error) {
        return NextResponse.json({ error: "Failed to fetch alumni" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        const session = await auth();
        if (session?.user?.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const data = await req.json();
        const newAlumnus = await prisma.alumni.create({ data });

        return NextResponse.json(newAlumnus, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to create alumni" }, { status: 500 });
    }
}

export async function PATCH(req: Request) {
    try {
        const session = await auth();
        if (session?.user?.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { id, ...data } = await req.json();
        const updatedAlumnus = await prisma.alumni.update({
            where: { id },
            data,
        });

        return NextResponse.json(updatedAlumnus);
    } catch (error) {
        return NextResponse.json({ error: "Failed to update alumni" }, { status: 500 });
    }
}

export async function DELETE(req: Request) {
    try {
        const session = await auth();
        if (session?.user?.role !== "ADMIN") {
            return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
        }

        const { searchParams } = new URL(req.url);
        const id = searchParams.get("id");

        if (!id) {
            return NextResponse.json({ error: "Missing ID" }, { status: 400 });
        }

        await prisma.alumni.delete({ where: { id } });

        return NextResponse.json({ message: "Alumni deleted" });
    } catch (error) {
        return NextResponse.json({ error: "Failed to delete alumni" }, { status: 500 });
    }
}
