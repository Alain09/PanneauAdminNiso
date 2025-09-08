import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import { safeDeleteFromBlob, uploadFileToBlob } from "@/src/lib/vercelBlodAction";

const prisma = new PrismaClient();

// GET - Récupération d'un catalogue spécifique
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  try {
    const catalogue = await prisma.productCatalogue.findUnique({
      where: { id },
      include: {
        composant: true
      }
    });

    if (!catalogue) {
      return NextResponse.json(
        {
          message: "Catalogue non trouvé",
          success: false
        },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Catalogue récupéré avec succès",
        data: catalogue,
        success: true
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Erreur lors de la récupération :", error);
    return NextResponse.json(
      {
        message: "Erreur serveur",
        error: error,
        success: false
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// PATCH - Mise à jour d'un catalogue (VERSION CORRIGÉE)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  try {
    const res = await request.formData();

    // DESTRUCTURATION
    const categorie = res.get("categorie") as string;
    const option = res.get("option") as string;
    const price = res.get("price") as string;
    const totalweek = res.get("totalweek") as string;
    const composantsData = res.get("composant") as string;

    // Vérifier que le catalogue existe
    const catalogueExistant = await prisma.productCatalogue.findUnique({
      where: { id },
      include: {
        composant: true
      }
    });

    if (!catalogueExistant) {
      return NextResponse.json(
        { message: "Catalogue non trouvé", success: false },
        { status: 404 }
      );
    }

    // Préparation des données de mise à jour
    const updateData: any = {};
    if (categorie) updateData.categorie = categorie;
    if (option) updateData.option = parseInt(option);
    if (price) updateData.price = parseInt(price);
    if (totalweek) updateData.totalweek = parseInt(totalweek);

    // Traitement des composants si fournis
    if (composantsData) {
      let nouveaux_composants: any[] = [];

      try {
        nouveaux_composants = JSON.parse(composantsData);
      } catch (parseError) {
        return NextResponse.json(
          { message: "Format des composants invalide", success: false },
          { status: 400 }
        );
      }

      // 🎯 GESTION INTELLIGENTE DES IMAGES (File + String)
      const composantsWithImages = await Promise.all(
        nouveaux_composants.map(async (comp: any, index: number) => {
          let imageUrl: string | null = null;

          // 📁 CAS 1: Nouvelle image uploadée (File)
          const imageFile = res.get(`composant_image_${index}`);
          if (imageFile instanceof File && imageFile.size > 0) {
            console.log(`🔄 Upload nouvelle image pour composant ${index}:`, imageFile.name);

            const uploadedFile = await uploadFileToBlob(
              imageFile,
              `Composant_${comp.product}_${Date.now()}`
            );
            imageUrl = uploadedFile.url;
          }
          // 🔗 CAS 2: Image existante conservée (string dans comp.image)
          else if (comp.image && typeof comp.image === 'string' && comp.image.trim() !== '') {
            console.log(`🔗 Conservation image existante pour composant ${index}:`, comp.image);
            imageUrl = comp.image;
          }
          // 🗑️ CAS 3: Pas d'image ou image supprimée
          else {
            console.log(`🗑️ Pas d'image pour composant ${index}`);
            imageUrl = null;
          }

          return {
            product: comp.product || "",
            quantity: parseInt(comp.quantity) || 0,
            image: imageUrl,
          };
        })
      );

      // ⚠️ SUPPRESSION INTELLIGENTE DES ANCIENNES IMAGES
      // Récupérer les URLs des nouvelles images pour éviter de supprimer celles conservées
      const nouvellesImageUrls = composantsWithImages
        .map(comp => comp.image)
        .filter(url => url !== null);

      // Supprimer seulement les anciennes images qui ne sont plus utilisées
      for (const ancienComposant of catalogueExistant.composant) {
        if (ancienComposant.image && !nouvellesImageUrls.includes(ancienComposant.image)) {
          console.log(`🗑️ Suppression ancienne image:`, ancienComposant.image);
          await safeDeleteFromBlob(ancienComposant.image);
        }
      }

      // Supprimer les anciens composants
      await prisma.composantCatalogue.deleteMany({
        where: { productCatalogueId: id }
      });

      // Créer les nouveaux composants
      updateData.composant = {
        create: composantsWithImages
      };
    }

    // Mise à jour du catalogue
    const catalogueMisAJour = await prisma.productCatalogue.update({
      where: { id },
      data: updateData,
      include: {
        composant: true
      }
    });

    return NextResponse.json(
      {
        message: "Catalogue mis à jour avec succès",
        data: catalogueMisAJour,
        success: true
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Erreur lors de la mise à jour:", error);
    return NextResponse.json(
      {
        message: "Erreur serveur",
        error: error,
        success: false
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// DELETE - Suppression d'un catalogue
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  try {
    // Vérifier que le catalogue existe et récupérer les composants
    const catalogueToDelete = await prisma.productCatalogue.findUnique({
      where: { id },
      include: {
        composant: true
      }
    });

    if (!catalogueToDelete) {
      return NextResponse.json(
        { message: "Catalogue non trouvé", success: false },
        { status: 404 }
      );
    }

    // Supprimer les images des composants SEULEMENT si elles sont sur Vercel Blob
    for (const composant of catalogueToDelete.composant) {
      if (composant.image) {
        await safeDeleteFromBlob(composant.image);
      }
    }

    // Supprimer d'abord les composants (relations)
    await prisma.composantCatalogue.deleteMany({
      where: { productCatalogueId: id }
    });

    // Puis supprimer le catalogue
    await prisma.productCatalogue.delete({
      where: { id }
    });

    return NextResponse.json(
      {
        message: "Catalogue supprimé avec succès",
        success: true
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Erreur lors de la suppression:", error);
    return NextResponse.json(
      {
        message: `Erreur serveur pour l'ID ${id}`,
        error: error,
        success: false
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}



