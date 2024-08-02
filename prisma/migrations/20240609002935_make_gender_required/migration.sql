/*
  Warnings:

  - Made the column `gender` on table `Beneficiary` required. This step will fail if there are existing NULL values in that column.
  - Made the column `gender` on table `Client` required. This step will fail if there are existing NULL values in that column.
  - Made the column `gender` on table `User` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Beneficiary" ALTER COLUMN "gender" SET NOT NULL;

-- AlterTable
ALTER TABLE "Client" ALTER COLUMN "gender" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "gender" SET NOT NULL;
