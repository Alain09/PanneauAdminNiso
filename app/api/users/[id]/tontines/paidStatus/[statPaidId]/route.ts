// api/users/[id]/tontine/paidStatus/[statPaidId]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";


const prisma = new PrismaClient();
interface RouteParams {
    id: string; // userId
    statPaidId: string; // categoryId (de la table Categories)
}

interface UpdatePaymentStatusBody {
    status: "Payé" | "En retard" | "En cours" | "En attente";
    datePaiement?: string; // ISO date string
}

export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<RouteParams> }
) {
    try {
        const { id: userId, statPaidId } = await params;
        const body: UpdatePaymentStatusBody = await request.json();
        const { status, datePaiement } = body;

        if (!userId || !statPaidId) {
            return NextResponse.json(
                { message: "ID utilisateur et ID paiement requis", success: false },
                { status: 400 }
            );
        }

        if (!status) {
            return NextResponse.json(
                { message: "Statut requis", success: false },
                { status: 400 }
            );
        }

        // Récupérer le paiement à mettre à jour
        const paymentToUpdate = await prisma.categories.findUnique({
            where: { id: statPaidId },
            include: {
                categoriesStatistiquesPayement: {
                    include: {
                        user: true,
                        detailPaiementOfThisCategorie: true
                    }
                }
            }
        });

        if (!paymentToUpdate) {
            return NextResponse.json(
                { message: "Paiement non trouvé", success: false },
                { status: 404 }
            );
        }

        // Vérifier que le paiement appartient bien à cet utilisateur
        if (paymentToUpdate.categoriesStatistiquesPayement.userId !== userId) {
            return NextResponse.json(
                { message: "Ce paiement n'appartient pas à cet utilisateur", success: false },
                { status: 403 }
            );
        }

        // Préparer les données de mise à jour
        const updateData: any = { status };
        if (datePaiement) {
            updateData.datePaiement = new Date(datePaiement);
        } else if (status === "Payé") {
            updateData.datePaiement = new Date();
        }

        // Mettre à jour le paiement
        const updatedPayment = await prisma.categories.update({
            where: { id: statPaidId },
            data: updateData
        });

        // Récupérer tous les paiements de cette catégorie pour recalculer les statistiques
        const allPaymentsOfCategory = await prisma.categories.findMany({
            where: {
                categoriesStatistiquesPayementId: paymentToUpdate.categoriesStatistiquesPayement.id
            }
        });

        // Calculer les nouvelles statistiques de la catégorie
        const paidPayments = allPaymentsOfCategory.filter(p => p.status === "Payé");
        const weekValided = paidPayments.length;
        const totalPaid = paidPayments.reduce((sum, p) => sum + p.totalToPayByWeekOfThisCategory, 0);

        // Récupérer la campagne active pour connaître le nombre total de semaines
        const activeCampaign = await prisma.campagne.findFirst({
            orderBy: { createdAt: 'desc' }
        });

        const totalWeeks = activeCampaign?.dureeTontineSemaines || 16;

        // Déterminer le nouveau statut de la catégorie
        const allPaymentsPaid = allPaymentsOfCategory.length > 0 &&
            allPaymentsOfCategory.every(p => p.status === "Payé") &&
            allPaymentsOfCategory.length === totalWeeks;

        const categoryStatus = allPaymentsPaid ? "Terminé" : "En cours";

        // Mettre à jour les statistiques de la catégorie
        const updatedCategoryStats = await prisma.categoriesStatisquesPayement.update({
            where: { id: paymentToUpdate.categoriesStatistiquesPayement.id },
            data: {
                weekValided,
                totalPaid,
                status: categoryStatus
            }
        });

        // Récupérer toutes les catégories de l'utilisateur pour calculer les statistiques globales
        const allUserCategories = await prisma.categoriesStatisquesPayement.findMany({
            where: { userId }
        });

        // Calculer le montant total global de l'utilisateur
        const montantTotalGlobal = allUserCategories.reduce((sum, cat) => sum + cat.totalPaid, 0);

        // Déterminer le nouveau statut de l'utilisateur
        const allCategoriesCompleted = allUserCategories.length > 0 &&
            allUserCategories.every(cat => cat.status === "Terminé");

        const userStatus = allCategoriesCompleted ? "Terminé" : "En cours";

        // Mettre à jour l'utilisateur
        const updatedUser = await prisma.userProfile.update({
            where: { id: userId },
            data: {
                montantTotalGlobal,
                status: userStatus
            }
        });

        // Récupérer l'utilisateur complet avec toutes les relations pour la réponse
        const fullUpdatedUser = await prisma.userProfile.findUnique({
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
                message: `Paiement mis à jour avec succès - ${status}`,
                success: true,
                totalTime: totalWeeks,
                data: fullUpdatedUser,
                metadata: {
                    updatedPayment: {
                        id: updatedPayment.id,
                        week: updatedPayment.week,
                        status: updatedPayment.status,
                        amount: updatedPayment.totalToPayByWeekOfThisCategory
                    },
                    categoryStats: {
                        id: updatedCategoryStats.id,
                        category: updatedCategoryStats.category,
                        weekValided: updatedCategoryStats.weekValided,
                        totalPaid: updatedCategoryStats.totalPaid,
                        status: updatedCategoryStats.status,
                        progress: `${weekValided}/${totalWeeks} semaines`
                    },
                    userStats: {
                        montantTotalGlobal: updatedUser.montantTotalGlobal,
                        status: updatedUser.status,
                        allCategoriesCompleted
                    },
                    campaign: {
                        totalWeeks,
                        campaignStatus: activeCampaign?.campagneStatut,
                        currentWeek: activeCampaign?.weekActif
                    }
                }
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("❌ Erreur lors de la mise à jour du statut de paiement:", error);

        return NextResponse.json(
            {
                message: "Erreur serveur lors de la mise à jour du statut",
                success: false,
                error: process.env.NODE_ENV === 'development' ? error : undefined
            },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}