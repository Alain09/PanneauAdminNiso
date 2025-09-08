/*
  Warnings:

  - You are about to drop the `Categories` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `CategoriesStatisquesPayement` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `OptionComponent` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `TontineOption` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `UserProfile` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "public"."CategoriesStatisquesPayement" DROP CONSTRAINT "CategoriesStatisquesPayement_categoriesId_fkey";

-- DropForeignKey
ALTER TABLE "public"."OptionComponent" DROP CONSTRAINT "OptionComponent_tontineOptionId_fkey";

-- DropForeignKey
ALTER TABLE "public"."UserProfile" DROP CONSTRAINT "UserProfile_categoriesStatisquesPayementId_fkey";

-- DropTable
DROP TABLE "public"."Categories";

-- DropTable
DROP TABLE "public"."CategoriesStatisquesPayement";

-- DropTable
DROP TABLE "public"."OptionComponent";

-- DropTable
DROP TABLE "public"."TontineOption";

-- DropTable
DROP TABLE "public"."UserProfile";

-- CreateTable
CREATE TABLE "public"."user_profiles" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT,
    "contact" TEXT,
    "role" TEXT,
    "position" TEXT,
    "image" TEXT,
    "provence" TEXT,
    "profession" TEXT,
    "description" TEXT,
    "status" TEXT DEFAULT 'En cours',
    "montantTotalGlobal" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "user_profiles_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."categories_statistiques_payement" (
    "id" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "listOptions" TEXT[],
    "status" TEXT DEFAULT 'En cours',
    "totalPaid" INTEGER NOT NULL DEFAULT 0,
    "weekValided" INTEGER NOT NULL DEFAULT 0,
    "totalPaidByWeek" INTEGER NOT NULL DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "categories_statistiques_payement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."tontine_options" (
    "id" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "option" TEXT NOT NULL,
    "countOption" INTEGER NOT NULL DEFAULT 1,
    "totalToPayByWeekOfThisOption" INTEGER DEFAULT 0,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "categoriesStatistiquesPayementId" TEXT NOT NULL,

    CONSTRAINT "tontine_options_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."option_components" (
    "id" TEXT NOT NULL,
    "compose" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "tontineOptionId" TEXT NOT NULL,

    CONSTRAINT "option_components_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."categories" (
    "id" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "week" TEXT,
    "status" TEXT DEFAULT 'En attente',
    "totalToPayByWeekOfThisCategory" INTEGER NOT NULL DEFAULT 0,
    "datePaiement" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "categoriesStatistiquesPayementId" TEXT NOT NULL,

    CONSTRAINT "categories_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "public"."categories_statistiques_payement" ADD CONSTRAINT "categories_statistiques_payement_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user_profiles"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."tontine_options" ADD CONSTRAINT "tontine_options_categoriesStatistiquesPayementId_fkey" FOREIGN KEY ("categoriesStatistiquesPayementId") REFERENCES "public"."categories_statistiques_payement"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."option_components" ADD CONSTRAINT "option_components_tontineOptionId_fkey" FOREIGN KEY ("tontineOptionId") REFERENCES "public"."tontine_options"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."categories" ADD CONSTRAINT "categories_categoriesStatistiquesPayementId_fkey" FOREIGN KEY ("categoriesStatistiquesPayementId") REFERENCES "public"."categories_statistiques_payement"("id") ON DELETE CASCADE ON UPDATE CASCADE;
