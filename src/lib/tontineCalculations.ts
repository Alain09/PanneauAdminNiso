// utils/tontineCalculations.ts
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient()

export async function calculateWeeklyPayment(category: string, option: string, countOption: number) {
  
  try {
    // Récupérer le prix de base depuis le catalogue
    const catalogueItem = await prisma.productCatalogue.findUnique({
      where: {
        categorie_option: {
          categorie: category,
          option: parseInt(option)
        }
      }
    });

    if (!catalogueItem) {
      throw new Error(`Aucun produit trouvé pour la catégorie ${category}, option ${option}`);
    }

    return catalogueItem.price * countOption;
  } catch (error) {
    console.error("Erreur lors du calcul du paiement hebdomadaire:", error);
    throw error;
  }
}

export function generateWeeklyPayments(
  categoriesStatistiquesPayementId: string,
  category: string,
  totalWeeks: number,
  weeklyAmount: number
) {
  const payments = [];
  
  for (let week = 1; week <= totalWeeks; week++) {
    payments.push({
      category,
      week: `sem ${week}`,
      status: "En attente",
      totalToPayByWeekOfThisCategory: weeklyAmount,
      datePaiement: null,
      categoriesStatistiquesPayementId
    });
  }
  
  return payments;
}

// Fonction pour récupérer les composants depuis le catalogue
export async function getComponentsFromCatalogue(category: string, option: string) {

  
  try {
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
      return [];
    }

     return catalogueItem.composant.map(comp => ({
      compose: `${comp.product} (x${comp.quantity})`,
      image: comp.image
    }));
  } catch (error) {
    console.error("Erreur lors de la récupération des composants:", error);
    return [];
  }
}

// Fonction pour récupérer la campagne active
export async function getActiveCampaign() {
 
  
  try {
    const activeCampaign = await prisma.campagne.findFirst({
      where: {
        campagneStatut: "En cours"
      },
      orderBy: {
        createdAt: 'desc'
      }
    });

    return activeCampaign;
  } catch (error) {
    console.error("Erreur lors de la récupération de la campagne active:", error);
    return null;
  }
}