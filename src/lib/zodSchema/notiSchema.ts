import { z } from "zod";

const NotificationSchema = z.object({
  type: z.enum([
    "LOW_STOCK",
    "EXPIRING_SOON",
    "ORDER_STATUS",
    "RESOURCE_SHARING",
    "BLOOD_BANK",
    "VENDOR_ORDER",
  ]),
  message: z.string().min(1, "Message cannot be empty."),
  status: z.enum(["UNREAD", "READ"]).optional().default("UNREAD"),
  department_id: z.string().uuid().optional(),
  inventory_id: z.string().uuid().optional(),
  item_name: z.string().optional(),
  current_quantity: z.number().int().positive().optional(),
  threshold_quantity: z.number().int().positive().optional(),
  expiry_date: z.date().optional(),
});

export default NotificationSchema;
