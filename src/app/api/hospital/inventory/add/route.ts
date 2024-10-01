// pages/api/inventory/index.ts

import { NextResponse } from "next/server";
import { PrismaClient } from "@prisma/client";
import { getServerSession } from "next-auth";
import { getServerSideProps } from "@/hooks/getServerSideProps";

const prisma = new PrismaClient();

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

  const {
    department_id,
    item_name,
    batch_number,
    expiry_date,
    quantity,
    unit_price,
  } = await req.json();

  // Validate input
  if (
    !department_id ||
    !item_name ||
    !batch_number ||
    !expiry_date ||
    !quantity ||
    !unit_price
  ) {
    return NextResponse.json(
      { error: "All fields are required." },
      { status: 400 }
    );
  }
  //Hospital Check
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

    //Department Check
    const department = await prisma.departments.findFirst({
      where: {
        id: department_id,
        hospital_id: hospital.id,
      },
    });

    if (!department) {
      return NextResponse.json(
        { error: "Invalid department for this hospital" },
        { status: 400 }
      );
    }

   const newItem = await prisma.medicalInventory.create({
     data: {
       department: { connect: { id: department_id } },
       hospital: { connect: { id: hospital.id } },
       item_name,
       batch_number,
       expiry_date: new Date(expiry_date),
       quantity,
       unit_price,
     },
   });

    return NextResponse.json(newItem, { status: 201 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Unable to add inventory item." },
      { status: 500 }
    );
  }
}

// GET method to retrieve all inventory items
export async function GET() {
  try {
    const items = await prisma.medicalInventory.findMany();
    return NextResponse.json(items, { status: 200 });
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Unable to retrieve inventory items." },
      { status: 500 }
    );
  }
}
