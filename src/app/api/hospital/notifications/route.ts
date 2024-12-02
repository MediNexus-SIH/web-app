import prisma from "@/config/prisma.config";
import validateSession from "@/lib/validateSession";
import { subMonths } from "date-fns";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const oneMonthAgo = subMonths(new Date(), 1);
    const notifications = await prisma.notification.findMany({
      where: {
        created_at: {
          gte: oneMonthAgo,
        },
      },
      orderBy: {
        created_at: "desc",
      },
    });

    return new Response(JSON.stringify(notifications), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error: any) {
    console.error(error);
    return new Response(
      JSON.stringify({
        error: "Internal Server Error",
        details: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}

export async function POST(req: Request) {
  try {
    // Parse the request body
    const body = await req.json();
    const sessionResult = await validateSession();
    const hospitalName = sessionResult.hospitalName;

    try {
      const { type, message, status } = body;
      const hospital = await prisma.hospital.findFirst({
        where: { hospitalName },
      });

      if (!hospital) {
        return NextResponse.json(
          { error: "Hospital not found" },
          { status: 404 }
        );
      }

      // Validate required fields
      if (!type || !message) {
        return new Response(
          JSON.stringify({ error: "Type and message are required." }),
          { status: 400, headers: { "Content-Type": "application/json" } }
        );
      }
      const newNotification = await prisma.notification.create({
        data: {
          hospital_id: hospital.id,
          type,
          message,
          status: status || "UNREAD", // Default to UNREAD if not provided
        },
      });
      return NextResponse.json(newNotification, { status: 201 });
    } catch (err) {}

    // Create a new notification
  } catch (error: any) {
    console.error(error);
    return new Response(
      JSON.stringify({
        error: "Internal Server Error",
        details: error.message,
      }),
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
