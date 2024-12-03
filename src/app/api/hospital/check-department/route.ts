import { NextResponse } from "next/server";
import prisma from "@/config/prisma.config";

export async function POST(req: Request) {
  try {
    const { hodEmails } = await req.json();

    if (!Array.isArray(hodEmails) || hodEmails.length === 0) {
      return NextResponse.json(
        { error: "hodEmails must be a non-empty array." },
        { status: 400 }
      );
    }
    const existingDepartments = await prisma.departments.findMany({
      where: {
        hod_email: {
          in: hodEmails,
        },
      },
    });

    return NextResponse.json({ existingDepartments }, { status: 200 });
  } catch (error) {
    console.error("Error checking existing departments:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    );
  }
}
