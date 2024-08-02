/*
  Warnings:

  - You are about to drop the column `contactNumber` on the `Client` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Client_contactNumber_key";

-- AlterTable
ALTER TABLE "Client" DROP COLUMN "contactNumber";
