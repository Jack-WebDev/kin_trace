/*
  Warnings:

  - The values [Traced] on the enum `TraceStatus` will be removed. If these variants are still used in the database, this will fail.

*/
-- AlterEnum
BEGIN;
CREATE TYPE "TraceStatus_new" AS ENUM ('Untraced', 'Found', 'NotFound');
ALTER TABLE "Beneficiary" ALTER COLUMN "traceStatus" DROP DEFAULT;
ALTER TABLE "Case" ALTER COLUMN "traceStatus" DROP DEFAULT;
ALTER TABLE "Beneficiary" ALTER COLUMN "traceStatus" TYPE "TraceStatus_new" USING ("traceStatus"::text::"TraceStatus_new");
ALTER TABLE "Case" ALTER COLUMN "traceStatus" TYPE "TraceStatus_new" USING ("traceStatus"::text::"TraceStatus_new");
ALTER TYPE "TraceStatus" RENAME TO "TraceStatus_old";
ALTER TYPE "TraceStatus_new" RENAME TO "TraceStatus";
DROP TYPE "TraceStatus_old";
ALTER TABLE "Beneficiary" ALTER COLUMN "traceStatus" SET DEFAULT 'Untraced';
ALTER TABLE "Case" ALTER COLUMN "traceStatus" SET DEFAULT 'Untraced';
COMMIT;
