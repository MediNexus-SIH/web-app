import { NextResponse } from "next/server";
import { OrderStatus } from "@prisma/client";
import prisma from "@/config/prisma.config";
import validateSession from "@/lib/validateSession";

export async function POST(request: Request) {
  const { userId, hospitalName, email } = await validateSession();

  try {
    const body = await request.json();
    const { expected_delivery_date, orderItems } = body;

    // Input validation
    if (
      !expected_delivery_date ||
      !orderItems ||
      !Array.isArray(orderItems) ||
      orderItems.length === 0
    ) {
      return NextResponse.json(
        { error: "Invalid input data" },
        { status: 400 }
      );
    }

    // Initialize total_amount
    let total_amount = 0;

    // Validate each order item and fetch details from Item table
    const validatedOrderItems = [];
    for (const item of orderItems) {
      if (!item.item_id || !item.quantity) {
        return NextResponse.json(
          { error: "Invalid order item data" },
          { status: 400 }
        );
      }

      // Fetch item details from Item table using the item_id
      const fetchedItem = await prisma.item.findUnique({
        where: { item_id: item.item_id },
      });

      if (!fetchedItem) {
        return NextResponse.json(
          { error: `Item with ID ${item.item_id} not found` },
          { status: 404 }
        );
      }

      // Calculate total amount based on quantity and unit_price
      total_amount += fetchedItem.unit_price * item.quantity;

      // Construct validated order item with details fetched from the database
      validatedOrderItems.push({
        item: {
          connect: { item_id: fetchedItem.item_id },
        },
        quantity: item.quantity,
        unit_price: fetchedItem.unit_price, // Fetch the price from the database
      });
    }

    // Create order
    const order = await prisma.order.create({
      data: {
        hospital: {
          connect: { id: userId },
        },
        expected_delivery_date: new Date(expected_delivery_date),
        total_amount, // Use calculated total amount
        payment_status: false,
        status: "PENDING", // Set initial status as per the schema
        orderItems: {
          create: validatedOrderItems, // Use validated order items
        },
      },
      include: {
        orderItems: {
          include: {
            item: true,
          },
        },
        hospital: {
          select: {
            hospitalName: true,
            contact_number: true,
            address_line_1: true,
            address_line_2: true,
            pincode: true,
            region: true,
            state: true,
          },
        },
      },
    });

    return NextResponse.json(order, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Error creating order" },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}



// GET: Fetch all stock replenishment orders
export async function GET() {
  const { userId, hospitalName, email } = await validateSession();
  try {
    const orders = await prisma.order.findMany({
      where: {
        hospital_id: userId,
      },
      include: {
        hospital: {
          select: {
            hospitalName: true,
            contact_number: true,
            address_line_1: true,
            address_line_2: true,
            pincode: true,
            region: true,
            state: true,
          },
        },
        orderItems: {
          include: {
            item: true,
            medicalInventory: true,
          },
        },
      },
    });

    return NextResponse.json(orders, { status: 200 });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Error fetching orders" },
      { status: 500 }
    );
  }
}

// PUT: Update an existing stock replenishment order
export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const body = await request.json();
    const {
      expected_delivery_date,
      status,
      payment_status,
      total_amount,
      orderItems,
    } = body;

    const updatedOrder = await prisma.order.update({
      where: { id },
      data: {
        expected_delivery_date: expected_delivery_date
          ? new Date(expected_delivery_date)
          : undefined,
        status: status,
        payment_status: payment_status,
        total_amount: total_amount,
        orderItems: {
          upsert: orderItems?.map((item: any) => ({
            where: { id: item.id },
            update: {
              quantity: item.quantity,
              unit_price: item.unit_price,
              item: { connect: { item_id: item.item_id } },
            },
            create: {
              quantity: item.quantity,
              unit_price: item.unit_price,
              item: { connect: { item_id: item.item_id } },
            },
          })),
        },
      },
      include: {
        orderItems: {
          include: {
            item: true,
          },
        },
      },
    });

    return NextResponse.json(updatedOrder);
  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json(
      { error: "Error updating order" },
      { status: 500 }
    );
  }
}


// DELETE: Delete an existing stock replenishment order
export async function DELETE(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;

    // First, delete related OrderItems
    await prisma.orderItem.deleteMany({
      where: { order_id: id },
    });

    // Then, delete the Order
    const deletedOrder = await prisma.order.delete({
      where: { id },
    });

    return NextResponse.json(deletedOrder);
  } catch (error) {
    console.error("Error deleting order:", error);
    return NextResponse.json(
      { error: "Error deleting order" },
      { status: 500 }
    );
  }
}
