import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import { uploadFileToSupabase, validateFileSize, validateFileType } from "@/src/lib/subaStorage";

const prisma = new PrismaClient();

// GET - Récupération de tous les catalogues de produits
export async function GET() {
    try {
        const donnees = await prisma.productCatalogue.findMany({
            include: {
                composant: true // Inclure les composants liés
            }
        });

        return NextResponse.json(
            {
                message: "Récupération réussie",
                data: donnees,
                success: true
            },
            { status: 200 }
        );
    } catch (error) {
        console.error("Erreur lors de la récupération des données :", error);
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

// POST - Création d'un nouveau catalogue de produits
export async function POST(request: NextRequest) {
    try {
        const res = await request.formData();

        // DESTRUCTURATION des données du catalogue
        const categorie = (res.get("categorie") as string) ?? "";
        const option = parseInt((res.get("option") as string) ?? "0");
        const price = parseInt((res.get("price") as string) ?? "0");
        const totalweek = parseInt((res.get("totalweek") as string) ?? "0");

        // Récupération des composants (format JSON string)
        const composantsData = res.get("composant") as string;
        let composants: any[] = [];

        if (composantsData) {
            try {
                composants = JSON.parse(composantsData);
            } catch (parseError) {
                return NextResponse.json(
                    { message: "Format des composants invalide", success: false },
                    { status: 400 }
                );
            }
        }

        // Validation des données requises
        if (!categorie || option <= 0 || price <= 0 || totalweek <= 0) {
            return NextResponse.json(
                { message: "Données manquantes ou invalides", success: false },
                { status: 400 }
            );
        }

        // Traitement des images des composants
        const composantsWithImages = await Promise.all(
            composants.map(async (comp: any, index: number) => {
                const imageFile = res.get(`composant_image_${index}`) as File;
                let imageUrl: string | null = null;
                let imagePath: string | null = null;

                if (imageFile && imageFile.size > 0) {
                    // Validation du fichier
                    if (!validateFileType(imageFile)) {
                        throw new Error(`Type de fichier non autorisé pour le composant ${comp.product}. Utilisez JPG, PNG, WebP ou GIF.`);
                    }

                    if (!validateFileSize(imageFile, 5)) { // 5MB max
                        throw new Error(`Fichier trop volumineux pour le composant ${comp.product}. Taille maximale: 5MB.`);
                    }

                    try {
                        // Upload vers Supabase Storage
                        const uploadResult = await uploadFileToSupabase(
                            imageFile, 
                            `Composant_${comp.product}_${Date.now()}`
                        );
                        imageUrl = uploadResult.url;
                        imagePath = uploadResult.path;
                    } catch (uploadError) {
                        console.error("Erreur upload composant:", uploadError);
                        throw new Error(`Erreur lors de l'upload de l'image du composant ${comp.product}`);
                    }
                }

                return {
                    product: comp.product || "",
                    quantity: parseInt(comp.quantity) || 0,
                    image: imageUrl
                };
            })
        );

        // Création du catalogue avec ses composants
        const nouveauCatalogue = await prisma.productCatalogue.create({
            data: {
                categorie,
                option,
                price,
                totalweek,
                composant: {
                    create: composantsWithImages
                }
            },
            include: {
                composant: true
            }
        });

        return NextResponse.json(
            {
                message: "Catalogue créé avec succès",
                data: nouveauCatalogue,
                success: true
            },
            { status: 201 }
        );

    } catch (error) {
        console.error("Erreur lors de la création:", error);
        
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
        
        if (typeof error === "object" && error !== null && "code" in error && (error as any).code === "P2002") {
            return NextResponse.json(
                { message: "Un catalogue avec cette catégorie et option existe déjà", success: false },
                { status: 400 }
            );
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