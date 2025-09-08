
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