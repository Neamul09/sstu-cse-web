import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();
  if (!session || session.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const faculty = await prisma.user.findMany({
      where: { role: "TEACHER" },
      include: { teacherProfile: true },
    });
    return NextResponse.json(faculty);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch faculty" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const session = await auth();
  if (!session || session.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const { id, name, email, designation, officeHours, researchInterests } = await req.json();
    
    // Update User and TeacherProfile in a transaction
    const updatedFaculty = await prisma.$transaction([
      prisma.user.update({
        where: { id },
        data: { name, email },
      }),
      prisma.teacherProfile.upsert({
        where: { userId: id },
        update: { designation, officeHours, researchInterests },
        create: { userId: id, designation, officeHours, researchInterests },
      }),
    ]);
    
    return NextResponse.json(updatedFaculty[1]);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to update faculty profile" }, { status: 500 });
  }
}
