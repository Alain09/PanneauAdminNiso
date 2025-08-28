import { NextRequest, NextResponse } from "next/server";
 


//route api pour la recuperation de tous
export async function GET(req: NextRequest) {
    // Récupérer la clé API de l'en-tête de la requête


    try {
   
        return NextResponse.json(
            { message: "Données récupérées avec succès", data: "ok" }, )

    } catch (error) {
        // Gérer les erreurs de la base de données
        console.error("Erreur lors de la récupération des données :", error);
        return NextResponse.json(
            { message: "Erreur serveur", error },
            { status: 500 } // Statut HTTP 500 Internal Server Error
        );
    }
}



