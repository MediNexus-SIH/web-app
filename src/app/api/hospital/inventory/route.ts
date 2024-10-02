import { NextResponse } from "next/server";
import { getServerSideProps } from "@/hooks/getServerSideProps";
import prisma from "@/config/prisma.config";

// POST method to add an inventory item
export async function POST(req: Request) {
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

  const items = await req.json(); // Expecting an array of items

  // Validate input
  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json(
      { error: "Items array is required." },
      { status: 400 }
    );
  }

  // Hospital Check
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

    // Prepare the data for createMany
    const inventoryData = [];
    for (const item of items) {
      const {
        department, // Use department instead of department_id
        item_name,
        batch_number,
        expiry_date,
        quantity,
        unit_price,
      } = item;

      // Validate each item
      if (
        !department ||
        !item_name ||
        !batch_number ||
        !expiry_date ||
        !quantity ||
        !unit_price
      ) {
        return NextResponse.json(
          { error: "All fields are required for each item." },
          { status: 400 }
        );
      }

      // Fetch department_id based on department name
      const departmentRecord = await prisma.departments.findFirst({
        where: {
          department: department, // Fetch by department name
          hospital_id: hospital.id,
        },
      });

      if (!departmentRecord) {
        return NextResponse.json(
          { error: `Invalid department for hospital ${hospitalName}` },
          { status: 400 }
        );
      }

      // Push the item data to inventoryData
      inventoryData.push({
        department_id: departmentRecord.id, // Use the fetched department_id
        hospital_id: hospital.id, // Use the hospital's ID directly
        item_name,
        batch_number,
        expiry_date: new Date(expiry_date),
        quantity,
        unit_price,
      });
    }

    // Create multiple inventory items
    const newItems = await prisma.medicalInventory.createMany({
      data: inventoryData,
    });

    return NextResponse.json(newItems, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Unable to add inventory items." },
      { status: 500 }
    );
  }
}


// GET method to retrieve all inventory items
export async function GET() {
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

  try {
    const items = await prisma.medicalInventory.findMany({
      where: {
        hospital_id: userSession.user.id,
      },
    });
    return NextResponse.json(items, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Unable to retrieve inventory items." },
      { status: 500 }
    );
  }
}
