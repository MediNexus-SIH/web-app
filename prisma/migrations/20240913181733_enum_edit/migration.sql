/*
  Warnings:

  - You are about to drop the column `address` on the `Departments` table. All the data in the column will be lost.
  - You are about to drop the column `region` on the `Departments` table. All the data in the column will be lost.
  - You are about to drop the column `address` on the `Hospital` table. All the data in the column will be lost.
  - Changed the type of `blood_type` on the `BloodBank` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `department` on the `Departments` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Added the required column `address_line_1` to the `Hospital` table without a default value. This is not possible if the table is not empty.
  - Added the required column `city` to the `Hospital` table without a default value. This is not possible if the table is not empty.
  - Added the required column `pincode` to the `Hospital` table without a default value. This is not possible if the table is not empty.
  - Changed the type of `security_question` on the `Hospital` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Changed the type of `region` on the `Hospital` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.

*/
-- AlterTable
ALTER TABLE "BloodBank" DROP COLUMN "blood_type",
ADD COLUMN     "blood_type" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Departments" DROP COLUMN "address",
DROP COLUMN "region",
DROP COLUMN "department",
ADD COLUMN     "department" TEXT NOT NULL;

-- AlterTable
ALTER TABLE "Hospital" DROP COLUMN "address",
ADD COLUMN     "address_line_1" TEXT NOT NULL,
ADD COLUMN     "address_line_2" TEXT,
ADD COLUMN     "city" TEXT NOT NULL,
ADD COLUMN     "pincode" INTEGER NOT NULL,
DROP COLUMN "security_question",
ADD COLUMN     "security_question" TEXT NOT NULL,
DROP COLUMN "region",
ADD COLUMN     "region" TEXT NOT NULL;

-- DropEnum
DROP TYPE "BloodType";

-- DropEnum
DROP TYPE "delhi_regions";

-- DropEnum
DROP TYPE "departments";

-- DropEnum
DROP TYPE "sec_ques_enum";
