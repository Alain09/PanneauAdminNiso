// api/users/[id]/tontine/[optionId]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient()
interface RouteParams {
  id: string;
  optionId: string;
}

export async function DELETE(
  request: NextRequest,
  { params }: { params: Promise<RouteParams> }
) {
  try {
    const { id, optionId } = await params;

    if (!id || !optionId) {
      return NextResponse.json(
        { message: "ID utilisateur et ID option requis", success: false },
        { status: 400 }
      );
    }

    // Vérifier si l'utilisateur existe
    const existingUser = await prisma.userProfile.findUnique({
      where: { id: id }
    });

    if (!existingUser) {
      return NextResponse.json(
        { message: "Utilisateur non trouvé", success: false },
        { status: 404 }
      );
    }

    // Récupérer l'option à supprimer avec sa catégorie
    const optionToDelete = await prisma.tontineOption.findUnique({
      where: { id: optionId },
      include: {
        categoriesStatistiquesPayement: {
          include: {
            optionsDescription: true
          }
        },
        components: true
      }
    });

    if (!optionToDelete) {
      return NextResponse.json(
        { message: "Option non trouvée", success: false },
        { status: 404 }
      );
    }

    // Vérifier que l'option appartient bien à cet utilisateur
    if (optionToDelete.categoriesStatistiquesPayement.userId !== id) {
      return NextResponse.json(
        { message: "Cette option n'appartient pas à cet utilisateur", success: false },
        { status: 403 }
      );
    }

    const categoryStats = optionToDelete.categoriesStatistiquesPayement;
    const remainingOptions = categoryStats.optionsDescription.filter(opt => opt.id !== optionId);

    // CAS 1: C'était la dernière option de la catégorie -> Supprimer toute la catégorie
    if (remainingOptions.length === 0) {
      console.log(`🗑️ Suppression de toute la catégorie ${categoryStats.category} (dernière option)`);
      
      // Supprimer tous les paiements de cette catégorie
      await prisma.categories.deleteMany({
        where: {
          categoriesStatistiquesPayementId: categoryStats.id
        }
      });

      // Supprimer toutes les options et leurs composants (cascade automatique)
      await prisma.tontineOption.deleteMany({
        where: {
          categoriesStatistiquesPayementId: categoryStats.id
        }
      });

      // Supprimer la catégorie elle-même
      await prisma.categoriesStatisquesPayement.delete({
        where: { id: categoryStats.id }
      });

      console.log(`✅ Catégorie ${categoryStats.category} supprimée complètement`);

    } 
    // CAS 2: Il reste d'autres options -> Supprimer seulement cette option et recalculer
    else {
      console.log(`🔄 Suppression de l'option ${optionToDelete.option} de la catégorie ${categoryStats.category}`);
      
      // Supprimer l'option (les composants seront supprimés automatiquement par cascade)
      await prisma.tontineOption.delete({
        where: { id: optionId }
      });

      // Recalculer les totaux pour la catégorie
      const newTotalPaidByWeek = remainingOptions
        .filter(opt => opt.id !== optionId)
        .reduce((sum, opt) => sum + (opt.totalToPayByWeekOfThisOption ?? 0), 0);

      // Mettre à jour listOptions (retirer l'option supprimée)
      const newListOptions = categoryStats.listOptions.filter(opt => opt !== optionToDelete.option);

      // Mettre à jour la catégorie
      await prisma.categoriesStatisquesPayement.update({
        where: { id: categoryStats.id },
        data: {
          listOptions: newListOptions,
          totalPaidByWeek: newTotalPaidByWeek
        }
      });

      // Mettre à jour tous les paiements existants avec le nouveau montant
      await prisma.categories.updateMany({
        where: {
          categoriesStatistiquesPayementId: categoryStats.id
        },
        data: {
          totalToPayByWeekOfThisCategory: newTotalPaidByWeek
        }
      });

      console.log(`✅ Option supprimée. Nouveau total hebdomadaire: ${newTotalPaidByWeek}`);
    }

    // Récupérer l'utilisateur mis à jour
    const updatedUser = await prisma.userProfile.findUnique({
      where: { id: id },
      include: {
        categoriesStatistiques: {
          include: {
            optionsDescription: {
              include: {
                components: true
              }
            },
            detailPaiementOfThisCategorie: {
              orderBy: {
                week: 'asc'
              }
            }
          }
        }
      }
    });

    return NextResponse.json(
      {
        message: remainingOptions.length === 0 
          ? `Catégorie ${categoryStats.category} supprimée complètement` 
          : `Option ${optionToDelete.option} supprimée de la catégorie ${categoryStats.category}`,
        success: true,
        data: updatedUser,
        metadata: {
          deletedOption: {
            id: optionToDelete.id,
            category: optionToDelete.category,
            option: optionToDelete.option
          },
          categoryDeleted: remainingOptions.length === 0,
          remainingOptions: remainingOptions.length
        }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("❌ Erreur lors de la suppression de l'option:", error);
    
    return NextResponse.json(
      {
        message: "Erreur serveur lors de la suppression",
        success: false,
        error: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

// GET - Récupérer une option spécifique
{ /*  
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<RouteParams> }
) {
  try {
    const { userId, optionId } = await params;

    if (!userId || !optionId) {
      return NextResponse.json(
        { message: "ID utilisateur et ID option requis", success: false },
        { status: 400 }
      );
    }

    // Récupérer l'option avec tous ses détails
    const option = await prisma.tontineOption.findUnique({
      where: { id: optionId },
      include: {
        categoriesStatistiquesPayement: {
          where: { userId }, // S'assurer que l'option appartient à l'utilisateur
          include: {
            detailPaiementOfThisCategorie: {
              orderBy: { week: 'asc' }
            }
          }
        },
        components: true
      }
    });

    if (!option || !option.categoriesStatistiquesPayement) {
      return NextResponse.json(
        { message: "Option non trouvée ou n'appartient pas à cet utilisateur", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      {
        message: "Option récupérée avec succès",
        success: true,
        data: option
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("❌ Erreur lors de la récupération de l'option:", error);
    
    return NextResponse.json(
      {
        message: "Erreur serveur lors de la récupération",
        success: false,
        error: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}


// PATCH - Modifier une option spécifique (bonus)
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<RouteParams> }
) {
  try {
    const { userId, optionId } = await params;
    const body = await request.json();
    const { countOption } = body;

    if (!userId || !optionId) {
      return NextResponse.json(
        { message: "ID utilisateur et ID option requis", success: false },
        { status: 400 }
      );
    }

    // Récupérer l'option existante
    const existingOption = await prisma.tontineOption.findUnique({
      where: { id: optionId },
      include: {
        categoriesStatistiquesPayement: {
          include: {
            optionsDescription: true
          }
        }
      }
    });

    if (!existingOption || existingOption.categoriesStatistiquesPayement.userId !== userId) {
      return NextResponse.json(
        { message: "Option non trouvée ou n'appartient pas à cet utilisateur", success: false },
        { status: 404 }
      );
    }

    // Recalculer le nouveau prix avec le catalogue
    const catalogueItem = await prisma.productCatalogue.findUnique({
      where: {
        categorie_option: {
          categorie: existingOption.category,
          option: parseInt(existingOption.option)
        }
      }
    });

    if (!catalogueItem) {
      return NextResponse.json(
        { message: "Produit non trouvé dans le catalogue", success: false },
        { status: 404 }
      );
    }

    const newTotalToPayByWeekOfThisOption = catalogueItem.price * countOption;

    // Mettre à jour l'option
    const updatedOption = await prisma.tontineOption.update({
      where: { id: optionId },
      data: {
        countOption,
        totalToPayByWeekOfThisOption: newTotalToPayByWeekOfThisOption
      }
    });

    // Recalculer le total de la catégorie
    const categoryStats = existingOption.categoriesStatistiquesPayement;
    const allOptions = await prisma.tontineOption.findMany({
      where: {
        categoriesStatistiquesPayementId: categoryStats.id
      }
    });

    const newTotalPaidByWeek = allOptions.reduce((sum, opt) => 
      opt.id === optionId 
        ? sum + newTotalToPayByWeekOfThisOption
        : sum + opt.totalToPayByWeekOfThisOption, 0
    );

    // Mettre à jour la catégorie et tous les paiements
    await prisma.categoriesStatisquesPayement.update({
      where: { id: categoryStats.id },
      data: { totalPaidByWeek: newTotalPaidByWeek }
    });

    await prisma.categories.updateMany({
      where: { categoriesStatistiquesPayementId: categoryStats.id },
      data: { totalToPayByWeekOfThisCategory: newTotalPaidByWeek }
    });

    return NextResponse.json(
      {
        message: "Option mise à jour avec succès",
        success: true,
        data: updatedOption
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("❌ Erreur lors de la modification de l'option:", error);
    
    return NextResponse.json(
      {
        message: "Erreur serveur lors de la modification",
        success: false,
        error: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

*/}