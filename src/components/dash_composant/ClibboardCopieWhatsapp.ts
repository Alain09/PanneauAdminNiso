
import { PaymentHistoryWeekActif, UsersLatePayment } from "@/type";


interface User {
    datas: PaymentHistoryWeekActif[];
    weekActif: number;
    debut:Date
}

interface Userlate {
    datas: UsersLatePayment[];
    weekActif: number | null;
    debut : Date
}

import { calculerDatesSemaine, formatDate } from "../hook_perso";


//---------------------- clipboad of payement--------------

export const copyToClipboardForWhatsApp = async ({
    datas,
    weekActif , debut }: User): Promise<boolean> => {
     try {
        // Filtrer seulement les utilisateurs avec statut "Payé"
        //const paidUsers = datas.filter(user => user.status === "Payé");

        if (datas.length === 0) {
            alert("Aucun utilisateur avec statut 'Payé' à copier");
            return false;
        }

       

        // Formater la date
        const bod = calculerDatesSemaine(weekActif, new Date(debut as Date))
            

        // Créer le texte à copier
        let textToCopy = `💙 *${weekActif === 1 ? "1ème" : `${weekActif}ème`} semaine* 💙\n`;
        textToCopy += `Du (${formatDate(bod.dateDebut)} au ${formatDate(bod.dateFin)}) \n\n`;

        if (datas[0].status === "Payé") {
            textToCopy += `*Liste des membres actifs pour la semaine* :\n\n`;
        } else {
            textToCopy += `*Voici la liste des membres en pénalité de la semaine* :\n\n`;
        }

        // Ajouter chaque utilisateur avec un numéro et un checkmark
        datas.forEach((user, index) => {
            textToCopy += ` ${index + 1}) ${user.firstName} ${user.lastName} ${datas[0].status === "En retard" ? "❌" : "✅"}  \n`;
        });

        textToCopy += "\nAgréable semaine 💙 à vous";

        // Copier dans le presse-papier
        await navigator.clipboard.writeText(textToCopy);
        return true;

    } catch(err) {
        console.log('Erreur lors de la copie: ', err);
        alert("Erreur lors de la copie");
        
        return false;
    }
};


// pour les utilisateur uniquement en retard

export const copyToClipboardLate = async ({ datas, weekActif,debut }: Userlate): Promise<boolean> => {

    try {
        // Filtrer seulement les utilisateurs avec statut "Payé"
        //const paidUsers = datas.filter(user => user.status === "Payé");

        

        if (datas.length === 0) {
            alert("Aucun utilisateur avec statut 'Payé' à copier");
            return false;
        }

        // Formater la date
        const bod = calculerDatesSemaine(weekActif, new Date(debut))
            ;


        // Créer le texte à copier
        let textToCopy = `💙 *${weekActif === 1 ? "1ème" : `${weekActif}ème`} semaine* 💙\n`;
        textToCopy += `Du (${formatDate(bod.dateDebut)} au ${formatDate(bod.dateFin)}) \n\n`;

        if (datas[0].status === "Payé") {
            textToCopy += `*Liste des membres actifs pour la semaine* :\n\n`;
        } else {
            textToCopy += `*Voici la liste des membres en pénalité de la semaine* :\n\n`;
        }

        // Ajouter chaque utilisateur avec un numéro et un checkmark
        datas.forEach((user, index) => {
            textToCopy += ` ${index + 1}) ${user.firstName} ${user.lastName} ${datas[0].status === "En retard" ? "❌" : "✅"}  \n`;
        });

        textToCopy += "\nAgréable semaine 💙 à vous";

        // Copier dans le presse-papier
        await navigator.clipboard.writeText(textToCopy);
        return true;

    } catch (err) {
        console.error('Erreur lors de la copie: ', err);
        alert("Erreur lors de la copie");
        return false;
    }
}