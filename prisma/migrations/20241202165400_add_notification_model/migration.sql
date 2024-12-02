-- CreateEnum
CREATE TYPE "NotificationType" AS ENUM ('ORDER_STATUS', 'LOW_STOCK', 'RESOURCE_SHARING', 'BLOOD_BANK', 'VENDOR_ORDER');

-- CreateEnum
CREATE TYPE "NotificationStatus" AS ENUM ('UNREAD', 'READ');

-- CreateTable
CREATE TABLE "Notification" (
    "id" TEXT NOT NULL,
    "hospital_id" TEXT,
    "department_id" TEXT,
    "type" "NotificationType" NOT NULL,
    "message" TEXT NOT NULL,
    "status" "NotificationStatus" NOT NULL DEFAULT 'UNREAD',
    "created_at" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "read_at" TIMESTAMP(3),

    CONSTRAINT "Notification_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_hospital_id_fkey" FOREIGN KEY ("hospital_id") REFERENCES "Hospital"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "Departments"("id") ON DELETE SET NULL ON UPDATE CASCADE;
