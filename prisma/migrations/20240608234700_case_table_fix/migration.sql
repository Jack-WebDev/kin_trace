/*
  Warnings:

  - You are about to drop the column `duration` on the `Case` table. All the data in the column will be lost.
  - Added the required column `expectedDateOfCompletion` to the `Case` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Case" DROP COLUMN "duration",
ADD COLUMN     "expectedDateOfCompletion" TIMESTAMP(3) NOT NULL;
