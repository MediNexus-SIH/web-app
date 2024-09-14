/*
  Warnings:

  - You are about to drop the column `city` on the `Hospital` table. All the data in the column will be lost.
  - You are about to drop the column `name` on the `Hospital` table. All the data in the column will be lost.
  - You are about to drop the column `security_question_answer` on the `Hospital` table. All the data in the column will be lost.
  - Added the required column `admin_name` to the `Hospital` table without a default value. This is not possible if the table is not empty.
  - Added the required column `hospitalName` to the `Hospital` table without a default value. This is not possible if the table is not empty.
  - Added the required column `security_answer` to the `Hospital` table without a default value. This is not possible if the table is not empty.
  - Added the required column `state` to the `Hospital` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Hospital" DROP COLUMN "city",
DROP COLUMN "name",
DROP COLUMN "security_question_answer",
ADD COLUMN     "admin_name" TEXT NOT NULL,
ADD COLUMN     "hospitalName" TEXT NOT NULL,
ADD COLUMN     "security_answer" TEXT NOT NULL,
ADD COLUMN     "state" TEXT NOT NULL;
