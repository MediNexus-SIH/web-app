/*
  Warnings:

  - Added the required column `department_id` to the `OrderItem` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "OrderItem" ADD COLUMN     "department_id" TEXT NOT NULL,
ADD COLUMN     "orderPlaced" BOOLEAN NOT NULL DEFAULT false;

-- AddForeignKey
ALTER TABLE "OrderItem" ADD CONSTRAINT "OrderItem_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "Departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
