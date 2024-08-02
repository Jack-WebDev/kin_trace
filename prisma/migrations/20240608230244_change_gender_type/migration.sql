/*
  Warnings:

  - The `gender` column on the `Beneficiary` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `gender` column on the `Client` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `gender` column on the `User` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- CreateEnum
CREATE TYPE "Gender" AS ENUM ('Male', 'Female', 'Unspecified');

-- AlterTable
ALTER TABLE "Beneficiary" DROP COLUMN "gender",
ADD COLUMN     "gender" "Gender" DEFAULT 'Unspecified';

-- AlterTable
ALTER TABLE "Client" DROP COLUMN "gender",
ADD COLUMN     "gender" "Gender" DEFAULT 'Unspecified';

-- AlterTable
ALTER TABLE "User" DROP COLUMN "gender",
ADD COLUMN     "gender" "Gender" DEFAULT 'Unspecified';
