
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

// DELETE - Suppression d'un utilisateur
export async function DELETE(   request: NextRequest,  
    { params }: { params: Promise<{ id:string }> }
) {
    const id = (await params).id;

    try {
        // Vérifier que l'utilisateur existe
        const campagneToDelete = await prisma.campagne.findUnique({
            where: { id },
        });

         if (!campagneToDelete) {
            return NextResponse.json(
                { message: "campagne non trouvé", success: false },
                { status: 404 }
            );
        }

        
        // Suppression dans la base de données
        // Note: Better Auth gère automatiquement les relations cascades
        await prisma.campagne.delete({
            where: { id }
        });

        return NextResponse.json(
            { message: "Supprimé avec succès", success: true },
            { status: 200 }
        );

    } catch (error) {
        console.error("Erreur lors de la suppression:", error);
        return NextResponse.json(
            { message: `Erreur serveur pour l'ID ${id}`, error: error },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}


// UPDATE CAMPAGNE 
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const id = (await params).id;

  try {
    const res = await request.json();

    // Vérifier que la campagne existe
    const existingCampagne = await prisma.campagne.findUnique({ where: { id } });
    if (!existingCampagne) {
      return NextResponse.json(
        { message: "Campagne non trouvée", success: false },
        { status: 404 }
      );
    }

    // Recalculer les dates seulement si fournies dans le body
    const selectionStartDate = res.selectionStart
      ? new Date(res.selectionStart)
      : existingCampagne.selectionStart;

    const selectionEndDate = res.dureeSelectionJours
      ? new Date( (selectionStartDate?? new Date()).getTime() + Number(res.dureeSelectionJours) * 24 * 60 * 60 * 1000)
      : existingCampagne.selectionEnd;

    const tontineStartDate = new Date(selectionEndDate?? new Date());
    tontineStartDate.setDate(tontineStartDate.getDate() + 1);

    const tontineEndDate = res.dureeTontineSemaines
      ? new Date(tontineStartDate.getTime() + Number(res.dureeTontineSemaines) * 7 * 24 * 60 * 60 * 1000)
      : existingCampagne.tontineEnd;

    // Mise à jour
    const updatedCampagne = await prisma.campagne.update({
      where: { id },
      data: {
        nom: res.nom ?? existingCampagne.nom,
        dureeSelectionJours: res.dureeSelectionJours
          ? Number(res.dureeSelectionJours)
          : existingCampagne.dureeSelectionJours,
        dureeTontineSemaines: res.dureeTontineSemaines
          ? Number(res.dureeTontineSemaines)
          : existingCampagne.dureeTontineSemaines,
        selectionStart: selectionStartDate,
        selectionEnd: selectionEndDate,
        tontineStart: tontineStartDate,
        tontineEnd: tontineEndDate,
        campagneStatut: res.campagneStatut ?? existingCampagne.campagneStatut,
        createdAt: new Date(),
      },
    });

    return NextResponse.json(
      {
        message: "Campagne mise à jour avec succès",
        success: true,
        data: updatedCampagne,
      },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la mise à jour:", error);
    return NextResponse.json(
      { message: `Erreur serveur pour l'ID ${id}`, error, success: false },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}