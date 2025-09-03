-- CreateTable
CREATE TABLE "public"."user" (
    "id" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "password" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "teamMemberId" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "emailVerified" BOOLEAN NOT NULL,
    "image" TEXT,
    "role" TEXT NOT NULL,
    "phone" TEXT,

    CONSTRAINT "user_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."session" (
    "id" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "token" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,
    "ipAddress" TEXT,
    "userAgent" TEXT,

    CONSTRAINT "session_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."account" (
    "id" TEXT NOT NULL,
    "accountId" TEXT NOT NULL,
    "providerId" TEXT NOT NULL,
    "userId" TEXT NOT NULL,
    "accessToken" TEXT,
    "refreshToken" TEXT,
    "idToken" TEXT,
    "accessTokenExpiresAt" TIMESTAMP(3),
    "refreshTokenExpiresAt" TIMESTAMP(3),
    "scope" TEXT,
    "password" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "account_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."verification" (
    "id" TEXT NOT NULL,
    "identifier" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "expiresAt" TIMESTAMP(3) NOT NULL,
    "createdAt" TIMESTAMP(3),
    "updatedAt" TIMESTAMP(3),

    CONSTRAINT "verification_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."TeamMember" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "contact" TEXT,
    "role" TEXT NOT NULL,
    "position" TEXT,
    "image" TEXT,

    CONSTRAINT "TeamMember_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ProductCatalogue" (
    "id" TEXT NOT NULL,
    "categorie" TEXT NOT NULL,
    "option" INTEGER NOT NULL,
    "price" INTEGER NOT NULL,
    "totalweek" INTEGER NOT NULL,

    CONSTRAINT "ProductCatalogue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."ComposantCatalogue" (
    "id" TEXT NOT NULL,
    "product" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "image" TEXT,
    "productCatalogueId" TEXT NOT NULL,

    CONSTRAINT "ComposantCatalogue_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Campagne" (
    "id" TEXT NOT NULL,
    "nom" TEXT,
    "status" TEXT,
    "weekActif" TEXT,
    "campagneStatut" TEXT DEFAULT 'En cours',
    "dureeSelectionJours" INTEGER,
    "dureeTontineSemaines" INTEGER,
    "selectionStart" TIMESTAMP(3),
    "selectionEnd" TIMESTAMP(3),
    "tontineStart" TIMESTAMP(3),
    "tontineEnd" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Campagne_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."TontineOption" (
    "id" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "option" TEXT NOT NULL,
    "countOption" INTEGER NOT NULL,
    "totalToPayByWeek" INTEGER,

    CONSTRAINT "TontineOption_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."OptionComponent" (
    "id" TEXT NOT NULL,
    "compose" TEXT NOT NULL,
    "tontineOptionId" TEXT NOT NULL,

    CONSTRAINT "OptionComponent_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."Categories" (
    "id" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "week" TEXT,
    "status" TEXT DEFAULT 'En cours',
    "totalToPayByWeek" INTEGER NOT NULL,
    "DatePaiement" TIMESTAMP(3),
    "campagneId" TEXT NOT NULL,

    CONSTRAINT "Categories_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."CategoriesStatisquesPayement" (
    "id" TEXT NOT NULL,
    "category" TEXT NOT NULL,
    "status" TEXT DEFAULT 'En cours',
    "totalPaid" INTEGER NOT NULL,
    "weekValided" INTEGER NOT NULL,
    "totalPaidByWeek" INTEGER NOT NULL,
    "categoriesId" TEXT NOT NULL,

    CONSTRAINT "CategoriesStatisquesPayement_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "public"."UserProfile" (
    "id" TEXT NOT NULL,
    "firstName" TEXT NOT NULL,
    "lastName" TEXT NOT NULL,
    "email" TEXT NOT NULL,
    "contact" TEXT,
    "role" TEXT,
    "position" TEXT DEFAULT 'AutoGestion',
    "image" TEXT,
    "provence" TEXT,
    "profession" TEXT,
    "description" TEXT,
    "status" TEXT DEFAULT 'En cours',
    "montantTotalGlobal" INTEGER,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "categoriesStatisquesPayementId" TEXT,

    CONSTRAINT "UserProfile_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "user_email_key" ON "public"."user"("email");

-- CreateIndex
CREATE UNIQUE INDEX "session_token_key" ON "public"."session"("token");

-- CreateIndex
CREATE UNIQUE INDEX "TeamMember_email_key" ON "public"."TeamMember"("email");

-- CreateIndex
CREATE UNIQUE INDEX "UserProfile_email_key" ON "public"."UserProfile"("email");

-- AddForeignKey
ALTER TABLE "public"."user" ADD CONSTRAINT "user_teamMemberId_fkey" FOREIGN KEY ("teamMemberId") REFERENCES "public"."TeamMember"("id") ON DELETE SET NULL ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."session" ADD CONSTRAINT "session_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."account" ADD CONSTRAINT "account_userId_fkey" FOREIGN KEY ("userId") REFERENCES "public"."user"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."ComposantCatalogue" ADD CONSTRAINT "ComposantCatalogue_productCatalogueId_fkey" FOREIGN KEY ("productCatalogueId") REFERENCES "public"."ProductCatalogue"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."OptionComponent" ADD CONSTRAINT "OptionComponent_tontineOptionId_fkey" FOREIGN KEY ("tontineOptionId") REFERENCES "public"."TontineOption"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."Categories" ADD CONSTRAINT "Categories_campagneId_fkey" FOREIGN KEY ("campagneId") REFERENCES "public"."Campagne"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."CategoriesStatisquesPayement" ADD CONSTRAINT "CategoriesStatisquesPayement_categoriesId_fkey" FOREIGN KEY ("categoriesId") REFERENCES "public"."Categories"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "public"."UserProfile" ADD CONSTRAINT "UserProfile_categoriesStatisquesPayementId_fkey" FOREIGN KEY ("categoriesStatisquesPayementId") REFERENCES "public"."CategoriesStatisquesPayement"("id") ON DELETE SET NULL ON UPDATE CASCADE;
