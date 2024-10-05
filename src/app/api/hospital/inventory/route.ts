import { NextResponse } from "next/server";
import prisma from "@/config/prisma.config";
import validateSession from "@/lib/validateSession";

// POST method to add an inventory item
export async function POST(req: Request) {
  const sessionResult = await validateSession();
  if ("error" in sessionResult) {
    return NextResponse.json(
      { error: sessionResult.error },
      { status: sessionResult.status }
    );
  }
  const { hospitalName } = sessionResult;

  const items = await req.json();

  if (!Array.isArray(items) || items.length === 0) {
    return NextResponse.json(
      { error: "Items array is required." },
      { status: 400 }
    );
  }

  try {
    const hospital = await prisma.hospital.findFirst({
      where: { hospitalName },
    });

    if (!hospital) {
      return NextResponse.json(
        { error: "Hospital not found" },
        { status: 404 }
      );
    }

    const inventoryData = [];
    for (const item of items) {
      const {
        department,
        item_name,
        batch_number,
        expiry_date,
        quantity,
        unit_price,
        supplier,
        category,
      } = item;

      if (
        !department ||
        !item_name ||
        !batch_number ||
        !expiry_date ||
        !quantity ||
        !unit_price ||
        !supplier ||
        !category
      ) {
        return NextResponse.json(
          { error: "All fields are required for each item." },
          { status: 400 }
        );
      }

      const departmentRecord = await prisma.departments.findFirst({
        where: {
          department,
          hospital_id: hospital.id,
        },
      });

      if (!departmentRecord) {
        return NextResponse.json(
          { error: `Invalid department for hospital ${hospitalName}` },
          { status: 400 }
        );
      }

      // Create or update the Item
      const existingItem = await prisma.item.upsert({
        where: { item_name_supplier: { item_name, supplier } },
        update: { unit_price, category },
        create: { item_name, unit_price, supplier, category },
      });

      // Create the MedicalInventory entry
      inventoryData.push({
        department_id: departmentRecord.id,
        hospital_id: hospital.id,
        item_id: existingItem.item_id,
        batch_number,
        expiry_date: new Date(expiry_date),
        quantity,
      });
    }

    // Bulk insert inventory data
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
  const sessionResult = await validateSession();
  if ("error" in sessionResult) {
    return NextResponse.json(
      { error: sessionResult.error },
      { status: sessionResult.status }
    );
  }
  const { userId } = sessionResult;

  try {
    const items = await prisma.medicalInventory.findMany({
      where: {
        hospital_id: userId,
      },
      include: {
        department: {
          select: {
            department: true,
          },
        },
        item: true,
      },
    });

    const flattenedItems = items.map((item) => ({
      id: item.id,
      department_id: item.department_id,
      hospital_id: item.hospital_id,
      item_id: item.item_id,
      item_name: item.item.item_name,
      description: item.item.description,
      batch_number: item.batch_number,
      expiry_date: item.expiry_date,
      quantity: item.quantity,
      unit_price: item.item.unit_price,
      supplier: item.item.supplier,
      category: item.item.category,
      department: item.department.department,
    }));

    return NextResponse.json(flattenedItems, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Unable to retrieve inventory items." },
      { status: 500 }
    );
  }
}
