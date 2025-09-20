
// api/users/[id]/tontine/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

import {
  calculateWeeklyPayment
  , getActiveCampaign,
  getComponentsFromCatalogue,
  generateWeeklyPayments
} from "@/src/lib/tontineCalculations"



//---------------------
const prisma = new PrismaClient()

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const userId = (await params).id;

    if (!userId) {
      return NextResponse.json(
        { message: "ID utilisateur requis", success: false },
        { status: 400 }
      );
    }

    // Vérifier si l'utilisateur existe
    const existingUser = await prisma.userProfile.findUnique({
      where: { id: userId },
      include: {
        categoriesStatistiques: true
      }
    });

    if (!existingUser) {
      return NextResponse.json(
        { message: "Utilisateur non trouvé", success: false },
        { status: 404 }
      );
    }

    const body = await request.json();
    const category = body.category;
    const option = body.option;
    const countOption = body.quantity;
    const useActiveCampaign = true, customWeeks = 16

    // Validation des données
    if (!category || !option || !countOption) {
      return NextResponse.json(
        { message: "Catégorie, option et nombre d'options requis", success: false },
        { status: 400 }
      );
    }

    // Vérifier si le produit existe dans le catalogue
    const catalogueItem = await prisma.productCatalogue.findUnique({
      where: {
        categorie_option: {
          categorie: category,
          option: parseInt(option)
        }
      },
      include: {
        composant: true
      }
    });

    if (!catalogueItem) {
      return NextResponse.json(
        { message: `Produit non trouvé dans le catalogue pour la catégorie ${category}, option ${option}`, success: false },
        { status: 404 }
      );
    }

    // Déterminer la durée de la campagne
    let totalWeeks = customWeeks;

    if (useActiveCampaign) {
      const activeCampaign = await getActiveCampaign();
      if (activeCampaign && activeCampaign.dureeTontineSemaines) {
        totalWeeks = activeCampaign.dureeTontineSemaines;
      }
    }

    // Calculer le montant hebdomadaire pour cette option
    const weeklyPaymentForOption = await calculateWeeklyPayment(category, option, countOption);

    // Récupérer les composants depuis le catalogue
    const components = await getComponentsFromCatalogue(category, option);

    // Vérifier si la catégorie existe déjà
    const existingCategory = existingUser.categoriesStatistiques.find(
      cat => cat.category === category
    );

    if (existingCategory) {
      // Mettre à jour la catégorie existante

      // Récupérer les options existantes
      const existingOptions = await prisma.tontineOption.findMany({
        where: {
          categoriesStatistiquesPayementId: existingCategory.id
        }
      });

      // Vérifier si l'option existe déjà
      const existingOption = existingOptions.find(opt => opt.option === option);

      if (existingOption) {
        return NextResponse.json(
          { message: "Cette option existe déjà pour cette catégorie", success: false },
          { status: 400 }
        );
      }

      // Ajouter la nouvelle option
      const newOption = await prisma.tontineOption.create({
        data: {
          category,
          option,
          countOption,
          totalToPayByWeekOfThisOption: weeklyPaymentForOption,
          categoriesStatistiquesPayementId: existingCategory.id,
          components: {
            create: components.map(comp => ({
              compose: comp.compose
            }))
          }
        },
        include: {
          components: true
        }
      });

      // Mettre à jour les listOptions de la catégorie
      const updatedListOptions = [...(existingCategory.listOptions || []), option];

      // Calculer le nouveau totalPaidByWeek
      const allOptions = [...existingOptions, newOption];
      const newTotalPaidByWeek = allOptions.reduce((sum, opt) => sum + (opt?.totalToPayByWeekOfThisOption ?? 0), 0);

      await prisma.categoriesStatisquesPayement.update({
        where: { id: existingCategory.id },
        data: {
          listOptions: updatedListOptions,
          totalPaidByWeek: newTotalPaidByWeek
        }
      });

      // Mettre à jour les paiements hebdomadaires existants
      {/*  */ }
      await prisma.categories.findMany({
        where: {
          categoriesStatistiquesPayementId: existingCategory.id
        },
        orderBy: {
          week: 'asc'
        }
      });

      // Si nous avons besoin de plus de semaines, les créer
      {/*  
      const maxWeekNumber = existingPayments.length;
      if (totalWeeks > maxWeekNumber) {
        const additionalPayments = [];
        for (let week = maxWeekNumber + 1; week <= totalWeeks; week++) {
          additionalPayments.push({
            category,
            week: `sem ${week}`,
            status: "En attente",
            totalToPayByWeekOfThisCategory: newTotalPaidByWeek,
            datePaiement: null,
            categoriesStatistiquesPayementId: existingCategory.id
          });
        }
        
        if (additionalPayments.length > 0) {
          await prisma.categories.createMany({
            data: additionalPayments
          });
        }
      } */}

      // Mettre à jour tous les paiements avec le nouveau montant
      await prisma.categories.updateMany({
        where: {
          categoriesStatistiquesPayementId: existingCategory.id
        },
        data: {
          totalToPayByWeekOfThisCategory: newTotalPaidByWeek
        }
      });

    } else {
      // Créer une nouvelle catégorie
      const newCategoryStatistique = await prisma.categoriesStatisquesPayement.create({
        data: {
          category,
          listOptions: [option],
          userId,
          totalPaidByWeek: weeklyPaymentForOption,
          optionsDescription: {
            create: {
              category,
              option,
              countOption,
              totalToPayByWeekOfThisOption: weeklyPaymentForOption,
              components: {
                create: components.map(comp => ({
                  compose: comp.compose
                }))
              }
            }
          }
        }
      });

      // Générer les paiements hebdomadaires
      const weeklyPayments = generateWeeklyPayments(
        newCategoryStatistique.id,
        category,
        totalWeeks,
        weeklyPaymentForOption
      );

      await prisma.categories.createMany({
        data: weeklyPayments
      });
    }

    // Récupérer l'utilisateur mis à jour avec toutes les relations
    const updatedUser = await prisma.userProfile.findUnique({
      where: { id: userId },
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
        message: "Configuration tontine ajoutée avec succès",
        success: true,
        data: updatedUser,
        metadata: {
          totalWeeks,
          weeklyPayment: weeklyPaymentForOption,
          cataloguePrice: catalogueItem.price,
          components: components.length
        }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("❌ Erreur lors de l'ajout de la configuration tontine:", error);

    return NextResponse.json(
      {
        message: "Erreur serveur lors de l'ajout de la configuration",
        success: false,
        error: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}