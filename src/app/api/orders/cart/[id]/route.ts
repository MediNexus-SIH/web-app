import { NextResponse } from "next/server";
import prisma from "@/config/prisma.config";

export async function PUT(
  request: Request,
  { params }: { params: { id: string } }
) {
  try {
    const { id } = params;
    const { quantity } = await request.json();

    // Validate input
    if (!id || quantity === undefined || quantity < 0) {
      return NextResponse.json(
        { error: "Invalid input data" },
        { status: 400 }
      );
    }

    const updatedCartItem = await prisma.cartItem.update({
      where: { id },
      data: { quantity },
      select: {
        id: true,
        quantity: true,
        unit_price: true,
        item: {
          select: {
            item_id: true,
            item_name: true,
            description: true,
            supplier: true,
            category: true,
          },
        },
        department: {
          select: {
            id: true,
            department: true,
          },
        },
      },
    });

    return NextResponse.json(updatedCartItem, { status: 200 });
  } catch (error: any) {
    console.error("Error updating cart item:", error);

    // Handle cases like item not found or invalid ID
    if (error.code === "P2025") {
      return NextResponse.json(
        { error: "Cart item not found" },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { error: "Error updating cart item" },
      { status: 500 }
    );
  }
}

export async function DELETE(
  request: Request,
  { params }: { params?: { id?: string } } = {}
) {
  try {
    const id = params?.id;

    if (!id) {
      // Clear all cart items
      const deletedItems = await prisma.cartItem.deleteMany();
      return NextResponse.json(
        { message: "All cart items cleared", count: deletedItems.count },
        { status: 200 }
      );
    }

    // Delete specific cart item
    const deletedCartItem = await prisma.cartItem.delete({
      where: { id },
      select: {
        id: true,
        quantity: true,
        item: {
          select: {
            item_id: true,
            item_name: true,
            description: true,
            supplier: true,
            category: true,
          },
        },
        department: {
          select: {
            id: true,
            department: true,
          },
        },
      },
    });

    return NextResponse.json(deletedCartItem, { status: 200 });
  } catch (error: any) {
    console.error("Error in cart operation:", error);

    // Handle specific Prisma errors
    if (error.code === "P2025") {
      return NextResponse.json(
        { error: "Cart item not found" },
        { status: 404 }
      );
    }

    // General error response
    return NextResponse.json(
      { error: "Error in cart operation" },
      { status: 500 }
    );
  }
}
