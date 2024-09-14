/*
  Warnings:

  - You are about to drop the column `username` on the `Hospital` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[admin_email]` on the table `Hospital` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `admin_email` to the `Hospital` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Hospital_username_key";

-- AlterTable
ALTER TABLE "Hospital" DROP COLUMN "username",
ADD COLUMN     "admin_email" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Hospital_admin_email_key" ON "Hospital"("admin_email");
