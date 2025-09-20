/*
  Warnings:

  - The `weekActif` column on the `Campagne` table would be dropped and recreated. This will lead to data loss if there is data in the column.
  - The `week` column on the `categories` table would be dropped and recreated. This will lead to data loss if there is data in the column.

*/
-- AlterTable
ALTER TABLE "public"."Campagne" DROP COLUMN "weekActif",
ADD COLUMN     "weekActif" INTEGER;

-- AlterTable
ALTER TABLE "public"."categories" DROP COLUMN "week",
ADD COLUMN     "week" INTEGER;
