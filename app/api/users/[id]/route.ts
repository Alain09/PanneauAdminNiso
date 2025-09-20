//users/[id]/route.ts
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient ,Prisma } from "@/generated/prisma";
import { deleteFileFromSupabase, uploadFileToSupabase, validateFileSize, validateFileType } from "@/src/lib/subaStorage";


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
     // Récupérer la campagne active pour connaître le nombre total de semaines
    const activeCampaign = await prisma.campagne.findFirst({
      orderBy: { createdAt: 'desc' }
    });
    const totalWeeks = activeCampaign?.dureeTontineSemaines || 40;


    return NextResponse.json(
      { 
        message: "Profil récupéré avec succès", 
        success: true,
        data: userProfile,
        totalWeeks:totalWeeks
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

        // Supprimer l'image si elle existe
        if (existingUser.image) {
            try {
                await deleteFileFromSupabase(existingUser.image);
            } catch (deleteError) {
                console.error("Erreur lors de la suppression de l'image:", deleteError);
                // On continue malgré l'erreur de suppression d'image
            }
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
                error: process.env.NODE_ENV === 'development' ? error instanceof Error ? error.message : "Erreur inconnue" : undefined
            },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}

// PATCH - Mise à jour des informations personnelles
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
    
    // GESTION DE L'IMAGE
    const imageData = res.get("image");
    let imageUrl = existingUser.image; // Conserver l'image existante par défaut
    let oldImageToDelete: string | null = null;

    if (imageData) {
      // CAS 1: C'est un nouveau fichier (File object)
      if (imageData instanceof File && imageData.size > 0) {
        // Validation du fichier
        if (!validateFileType(imageData)) {
          return NextResponse.json(
            { message: "Type de fichier non autorisé. Utilisez JPG, PNG, WebP ou GIF.", success: false },
            { status: 400 }
          );
        }

        if (!validateFileSize(imageData, 5)) { // 5MB max
          return NextResponse.json(
            { message: "Fichier trop volumineux. Taille maximale: 5MB.", success: false },
            { status: 400 }
          );
        }

        try {
          // Sauvegarder l'ancienne image pour suppression ultérieure
          if (existingUser.image) {
            oldImageToDelete = existingUser.image;
          }

          const uploadedFile = await uploadFileToSupabase(
            imageData, 
            `UserProfile_${firstName || existingUser.firstName}_${lastName || existingUser.lastName}_${Date.now()}`
          );
          imageUrl = uploadedFile.url;
        } catch (uploadError) {
          console.error("Erreur lors de l'upload de l'image:", uploadError);
          return NextResponse.json(
            { message: "Erreur lors de l'upload de l'image", success: false },
            { status: 500 }
          );
        }
      }
      // CAS 2: C'est une URL string (image existante ou nouvelle URL)
      else if (typeof imageData === 'string' && imageData.trim() !== '') {
        imageUrl = imageData;
      }
      // CAS 3: String vide ou null = supprimer l'image
      else if (typeof imageData === 'string' && imageData.trim() === '') {
        if (existingUser.image) {
          oldImageToDelete = existingUser.image;
        }
        imageUrl = null;
      }
    }

    // Préparation des données à mettre à jour
    const updateData: Prisma.UserProfileUpdateInput = {};

    
    if (firstName) updateData.firstName = firstName;
    if (lastName) updateData.lastName = lastName;
    if (profession !== undefined) updateData.profession = profession || null;
    if (contact !== undefined) updateData.contact = contact || null;
    if (role !== undefined) updateData.role = role || null;
    if (position !== undefined) updateData.position = position || null;
    if (provence !== undefined) updateData.provence = provence || null;
    if (description !== undefined) updateData.description = description || null;
    
    // MISE À JOUR DE L'IMAGE
    updateData.image = imageUrl;

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

    // Supprimer l'ancienne image après la mise à jour réussie
    if (oldImageToDelete) {
      try {
        await deleteFileFromSupabase(oldImageToDelete);
      } catch (deleteError) {
        console.error("Erreur lors de la suppression de l'ancienne image:", deleteError);
        // On continue malgré l'erreur de suppression
      }
    }


    
    return NextResponse.json(
      { 
        message: "Profil mis à jour avec succès", 
        success: true,
        data: updatedUserProfile
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Erreur lors de la mise à jour du profil:", error);
    
    // Gestion des erreurs de validation Prisma
    if (typeof error === "object" && error !== null && "code" in error) {
      const prismaError = error as { code: string };
      if (prismaError.code === "P2002") {
        return NextResponse.json(
          { message: "Un utilisateur avec ces informations existe déjà", success: false },
          { status: 400 }
        );
      }
    }
    
    return NextResponse.json(
      { 
        message: "Erreur serveur lors de la mise à jour", 
        success: false,
        error: process.env.NODE_ENV === 'development' ? error instanceof Error ? error.message : "Erreur inconnue" : undefined
      },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}




