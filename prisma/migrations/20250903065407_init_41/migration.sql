/*
  Warnings:

  - You are about to drop the column `campagneId` on the `Categories` table. All the data in the column will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."Categories" DROP CONSTRAINT "Categories_campagneId_fkey";

-- AlterTable
ALTER TABLE "public"."Categories" DROP COLUMN "campagneId";
