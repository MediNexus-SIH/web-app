import { NextResponse } from "next/server";
import prisma from "@/config/prisma.config";

export async function POST(req: Request) {
  try {
    const { hospitalName, addressLine1, contact_number } = await req.json();

    if (!hospitalName || !addressLine1 || !contact_number) {
      return NextResponse.json(
        {
          error: "hospitalName, addressLine1, and contact_number are required.",
        },
        { status: 400 }
      );
    }
    const existingHospital = await prisma.hospital.findFirst({
      where: {
        OR: [
          {
            hospitalName: hospitalName,
            address_line_1: addressLine1,
          },
          {
            contact_number: contact_number,
          },
        ],
      },
    });
    return NextResponse.json({ existingHospital }, { status: 200 });
  } catch (error) {
    console.error("Error checking for existing hospital:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
