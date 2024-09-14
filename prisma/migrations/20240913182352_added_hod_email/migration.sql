/*
  Warnings:

  - You are about to drop the column `contact_number` on the `Departments` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Departments` table. All the data in the column will be lost.
  - You are about to drop the column `password` on the `Departments` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[hod_email]` on the table `Departments` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `hod_email` to the `Departments` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hod_name` to the `Departments` table without a default value. This is not possible if the table is not empty.

*/
-- DropIndex
DROP INDEX "Departments_contact_number_key";

-- AlterTable
ALTER TABLE "Departments" DROP COLUMN "contact_number",
DROP COLUMN "name",
DROP COLUMN "password",
ADD COLUMN     "hod_email" TEXT NOT NULL,
ADD COLUMN     "hod_name" TEXT NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "Departments_hod_email_key" ON "Departments"("hod_email");
