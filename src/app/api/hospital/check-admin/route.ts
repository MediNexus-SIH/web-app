import { NextResponse } from "next/server";
import prisma from "@/config/prisma.config";

export async function POST(req: Request) {
  try {
    const { adminEmail } = await req.json();

    if (!adminEmail || typeof adminEmail !== "string") {
      return NextResponse.json(
        { error: "adminEmail must be a non-empty string." },
        { status: 400 }
      );
    }
    const existingAdmin = await prisma.hospital.findUnique({
      where: {
        admin_email: adminEmail,
      },
    });
    return NextResponse.json({ existingAdmin }, { status: 200 });
  } catch (error) {
    console.error("Error checking existing admin email:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
