import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

import { safeDeleteFromBlob, uploadFileToBlob } from "@/src/lib/vercelBlodAction";

const prisma = new PrismaClient();



// GET - Récupération d'un utilisateur
export async function GET(request: NextRequest,{ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;

    try {
        const donnees = await prisma.user.findUnique({
            where: { id : id },
        });

        return NextResponse.json(
            {
                message: "Reçu avec succès",
                data: donnees,
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

// PATCH - Mise à jour d'un utilisateur
export async function PATCH(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const id = (await params).id;

    try {
        const res = await request.formData();

        // DESTRUCTURATION 
        const name = res.get("name") as string;
        const email = res.get("email") as string;
        const phone = res.get("phone") as string;
        const province = res.get("province") as string;
        const position = res.get("position") as string;
        const role = res.get("role") as string;
        const image = res.get("image");

        if (image instanceof File) {
            // Récupérer l'ancienne image
            const currentUser = await prisma.user.findUnique({
                where: { id },
                select: { image: true }
            });

            // Supprimer l'ancienne image SEULEMENT si elle est sur Vercel Blob
            if (currentUser?.image) {
                await safeDeleteFromBlob(currentUser.image);
            }

            // Upload de la nouvelle image vers Vercel Blob
            const uploadedFile = await uploadFileToBlob(
                image,
                `Team_${name}`
            );

            await prisma.user.update({
                where: { id },
                data: {
                    name: name,
                    image: uploadedFile.url,
                    email: email,
                    provence: province,
                    position: position,
                    role: role,
                    phone: phone
                },
            });

        } else {
            // Mise à jour sans changement d'image
            await prisma.user.update({
                where: { id },
                data: {
                    name: name,
                    email: email,
                    provence: province,
                    position: position,
                    role: role,
                    phone: phone
                },
            });
        }

        return NextResponse.json(
            { message: 'Succès', success: true },
            { status: 200 } // 200 pour une mise à jour, pas 201
        );

    } catch (error) {
        console.error("Erreur:", error);
        return NextResponse.json(
            { message: "Erreur serveur", error: error },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}

// DELETE - Suppression d'un utilisateur
export async function DELETE(   request: NextRequest,  
    { params }: { params: Promise<{ id:string }> }
) {
    const id = (await params).id;

    try {
        // Vérifier que l'utilisateur existe
        const userToDelete = await prisma.user.findUnique({
            where: { id },
            select: { 
                id: true,
                email: true,
                name: true,
                image: true,
                role: true,
                // 🔥 Inclure les relations pour vérification
                sessions: { select: { id: true } },
                accounts: { select: { id: true } }
            }
        });

         if (!userToDelete) {
            return NextResponse.json(
                { message: "Utilisateur non trouvé", success: false },
                { status: 404 }
            );
        }

         // 🔥 Protection contre la suppression d'admin principal
        if (userToDelete.role === 'admin') {
            return NextResponse.json(
                { message: "Impossible de supprimer cet administrateur", success: false },
                { status: 403 }
            );
        }
        // Supprimer l'image SEULEMENT si elle est sur Vercel Blob
        if (userToDelete?.image) {
            await safeDeleteFromBlob(userToDelete.image);
        }

        // Suppression dans la base de données
        // Note: Better Auth gère automatiquement les relations cascades
        await prisma.user.delete({
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