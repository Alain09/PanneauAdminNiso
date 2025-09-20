import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";
import { uploadFileToSupabase,validateFileSize, validateFileType } from "@/src/lib/subaStorage"; 

const prisma = new PrismaClient();

export async function GET() {
  try {
    const donnee = await prisma.user.findMany();
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
    const res = await request.formData();

    // DESTRUCTURATION
    const name = (res.get("name") as string) ?? "";
    const email = (res.get("email") as string) ?? "";
    const phone = (res.get("phone") as string) ?? "";
    const provence = (res.get("provence") as string) ?? "";
    const position = (res.get("position") as string) ?? "";
    const role = (res.get("role") as string) ?? "";
    const password = (res.get("password") as string) ?? "";
    const file = res.get("image") as File;

    // Upload image si présente
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
        // Upload vers Supabase Storage
        const uploadResult = await uploadFileToSupabase(file, `Team_${name}`);
        imageUrl = uploadResult.url;
        
      } catch (uploadError) {
        console.error("Erreur upload:", uploadError);
        return NextResponse.json(
          { message: "Erreur lors de l'upload de l'image", success: false },
          { status: 500 }
        );
      }
    }

    // Appel de la route sign-up
    const baseUrl = request.nextUrl.origin;
    const dtas = await fetch(`${baseUrl}/api/sign-up`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        authorization: process.env.API_ROUTE_SECRET ?? "",
      },
      body: JSON.stringify({
        name,
        email,
        phone,
        password,
        role,
        image: imageUrl,
        position,
        provence,
      }),
    });

    if (!dtas.ok) {
      return NextResponse.json(
        { message: "Erreur de création", success: false },
        { status: 401 }
      );
    }

    return NextResponse.json(
      { message: "Succès", success: true },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur:", error);
    return NextResponse.json(
      { message: "Erreur serveur", error },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}