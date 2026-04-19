import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";

export async function GET() {
  const session = await auth();
  if (!session || session.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const settings = await prisma.systemSettings.upsert({
      where: { id: "global" },
      update: {},
      create: { id: "global" },
    });
    return NextResponse.json(settings);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch settings" }, { status: 500 });
  }
}

export async function PATCH(req: Request) {
  const session = await auth();
  if (!session || session.user?.role !== "ADMIN") {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await req.json();
    const updated = await prisma.systemSettings.update({
      where: { id: "global" },
      data: {
        departmentName: body.departmentName,
        maintenanceMode: body.maintenanceMode,
        supportEmail: body.supportEmail,
      },
    });
    return NextResponse.json(updated);
  } catch (error) {
    return NextResponse.json({ error: "Update failed" }, { status: 500 });
  }
}
