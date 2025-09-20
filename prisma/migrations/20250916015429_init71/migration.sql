/*
  Warnings:

  - A unique constraint covering the columns `[googleSheetId]` on the table `user_profiles` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."user_profiles" ADD COLUMN     "googleSheetId" TEXT;

-- CreateIndex
CREATE UNIQUE INDEX "user_profiles_googleSheetId_key" ON "public"."user_profiles"("googleSheetId");
