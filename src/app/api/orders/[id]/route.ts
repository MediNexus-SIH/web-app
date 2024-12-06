import { NextResponse } from "next/server";
import prisma from "@/config/prisma.config";
import validateSession from "@/lib/validateSession";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const updateData = await request.json();
    const { userId } = await validateSession();
    const { id } = params;

    const existingOrder = await prisma.order.findUnique({
      where: { id },
    });

    if (!existingOrder) {
      return NextResponse.json({ error: "Order not found" }, { status: 404 });
    }
    if (updateData.status) {
      const updatedOrder = await prisma.order.update({
        where: { id },
        data: {
          status: updateData.status,
        },
      });
      return NextResponse.json(updatedOrder, { status: 200 });
    }
    // Fetch department IDs for each order item
    const departmentItemsWithIds = await Promise.all(
      updateData.orderItems.map(async (item: any) => {
        const department = await prisma.departments.findFirst({
          where: { department: item.department, hospital_id: userId },
          select: { id: true },
        });

        if (!department) {
          throw new Error(`Department ${item.department} not found`);
        }

        return {
          ...item,
          department_id: department.id,
        };
      })
    );

    const newTotal_amount = updateData.orderItems.reduce(
      (total: number, item: any) => total + item.unit_price * item.quantity,
      0
    );

    const updatedOrder = await prisma.order.update({
      where: { id },
      data: {
        // Use existing values if not provided in update
        expected_delivery_date: updateData.expected_delivery_date
          ? new Date(updateData.expected_delivery_date)
          : existingOrder.expected_delivery_date,
        status: updateData.status || existingOrder.status,
        ...{ total_amount: newTotal_amount },
        ...(updateData.orderItems && {
          orderItems: {
            upsert: departmentItemsWithIds.map((item: any) => ({
              where: { id: item.orderItemId || "" },
              update: {
                quantity: item.quantity,
                unit_price: item.unit_price,
                department: {
                  connect: {
                    id: item.department_id,
                  },
                },
              },
              create: {
                quantity: item.quantity,
                unit_price: item.unit_price,
                item: { connect: { item_id: item.item_id } },
                department: {
                  connect: {
                    id: item.department_id,
                  },
                },
              },
            })),
          },
        }),
      },
      include: {
        orderItems: {
          include: {
            item: true,
            department: true,
          },
        },
      },
    });

    const formattedOrder = {
      id: updatedOrder.id,
      order_date: updatedOrder.order_date,
      expected_delivery_date: updatedOrder.expected_delivery_date,
      newTotal_amount,
      status: updatedOrder.status,
      payment_status: updatedOrder.payment_status,
      total_amount: updatedOrder.total_amount,
      orderItems: updatedOrder.orderItems.map((orderItem) => ({
        item_id: orderItem.item.item_id,
        item_name: orderItem.item.item_name,
        quantity: orderItem.quantity,
        unit_price: orderItem.unit_price,
        department: orderItem.department.department,
      })),
    };

    return NextResponse.json(formattedOrder);
  } catch (error) {
    console.error("Error updating order:", error);
    return NextResponse.json(
      { error: "Error updating order" },
      { status: 500 }
    );
  }
}
