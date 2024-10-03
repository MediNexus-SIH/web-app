import { NextResponse } from "next/server";
import prisma from "@/config/prisma.config";
import { getServerSideProps } from "@/hooks/getServerSideProps";

type Item = {
  item_name: string;
  description?: string;
  quantity_in_stock: number;
  unit_price: number;
  supplier: string;
  category: string;
};

export async function GET(req: Request) {
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

  const { searchParams } = new URL(req.url);
  const itemId = searchParams.get("item_id");

  if (itemId) {
    const item = await prisma.item.findMany({
      where: { item_id: itemId },
    });

    if (!item) {
      return NextResponse.json({ error: "Item not found" }, { status: 404 });
    }
    return NextResponse.json(item);
  } else {
    const items = await prisma.item.findMany();
    return NextResponse.json(items);
  }
}

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

  const body: Item[] = await req.json();
  if (!Array.isArray(body)) {
    return NextResponse.json(
      { error: "Request body must be an array of items" },
      { status: 400 }
    );
  }
  try {
    const newItems = await prisma.item.createMany({
      data: body.map((item: Item) => ({
        item_name: item.item_name,
        description: item.description,
        quantity_in_stock: item.quantity_in_stock,
        unit_price: item.unit_price,
        supplier: item.supplier,
        category: item.category,
      })),
      skipDuplicates: true,
    });

    return NextResponse.json({ count: newItems.count }, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to create items" },
      { status: 500 }
    );
  }
}

export async function PUT(req: Request) {
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

  const { searchParams } = new URL(req.url);
  const itemId = searchParams.get("item_id");
  const body = await req.json();

  if (!itemId) {
    return NextResponse.json({ error: "Item ID is required" }, { status: 400 });
  }

  try {
    const updatedItem = await prisma.item.update({
      where: { item_id: itemId },
      data: {
        item_name: body.item_name,
        description: body.description,
        quantity_in_stock: body.quantity_in_stock,
        unit_price: body.unit_price,
        supplier: body.supplier,
        category: body.category,
      },
    });

    return NextResponse.json(updatedItem);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to update item" },
      { status: 500 }
    );
  }
}

export async function DELETE(req: Request) {
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

  const { searchParams } = new URL(req.url);
  const itemId = searchParams.get("item_id");

  if (!itemId) {
    return NextResponse.json({ error: "Item ID is required" }, { status: 400 });
  }

  try {
    await prisma.item.delete({
      where: { item_id: itemId },
    });

    return NextResponse.json({ message: "Item deleted successfully" });
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to delete item" },
      { status: 500 }
    );
  }
}
