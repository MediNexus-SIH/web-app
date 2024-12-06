import { NextResponse } from "next/server";
import prisma from "@/config/prisma.config";
import validateSession from "@/lib/validateSession";
import { OrderStatus } from "@prisma/client";

export async function POST(request: Request) {
  const { userId } = await validateSession();

  try {
    const body = await request.json();
    const {
      expected_delivery_date,
      orderItems,
    }: {
      expected_delivery_date: string;
      orderItems: {
        item_id: string;
        quantity: number;
        unit_price: number;
        department: string;
      }[];
    } = body;

    // Input validation
    if (!expected_delivery_date || !orderItems || orderItems.length === 0) {
      return NextResponse.json(
        { error: "Invalid input data" },
        { status: 400 }
      );
    }

    // Fetch departments
    const departments = await prisma.departments.findMany({
      where: {
        department: { in: orderItems.map((item) => item.department) },
        hospital_id: userId,
      },
    });

    if (departments.length !== orderItems.length) {
      return NextResponse.json(
        { error: "One or more departments not found" },
        { status: 404 }
      );
    }

    // Fetch items
    const items = await prisma.item.findMany({
      where: {
        item_id: { in: orderItems.map((item) => item.item_id) },
      },
    });
    if (items.length !== orderItems.length) {
      return NextResponse.json(
        {
          payload: orderItems,
          items: items,
          error: "One or more items could not be found",
        },
        { status: 404 }
      );
    }

    const itemMap = new Map(items.map((item) => [item.item_id, item]));

    // Calculate total amount
    const total_amount = orderItems.reduce(
      (total, item) => total + item.quantity * item.unit_price,
      0
    );

    // Create order
    const order = await prisma.order.create({
      data: {
        hospital: { connect: { id: userId } },
        expected_delivery_date: new Date(expected_delivery_date),
        total_amount,
        payment_status: false,
        status: "PENDING",
        orderItems: {
          create: orderItems.map((item) => {
            const fetchedItem = itemMap.get(item.item_id);
            const department = departments.find(
              (d) => d.department === item.department
            );
            return {
              item: { connect: { item_id: item.item_id } },
              quantity: item.quantity,
              unit_price: fetchedItem ? fetchedItem.unit_price : 0,
              department: { connect: { id: department?.id } },
            };
          }),
        },
      },
      include: {
        orderItems: {
          include: {
            item: true,
            department: true,
          },
        },
        hospital: {
          select: {
            hospitalName: true,
          },
        },
      },
    });

    const formattedResponse = {
      id: order.id,
      hospital: order.hospital.hospitalName,
      order_date: order.order_date,
      expected_delivery_date: order.expected_delivery_date,
      status: order.status,
      payment_status: order.payment_status,
      total_amount: order.total_amount,
      orderItems: order.orderItems.map((orderItem) => ({
        item_id: orderItem.item.item_id,
        item_name: orderItem.item.item_name,
        quantity: orderItem.quantity,
        unit_price: orderItem.unit_price,
        department: orderItem.department.department,
      })),
    };

    return NextResponse.json(formattedResponse, { status: 201 });
  } catch (error) {
    console.error("Error creating order:", error);
    return NextResponse.json(
      { error: "Error creating order" },
      { status: 500 }
    );
  }
}

export async function GET() {
  const { userId } = await validateSession();
  try {
    const orders = await prisma.order.findMany({
      where: {
        hospital_id: userId,
      },
      include: {
        orderItems: {
          include: {
            department: true,
            item: true,
          },
        },
      },
    });
    const formattedOrders = orders.map((order) => ({
      id: order.id,
      order_date: order.order_date,
      expected_delivery_date: order.expected_delivery_date,
      status: order.status,
      payment_status: order.payment_status,
      total_amount: order.total_amount,
      orderItems: order.orderItems.map((orderItem) => ({
        orderItemId: orderItem.id,
        item_category: orderItem.item.category,
        item_supplier: orderItem.item.supplier,
        item_id: orderItem.item.item_id,
        item_name: orderItem.item.item_name,
        description: orderItem.item.description,
        quantity: orderItem.quantity,
        unit_price: orderItem.unit_price,
        department: orderItem.department.department,
      })),
    }));
    return NextResponse.json(formattedOrders, { status: 200 });
  } catch (error) {
    console.error("Error fetching orders:", error);
    return NextResponse.json(
      { error: "Error fetching orders" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: Request) {
  try {
    const { id } = await request.json();

    const existingOrder = await prisma.order.findUnique({
      where: { id },
    });

    if (!existingOrder) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }

    // Fetch related OrderItems before deleting the order
    const orderItems = await prisma.orderItem.findMany({
      where: { order_id: id },
      include: {
        item: true,
        department: true,
      },
    });

    // First, delete related OrderItems
    await prisma.orderItem.deleteMany({
      where: { order_id: id },
    });

    const deletedOrder = await prisma.order.delete({
      where: { id },
    });

    const formattedResponse = {
      id: deletedOrder.id,
      order_date: deletedOrder.order_date,
      expected_delivery_date: deletedOrder.expected_delivery_date,
      status: deletedOrder.status,
      payment_status: deletedOrder.payment_status,
      total_amount: deletedOrder.total_amount,
      orderItems: orderItems.map((orderItem) => ({
        item_id: orderItem.item.item_id,
        item_name: orderItem.item.item_name,
        quantity: orderItem.quantity,
        unit_price: orderItem.unit_price,
        department: orderItem.department.department,
      })),
    };

    return NextResponse.json(formattedResponse);
  } catch (error) {
    console.error("Error deleting order:", error);
    return NextResponse.json(
      { error: "Error deleting order" },
      { status: 500 }
    );
  }
}
