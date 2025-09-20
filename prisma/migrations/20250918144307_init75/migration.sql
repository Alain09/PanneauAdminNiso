/*
  Warnings:

  - The `status` column on the `Campagne` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."Campagne" DROP COLUMN "status",
ADD COLUMN     "status" BOOLEAN;
