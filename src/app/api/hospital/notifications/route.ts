import prisma from "@/config/prisma.config";
import { periodicInventoryCheck } from "@/lib/utils/inventoryCheck";
import validateSession from "@/lib/validateSession";
import NotificationSchema from "@/lib/zodSchema/notiSchema";
import { subMonths } from "date-fns";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    // Validate session and get hospital details
    const sessionResult = await validateSession();
    const hospitalName = sessionResult.hospitalName;

    // Fetch the hospital by name
    const hospital = await prisma.hospital.findFirst({
      where: { hospitalName },
    });

    if (!hospital) {
      return NextResponse.json(
        { error: "Hospital not found" },
        { status: 404 }
      );
    }

    // Run the periodic inventory check
    await periodicInventoryCheck();

    const oneMonthAgo = subMonths(new Date(), 1);
    const notifications = await prisma.notification.findMany({
      where: {
        hospital_id: hospital.id,
        created_at: {
          gte: oneMonthAgo,
        },
      },
      orderBy: {
        created_at: "desc",
      },
      include: {
        department: {
          select: {
            department: true,
          },
        },
      },
    });

    return NextResponse.json({ notifications }, { status: 200 });
  } catch (error: any) {
    console.error(error);
    return NextResponse.json(
      {
        error: "Internal Server Error",
        details: error.message,
      },
      { status: 500 }
    );
  }
}
export async function POST(req: Request) {
  try {
    // Parse and validate the request body
    const body = await req.json();
    const parsedBody = NotificationSchema.parse(body);

    // Validate session and get hospital details
    const sessionResult = await validateSession();
    const hospitalName = sessionResult.hospitalName;

    // Fetch the hospital by name
    const hospital = await prisma.hospital.findFirst({
      where: { hospitalName },
    });

    if (!hospital) {
      return NextResponse.json(
        { error: "Hospital not found" },
        { status: 404 }
      );
    }

    // Create a new notification in the database
    const newNotification = await prisma.notification.create({
      data: {
        hospital_id: hospital.id,
        department_id: parsedBody.department_id,
        type: parsedBody.type,
        message: parsedBody.message,
        status: parsedBody.status || "UNREAD",
        inventory_id: parsedBody.inventory_id,
        item_name: parsedBody.item_name,
        current_quantity: parsedBody.current_quantity,
        threshold_quantity: parsedBody.threshold_quantity,
        expiry_date: parsedBody.expiry_date,
      },
    });

    // Return the newly created notification
    return NextResponse.json(newNotification, { status: 201 });
  } catch (error: any) {
    console.error("Error creating notification:", error);

    if (error.name === "ZodError") {
      // Handle validation errors
      return NextResponse.json(
        { error: "Validation Error", details: error.errors },
        { status: 400 }
      );
    } else {
      // Handle general errors
      return NextResponse.json({
        error: "Internal Server Error",
        details: error.message,
      });
    }
  }
}
