import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import { uploadFileToBlob } from "@/src/lib/vercelBlodAction";

const prisma = new PrismaClient();

export async function GET() {
  try {
    const donnee = await prisma.campagne.findMany();
    return NextResponse.json(
      { message: "succès", data: donnee, success: true },
      { status: 200 }
    );
  } catch (error) {
    console.error("Erreur lors de la récupération des données :", error);
    return NextResponse.json(
      { message: "Erreur serveur", success: false },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}

export async function POST(request: NextRequest) {
  try {
    const res = await request.json();
    


    // Conversion de la date de début de sélection
    const selectionStartDate = new Date(res.selectionStart);
    
   

    // Calcul de la date de fin de sélection (selectionStart + dureeSelectionJours)
    const selectionEndDate = new Date(selectionStartDate);
    selectionEndDate.setDate(selectionEndDate.getDate() + Number(res.dureeSelectionJours));

    // Calcul de la date de début de tontine (lendemain de la fin de sélection)
    const tontineStartDate = new Date(selectionEndDate);
    tontineStartDate.setDate(tontineStartDate.getDate() + 1);

    // Calcul de la date de fin de tontine (tontineStart + dureeTontineSemaines en semaines)
    const tontineEndDate = new Date(tontineStartDate);
    tontineEndDate.setDate(tontineEndDate.getDate() + (Number(res.dureeTontineSemaines) * 7));

    // Statut initial par défaut (sera géré par l'automatisation Supabase)
    const campagneStatut = "En cours";
 

    //------------------
    console.log("Dates calculées:", {
      selectionStart: selectionStartDate,
      selectionEnd: selectionEndDate,
      tontineStart: tontineStartDate,
      tontineEnd: tontineEndDate,
      dureeSelectionJours: res.dureeSelectionJours,
      dureeTontineSemaines: res.dureeTontineSemaines
    });

    // Création de la campagne avec tous les champs calculés
    const nouvelleCampagne = await prisma.campagne.create({
      data: {
        nom: res.nom,
        weekActif: null, // Sera géré par l'automatisation Supabase
        campagneStatut: campagneStatut,
        dureeSelectionJours: Number(res.dureeSelectionJours),
        dureeTontineSemaines: Number(res.dureeTontineSemaines),
        selectionStart: selectionStartDate,
        selectionEnd: selectionEndDate,
        tontineStart: tontineStartDate,
        tontineEnd: tontineEndDate,
        createdAt: new Date()
      }
    });

    return NextResponse.json(
      { 
        message: "Campagne créée avec succès", 
        success: true,
        data: {
          id: nouvelleCampagne.id,
          nom: nouvelleCampagne.nom,
          status: nouvelleCampagne.status,
          campagneStatut: nouvelleCampagne.campagneStatut,
          selectionStart: nouvelleCampagne.selectionStart,
          selectionEnd: nouvelleCampagne.selectionEnd,
          tontineStart: nouvelleCampagne.tontineStart,
          tontineEnd: nouvelleCampagne.tontineEnd
        }
      },
      { status: 201 }
    );

  } catch (error) {
    console.error("Erreur lors de la création de la campagne:", error);
    
    // Gestion d'erreurs spécifiques de Prisma
    if (error instanceof Error) {
      return NextResponse.json(
        { 
          message: "Erreur lors de la création de la campagne", 
          error: error.message,
          success: false 
        },
        { status: 500 }
      );
    }
    
    return NextResponse.json(
      { 
        message: "Erreur serveur interne", 
        success: false 
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
