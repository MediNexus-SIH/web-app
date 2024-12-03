-- AlterTable
ALTER TABLE "MedicalInventory" ADD COLUMN     "threshold_quantity" INTEGER NOT NULL DEFAULT 10;

-- AlterTable
ALTER TABLE "Notification" ADD COLUMN     "current_quantity" INTEGER,
ADD COLUMN     "expiry_date" TIMESTAMP(3),
ADD COLUMN     "inventory_id" TEXT,
ADD COLUMN     "item_name" TEXT,
ADD COLUMN     "threshold_quantity" INTEGER;

-- AddForeignKey
ALTER TABLE "Notification" ADD CONSTRAINT "Notification_inventory_id_fkey" FOREIGN KEY ("inventory_id") REFERENCES "MedicalInventory"("id") ON DELETE SET NULL ON UPDATE CASCADE;
