import { PrismaClient } from "@prisma/client";
import { subDays } from "date-fns";
import { NotificationType } from "@prisma/client";

const prisma = new PrismaClient();

export async function periodicInventoryCheck() {
  const today = new Date();
  const thirtyDaysFromNow = subDays(today, 30);
  const twoDaysAgo = subDays(today, 2);

  const [lowStockItems, expiringItems, lastCheck] = await Promise.all([
    prisma.medicalInventory.findMany({
      where: {
        quantity: {
          lte: 10,
        },
      },
      include: {
        department: true,
        hospital: true,
        item: true,
      },
    }),
    prisma.medicalInventory.findMany({
      where: {
        expiry_date: {
          lte: thirtyDaysFromNow,
        },
      },
      include: {
        department: true,
        hospital: true,
        item: true,
      },
    }),
    prisma.systemCheck.findFirst({
      where: {
        type: "INVENTORY_CHECK",
      },
      orderBy: {
        created_at: "desc",
      },
    }),
  ]);

  if (!lastCheck || lastCheck.created_at < twoDaysAgo) {
    const lowStockNotifications = lowStockItems.map((item) => ({
      hospital_id: item.hospital_id,
      department_id: item.department_id,
      type: NotificationType.LOW_STOCK,
      message: `Low stock alert for ${item.item.item_name} in ${item.department.department}`,
    //   item_id: item.item_id,
      item_name: item.item.item_name,
      current_quantity: item.quantity,
      threshold_quantity: 10,
    }));

    const expiringNotifications = expiringItems.map((item) => ({
      hospital_id: item.hospital_id,
      department_id: item.department_id,
      type: NotificationType.EXPIRING_SOON,
      message: `${item.item.item_name} in ${
        item.department.department
      } is expiring on ${item.expiry_date.toDateString()}`,
    //   item_id: item.item_id,
      item_name: item.item.item_name,
      expiry_date: item.expiry_date,
    }));

    await prisma.$transaction([
      prisma.notification.createMany({
        data: lowStockNotifications,
      }),
      prisma.notification.createMany({
        data: expiringNotifications,
      }),
      prisma.systemCheck.create({
        data: {
          type: "INVENTORY_CHECK",
          hospital_id:
            lowStockItems[0]?.hospital_id || expiringItems[0]?.hospital_id,
        },
      }),
    ]);

    return lowStockNotifications.length + expiringNotifications.length;
  }

  return 0;
}
