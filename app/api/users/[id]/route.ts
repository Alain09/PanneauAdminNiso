import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import { safeDeleteFromBlob, uploadFileToBlob } from "@/src/lib/vercelBlodAction";

const prisma = new PrismaClient();


// GET - Récupérer un utilisateur spécifique par ID
export async function GET(request: NextRequest,
    
    { params }: { params: Promise<{ id: string }> }) {
  try {
   const id = (await params).id;

    if (!id) {
      return NextResponse.json(
        { message: "ID utilisateur requis", success: false },
        { status: 400 }
      );
    }

    const userProfile = await prisma.userProfile.findUnique({
      where: { id },
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
                createdAt: 'desc'
              }
            }
          }
        }
      }
    });

    if (!userProfile) {
      return NextResponse.json(
        { message: "Utilisateur non trouvé", success: false },
        { status: 404 }
      );
    }

    return NextResponse.json(
      { 
        message: "Profil récupéré avec succès", 
        success: true,
        data: userProfile
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Erreur lors de la récupération du profil:", error);
    
    return NextResponse.json(
      { 
        message: "Erreur serveur lors de la récupération", 
        success: false 
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}


// DELETE - Supprimer un utilisateur spécifique
export async function DELETE(
    request: NextRequest,
    { params }: { params: Promise<{ id: string }> }
) {
    const id = (await params).id;
    try {

        if (!id) {
            return NextResponse.json(
                { message: "ID utilisateur requis", success: false },
                { status: 400 }
            );
        }

        // Vérifier si l'utilisateur existe
        const existingUser = await prisma.userProfile.findUnique({
            where: { id },
            include: {
                categoriesStatistiques: {
                    include: {
                        optionsDescription: {
                            include: {
                                components: true
                            }
                        },
                        detailPaiementOfThisCategorie: true
                    }
                }
            }
        });

        if (!existingUser) {
            return NextResponse.json(
                { message: "Utilisateur non trouvé", success: false },
                { status: 404 }
            );
        }

        // on verifie d'abord si l'image existe puis supprimer dans vercel 
        if (existingUser.image) {
            await safeDeleteFromBlob(existingUser.image);
        }

        // Suppression de l'utilisateur (Prisma gère la suppression en cascade automatiquement)
        await prisma.userProfile.delete({
            where: { id }
        });

        return NextResponse.json(
            {
                message: "Profil supprimé avec succès",
                success: true,
                data: {
                    deletedUser: {
                        id: existingUser.id,
                        firstName: existingUser.firstName,
                        lastName: existingUser.lastName
                    }
                }
            },
            { status: 200 }
        );

    } catch (error) {
        console.error("Erreur lors de la suppression du profil:", error);

        // Gestion d'erreurs spécifiques
        if (error instanceof Error && error.message.includes("foreign key constraint")) {
            return NextResponse.json(
                {
                    message: "Impossible de supprimer cet utilisateur car il est lié à d'autres données",
                    success: false
                },
                { status: 409 }
            );
        }

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

// mise des infor perso
// PUT - Mettre à jour un utilisateur spécifique
export async function PATCH(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const id = (await params).id;

    if (!id) {
      return NextResponse.json(
        { message: "ID utilisateur requis", success: false },
        { status: 400 }
      );
    }

    // Vérifier si l'utilisateur existe
    const existingUser = await prisma.userProfile.findUnique({
      where: { id }
    });

    if (!existingUser) {
      return NextResponse.json(
        { message: "Utilisateur non trouvé", success: false },
        { status: 404 }
      );
    }

    const res = await request.formData();

    // DESTRUCTURATION des données du formulaire
    const firstName = res.get("firstName") as string;
    const lastName = res.get("lastName") as string;
    const profession = res.get("profession") as string;
    const contact = res.get("contact") as string;
    const role = res.get("role") as string;
    const position = res.get("position") as string;
    const provence = res.get("provence") as string;
    const description = res.get("description") as string;
    
    // 🎯 GESTION INTELLIGENTE DE L'IMAGE
    const imageData = res.get("image"); // Peut être File ou string
    
    let imageUrl = existingUser.image; // Conserver l'image existante par défaut
    
    if (imageData) {
      // 📁 CAS 1: C'est un nouveau fichier (File object)
      if (imageData instanceof File && imageData.size > 0) {
        try {
          console.log("🔄 Upload d'un nouveau fichier:", imageData.name);
          const uploadedFile = await uploadFileToBlob(
            imageData, 
            `UserProfile_${firstName || existingUser.firstName}_${lastName || existingUser.lastName}`
          );
          imageUrl = uploadedFile.url;
        } catch (uploadError) {
          console.error("❌ Erreur lors de l'upload de l'image:", uploadError);
          // Continuer avec l'image existante
        }
      }
      // 🔗 CAS 2: C'est une URL string (image existante ou nouvelle URL)
      else if (typeof imageData === 'string' && imageData.trim() !== '') {
        console.log("🔗 Utilisation d'une URL string:", imageData);
        imageUrl = imageData;
      }
      // 🗑️ CAS 3: String vide ou null = supprimer l'image
      else if (typeof imageData === 'string' && imageData.trim() === '') {
        console.log("🗑️ Suppression de l'image");
        imageUrl = null;
      }
    }
    // Si imageData n'existe pas du tout, on garde l'image existante

    // Préparation des données à mettre à jour
    const updateData: any = {};
    
    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (profession !== undefined) updateData.profession = profession || null;
    if (contact !== undefined) updateData.contact = contact || null;
    if (role !== undefined) updateData.role = role || null;
    if (position !== undefined) updateData.position = position || null;
    if (provence !== undefined) updateData.provence = provence || null;
    if (description !== undefined) updateData.description = description || null;
    
    // ✅ MISE À JOUR DE L'IMAGE SEULEMENT SI ELLE A CHANGÉ
    if (imageUrl !== existingUser.image) {
      updateData.image = imageUrl;
      console.log("🖼️ Image mise à jour:", existingUser.image, "→", imageUrl);
    }

    // Mise à jour de l'utilisateur
    const updatedUserProfile = await prisma.userProfile.update({
      where: { id },
      data: updateData,
      include: {
        categoriesStatistiques: {
          include: {
            optionsDescription: {
              include: {
                components: true
              }
            },
            detailPaiementOfThisCategorie: true
          }
        }
      }
    });

    return NextResponse.json(
      { 
        message: "Profil mis à jour avec succès", 
        success: true,
        data: updatedUserProfile
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("❌ Erreur lors de la mise à jour du profil:", error);
    
    return NextResponse.json(
      { 
        message: "Erreur serveur lors de la mise à jour", 
        success: false,
        error: process.env.NODE_ENV === 'development' ? error : undefined
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}




