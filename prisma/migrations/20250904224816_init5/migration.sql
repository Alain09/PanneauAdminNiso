/*
  Warnings:

  - A unique constraint covering the columns `[categorie,option]` on the table `ProductCatalogue` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "public"."UserProfile_email_key";

-- AlterTable
ALTER TABLE "public"."Categories" ALTER COLUMN "totalToPayByWeek" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."CategoriesStatisquesPayement" ALTER COLUMN "totalPaid" DROP NOT NULL,
ALTER COLUMN "weekValided" DROP NOT NULL,
ALTER COLUMN "totalPaidByWeek" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."OptionComponent" ALTER COLUMN "compose" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."TontineOption" ALTER COLUMN "category" DROP NOT NULL,
ALTER COLUMN "option" DROP NOT NULL,
ALTER COLUMN "countOption" DROP NOT NULL;

-- AlterTable
ALTER TABLE "public"."UserProfile" ALTER COLUMN "email" DROP NOT NULL;

-- CreateIndex
CREATE UNIQUE INDEX "ProductCatalogue_categorie_option_key" ON "public"."ProductCatalogue"("categorie", "option");
