/*
  Warnings:

  - The values [Yes,No,Delivered] on the enum `OrderStatus` will be removed. If these variants are still used in the database, this will fail.
  - Added the required column `amount` to the `StockReplenishmentLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `payment_status` to the `StockReplenishmentLog` table without a default value. This is not possible if the table is not empty.
  - Added the required column `supplier` to the `StockReplenishmentLog` table without a default value. This is not possible if the table is not empty.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "OrderStatus_new" AS ENUM ('Pending', 'Success', 'Cancelled');
ALTER TABLE "StockReplenishmentLog" ALTER COLUMN "order_placed" TYPE "OrderStatus_new" USING ("order_placed"::text::"OrderStatus_new");
ALTER TABLE "VendorOrders" ALTER COLUMN "status" TYPE "OrderStatus_new" USING ("status"::text::"OrderStatus_new");
ALTER TYPE "OrderStatus" RENAME TO "OrderStatus_old";
ALTER TYPE "OrderStatus_new" RENAME TO "OrderStatus";
DROP TYPE "OrderStatus_old";
COMMIT;

-- AlterTable
ALTER TABLE "StockReplenishmentLog" ADD COLUMN     "amount" DOUBLE PRECISION NOT NULL,
ADD COLUMN     "payment_status" BOOLEAN NOT NULL,
ADD COLUMN     "supplier" TEXT NOT NULL;

-- CreateTable
CREATE TABLE "Item" (
    "item_id" TEXT NOT NULL,
    "item_name" TEXT NOT NULL,
    "description" TEXT,
    "quantity_in_stock" INTEGER NOT NULL,
    "unit_price" DOUBLE PRECISION NOT NULL,
    "supplier" TEXT NOT NULL,
    "category" TEXT NOT NULL,

    CONSTRAINT "Item_pkey" PRIMARY KEY ("item_id")
);
