import { auth } from "@/src/lib/auth";
import { NextRequest, NextResponse } from "next/server";
import { PrismaClient } from "@/generated/prisma";

const prisma = new PrismaClient();

export async function POST(request: NextRequest) {
  try {

    const  datas = await request.json()

   // Inscription avec Better Auth
    await auth.api.signUpEmail({
      body: {
        email: datas.email,
        password: datas.password,
        name: datas.name,
        role:datas.role,
      },
    });


    
    // 👉 Ici, si tu veux stocker aussi role, phone, image, etc.
    // utilise Prisma après coup
    await prisma.user.update({
      where: { email: datas.email },
      data: {
        phone: datas?.phone,
        image: datas?.image,
        position: datas?.position,
        provence: datas?.provence,
      },
    });


    return NextResponse.json(
      {
        message: "Utilisateur et TeamMember créés avec succès",
        success: true,
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Erreur lors de la création du compte :", error);
    return NextResponse.json(
      { message: "Erreur serveur", success: false },
      { status: 500 }
    );
  } finally {
    await prisma.$disconnect();
  }
}
