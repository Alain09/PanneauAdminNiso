// app/api/users/route.ts - Routes pour tous les utilisateurs (POST, GET)
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import { uploadFileToSupabase, validateFileSize, validateFileType } from "@/src/lib/subaStorage";


const prisma = new PrismaClient();

// POST - Créer un nouvel utilisateur
export async function POST(request: NextRequest) {
    try {
        const res = await request.formData();

        // DESTRUCTURATION des données du formulaire
        const firstName = (res.get("firstName") as string) ?? "";
        const lastName = (res.get("lastName") as string) ?? "";
        const profession = (res.get("profession") as string) ?? "";
        const contact = (res.get("contact") as string) ?? "";
        const role = (res.get("role") as string) ?? "";
        const position = (res.get("position") as string) ?? "";
        const provence = (res.get("provence") as string) ?? "";
        const description = (res.get("description") as string) ?? "";
        const file = res.get("image") as File;

        // Validation des champs obligatoires
        if (!firstName || !lastName) {
            return NextResponse.json(
                { message: "Le prénom et le nom sont obligatoires", success: false },
                { status: 400 }
            );
        }

        // Upload image si présente avec validation
        let imageUrl: string | null = null;
    

        if (file && file.size > 0) {
            // Validation du fichier
            if (!validateFileType(file)) {
                return NextResponse.json(
                    { message: "Type de fichier non autorisé. Utilisez JPG, PNG, WebP ou GIF.", success: false },
                    { status: 400 }
                );
            }

            if (!validateFileSize(file, 5)) { // 5MB max
                return NextResponse.json(
                    { message: "Fichier trop volumineux. Taille maximale: 5MB.", success: false },
                    { status: 400 }
                );
            }

            try {
                const uploadedFile = await uploadFileToSupabase(
                    file, 
                    `UserProfile_${firstName}_${lastName}_${Date.now()}` // Ajout timestamp pour éviter conflits
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

        // Création de l'utilisateur dans la base de données
        const newUserProfile = await prisma.userProfile.create({
            data: {
                firstName: firstName.trim(),
                lastName: lastName.trim(),
                profession: profession ? profession.trim() : null,
                contact: contact ? contact.trim() : null,
                role: role ? role.trim() : "user",
                position: position ? position.trim() : "AutoGestion",
                image: imageUrl,
                provence: provence ? provence.trim() : null,
                description: description ? description.trim() : null,
                status: "En cours",
                montantTotalGlobal: 0,
            },
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
                message: "Profil utilisateur créé avec succès",
                success: true,
                data: newUserProfile,
                
            },
            { status: 201 }
        );

    } catch (error) {
        console.error("Erreur lors de la création:", error);
        
        // Gestion des erreurs spécifiques Prisma
        if (typeof error === "object" && error !== null && "code" in error) {
            const prismaError = error as { code: string };
            
            if (prismaError.code === "P2002") {
                console.log("La personne que vous tentez de créer existe déjà");
                return NextResponse.json(
                    { message: "La personne que vous tentez de créer existe déjà", success: false },
                    { status: 400 }
                );
            }
        }
        
        return NextResponse.json(
            {
                message: "Erreur serveur lors de la création",
                error: process.env.NODE_ENV === 'development' ? error instanceof Error ? error.message : "Erreur inconnue" : undefined,
                success: false
            },
            { status: 500 }
        );
    } finally {
        await prisma.$disconnect();
    }
}

//Route GET pour récupérer les profils utilisateurs
{/* - Récupérer tous les utilisateurs
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const page = parseInt(searchParams.get("page") || "1");
    const limit = parseInt(searchParams.get("limit") || "10");
    const status = searchParams.get("status");
    const role = searchParams.get("role");
    const search = searchParams.get("search");

    // Construction des filtres
    const where: any = {};
    if (status) where.status = status;
    if (role) where.role = role;
    if (search) {
      where.OR = [
        { firstName: { contains: search, mode: 'insensitive' } },
        { lastName: { contains: search, mode: 'insensitive' } },
        { email: { contains: search, mode: 'insensitive' } },
      ];
    }

    // Pagination
    const skip = (page - 1) * limit;

    const [userProfiles, totalCount] = await Promise.all([
      prisma.userProfile.findMany({
        where,
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc'
        },
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
      }),
      prisma.userProfile.count({ where })
    ]);

    return NextResponse.json(
      { 
        message: "Profils récupérés avec succès", 
        success: true,
        data: userProfiles,
        pagination: {
          current: page,
          total: Math.ceil(totalCount / limit),
          count: userProfiles.length,
          totalRecords: totalCount
        }
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Erreur lors de la récupération des profils:", error);
    
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
}}*/}


// GET - Récupérer tous les utilisateurs
export async function GET(request: NextRequest) {
  try {
    const userProfiles = await prisma.userProfile.findMany({
      orderBy: {
        createdAt: 'desc'
      },
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

    
     const dateCamp = await prisma.campagne.findFirst({
        select:{
          tontineStart:true,
          tontineEnd : true,
          weekActif:true,
          selectionStart :true,
          selectionEnd:true,
          campagneStatut:true
        }
       })

         console.log(` debut `, dateCamp?.tontineStart)

    console.log(userProfiles[0]?.firstName)
    return NextResponse.json(
      { 
        message: "Profils récupérés avec succès", 
        success: true,
        data: userProfiles,
        count: userProfiles.length,
        debut : dateCamp?.tontineStart,
        fin : dateCamp?.tontineEnd,
        weekActif : dateCamp?.weekActif,
        debutSelect : dateCamp?.selectionStart,
        finSelect : dateCamp?.selectionEnd,
        campagneStatut : dateCamp?.campagneStatut
      },
      { status: 200 }
    );

  } catch (error) {
    console.error("Erreur lors de la récupération des profils:", error);
    
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

