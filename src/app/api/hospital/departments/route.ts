import prisma from "@/config/prisma.config";
import validateSession from "@/lib/validateSession";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
  const { userId, hospitalName, email } = await validateSession();

  try {
    const hospital = await prisma.hospital.findFirst({
      where: { hospitalName: hospitalName },
    });

    if (!hospital) {
      return NextResponse.json(
        { error: "Hospital not found" },
        { status: 404 }
      );
    }
    const departments = await prisma.departments.findMany({
      where: {
        hospital_id: String(userId),
      },
    });

    if (!departments) {
      return NextResponse.json(
        { message: "Departments not found" },
        { status: 404 }
      );
    }
    return NextResponse.json(departments, { status: 200 });
  } catch (error) {
    NextResponse.json({ message: "Internal server error" }, { status: 500 });
  }
}
