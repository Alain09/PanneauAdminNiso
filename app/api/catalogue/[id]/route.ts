import { NextRequest, NextResponse } from "next/server";
import { PrismaClient,Prisma } from "@/generated/prisma";
import { deleteFileFromSupabase, uploadFileToSupabase, validateFileSize, validateFileType } from "@/src/lib/subaStorage";  

const prisma = new PrismaClient();

type ComposantInput = {
  product: string;
  quantity: string; // JSON envoyé contient souvent des strings
  image?: string | null;
};






// GET - Récupération d'un catalogue spécifique
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;

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
        error: error instanceof Error ? error.message : "Erreur inconnue",
        success: false
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// PATCH - Mise à jour d'un catalogue (VERSION AMÉLIORÉE)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;
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
   // ✅ Correct
    const updateData: Prisma.ProductCatalogueUpdateInput = {};

    if (categorie) updateData.categorie = categorie;
    if (option) updateData.option = parseInt(option);
    if (price) updateData.price = parseInt(price);
    if (totalweek) updateData.totalweek = parseInt(totalweek);

    // Traitement des composants si fournis
    if (composantsData) {
      let nouveaux_composants: ComposantInput[] = [];


      try {
        nouveaux_composants = JSON.parse(composantsData);
      } catch (parseError) {
        console.log(parseError)
        return NextResponse.json(
          { message: "Format des composants invalide", success: false },
          { status: 400 }
        );
      }

      // Gestion des images avec validation
      const composantsWithImages = await Promise.all(
        nouveaux_composants.map(async (comp: ComposantInput, index: number) => {
          let imageUrl: string | null = null;

          // CAS 1: Nouvelle image uploadée (File)
          const imageFile = res.get(`composant_image_${index}`) as File;
          if (imageFile && imageFile.size > 0) {
            // Validation du fichier
            if (!validateFileType(imageFile)) {
              throw new Error(`Type de fichier non autorisé pour le composant ${comp.product}. Utilisez JPG, PNG, WebP ou GIF.`);
            }

            if (!validateFileSize(imageFile, 5)) { // 5MB max
              throw new Error(`Fichier trop volumineux pour le composant ${comp.product}. Taille maximale: 5MB.`);
            }

            try {
              const uploadedFile = await uploadFileToSupabase(
                imageFile,
                `Composant_${comp.product}_${Date.now()}`
              );
              imageUrl = uploadedFile.url;
            } catch (uploadError) {
              console.error("Erreur upload composant:", uploadError);
              throw new Error(`Erreur lors de l'upload de l'image du composant ${comp.product}`);
            }
          }
          // CAS 2: Image existante conservée (string dans comp.image)
          else if (comp.image && typeof comp.image === 'string' && comp.image.trim() !== '') {
            imageUrl = comp.image;
          }
          // CAS 3: Pas d'image ou image supprimée
          else {
            imageUrl = null;
          }

          return {
            product: comp.product || "",
            quantity: parseInt(comp.quantity) || 0,
            image: imageUrl,
          };
        })
      );

      // Suppression des anciennes images qui ne sont plus utilisées
      const nouvellesImageUrls = composantsWithImages
        .map(comp => comp.image)
        .filter(url => url !== null) as string[];

      for (const ancienComposant of catalogueExistant.composant) {
        if (ancienComposant.image && !nouvellesImageUrls.includes(ancienComposant.image)) {
          try {
            await deleteFileFromSupabase(ancienComposant.image);
          } catch (deleteError) {
            console.error("Erreur suppression ancienne image:", deleteError);
            // On continue malgré l'erreur de suppression
          }
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
    
    // Gestion des erreurs spécifiques
    if (error instanceof Error) {
      if (error.message.includes("Type de fichier non autorisé") || 
          error.message.includes("Fichier trop volumineux") ||
          error.message.includes("Erreur lors de l'upload")) {
        return NextResponse.json(
          { message: error.message, success: false },
          { status: 400 }
        );
      }
    }
    
    return NextResponse.json(
      {
        message: "Erreur serveur",
        error: error instanceof Error ? error.message : "Erreur inconnue",
        success: false
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// DELETE - Suppression d'un catalogue (VERSION AMÉLIORÉE)
export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;

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

    // Supprimer les images des composants
    for (const composant of catalogueToDelete.composant) {
      if (composant.image) {
        try {
          await deleteFileFromSupabase(composant.image);
        } catch (deleteError) {
          console.error("Erreur suppression image:", deleteError);
          // On continue malgré l'erreur de suppression
        }
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
        message: "Erreur serveur",
        error: error instanceof Error ? error.message : "Erreur inconnue",
        success: false
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}