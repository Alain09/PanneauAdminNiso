/*
  Warnings:

  - You are about to drop the column `email` on the `user_profiles` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[firstName,lastName]` on the table `user_profiles` will be added. If there are existing duplicate values, this will fail.

*/
-- AlterTable
ALTER TABLE "public"."user_profiles" DROP COLUMN "email";

-- CreateIndex
CREATE UNIQUE INDEX "user_profiles_firstName_lastName_key" ON "public"."user_profiles"("firstName", "lastName");
