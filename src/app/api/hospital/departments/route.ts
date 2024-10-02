import prisma from "@/config/prisma.config";
import { getServerSideProps } from "@/hooks/getServerSideProps";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req:NextRequest) {
  const session = await getServerSideProps();

  const userSession = session.user;
  if (!session.sessionStatus || !userSession) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  const { id: userId, hospitalName, email: userEmail } = userSession.user!;

  if (!userId || !hospitalName) {
    return NextResponse.json(
      { error: "Invalid session data" },
      { status: 401 }
    );
  }
  const hospitalId = session.user.user.id
  
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
        hospital_id: String(hospitalId),
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
