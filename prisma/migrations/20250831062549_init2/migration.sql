/*
  Warnings:

  - You are about to drop the column `teamMemberId` on the `user` table. All the data in the column will be lost.
  - You are about to drop the `TeamMember` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."user" DROP CONSTRAINT "user_teamMemberId_fkey";

-- AlterTable
ALTER TABLE "public"."user" DROP COLUMN "teamMemberId",
ADD COLUMN     "position" TEXT,
ADD COLUMN     "provence" TEXT;

-- DropTable
DROP TABLE "public"."TeamMember";
