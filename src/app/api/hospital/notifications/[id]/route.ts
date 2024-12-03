import prisma from "@/config/prisma.config";
import { NextResponse } from "next/server";

import { NotificationStatus } from "@/lib/NotiEnums";

export async function PUT(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    // Parse the request body
    const body = await req.json();
    const { status } = body;

    // Validate status
    if (!["READ", "UNREAD"].includes(status)) {
      return NextResponse.json(
        { error: "Invalid status. Use READ or UNREAD." },
        { status: 400 }
      );
    }

    // Fetch the current notification data to check its current status
    const currentNotification = await prisma.notification.findUnique({
      where: { id },
    });

    // If notification doesn't exist
    if (!currentNotification) {
      return NextResponse.json(
        { error: "Notification not found." },
        { status: 404 }
      );
    }

    // Prepare the update data
    const updateData: any = {};

    // Always update the status field
    updateData.status = status;

    // Update the 'read_at' field based on the status change
    if (status === "READ") {
      updateData.read_at = new Date(); // Set 'read_at' to current timestamp if status is 'READ'
    } else if (status === "UNREAD") {
      updateData.read_at = null; // Set 'read_at' to null if status is 'UNREAD'
    }

    // If the status is the same as the current status and read_at doesn't need to be updated, return early
    if (
      currentNotification.status === status &&
      ((status === "READ" && currentNotification.read_at) ||
        (status === "UNREAD" && !currentNotification.read_at))
    ) {
      return NextResponse.json(currentNotification, { status: 200 });
    }

    // Update the notification with the new 'status' and 'read_at' value
    const updatedNotification = await prisma.notification.update({
      where: { id },
      data: updateData,
    });

    return NextResponse.json(updatedNotification, { status: 200 });
  } catch (error: any) {
    console.error(error);

    if (error.code === "P2025") {
      return NextResponse.json(
        { error: "Notification not found." },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        error: "Internal Server Error",
        details: error.message,
      },
      {
        status: 500,
      }
    );
  }
}



export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const { id } = params;

  try {
    // Attempt to delete the notification by ID
    await prisma.notification.delete({
      where: { id },
    });

    return new Response(null, { status: 204 }); // No Content
  } catch (error: any) {
    console.error(error);

    // Prisma error handling for record not found
    if (error.code === "P2025") {
      return new Response(
        JSON.stringify({ error: "Notification not found." }),
        { status: 404, headers: { "Content-Type": "application/json" } }
      );
    }

    // Handle other unexpected errors
    return NextResponse.json(
      {
        error: "Internal Server Error",
        details: error.message,
      },
      {
        status: 500,
        headers: { "Content-Type": "application/json" },
      }
    );
  }
}
