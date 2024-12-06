/*
  Warnings:

  - You are about to drop the column `session_id` on the `Cart` table. All the data in the column will be lost.
  - You are about to drop the column `user_id` on the `Cart` table. All the data in the column will be lost.
  - Added the required column `hospital_id` to the `Cart` table without a default value. This is not possible if the table is not empty.

*/
-- DropForeignKey
ALTER TABLE "Cart" DROP CONSTRAINT "Cart_user_id_fkey";

-- AlterTable
ALTER TABLE "Cart" DROP COLUMN "session_id",
DROP COLUMN "user_id",
ADD COLUMN     "hospital_id" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "Cart" ADD CONSTRAINT "Cart_hospital_id_fkey" FOREIGN KEY ("hospital_id") REFERENCES "Hospital"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
