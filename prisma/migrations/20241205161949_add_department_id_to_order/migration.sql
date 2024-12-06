/*
  Warnings:

  - Added the required column `department_id` to the `Order` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Order" ADD COLUMN     "department_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Order" ADD CONSTRAINT "Order_department_id_fkey" FOREIGN KEY ("department_id") REFERENCES "Departments"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
