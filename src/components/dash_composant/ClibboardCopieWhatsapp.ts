import { PaymentHistoryWeekActif } from "@/type";

interface User {
    datas: PaymentHistoryWeekActif[];
    weekActif: string;
}
import { formatDate } from "../hook_perso";

export const copyToClipboardForWhatsApp = async ({
    datas,
    weekActif
}: User): Promise<boolean> => {
    try {
        // Filtrer seulement les utilisateurs avec statut "Payé"
        //const paidUsers = datas.filter(user => user.status === "Payé");

        if (datas.length === 0) {
            alert("Aucun utilisateur avec statut 'Payé' à copier");
            return false;
        }

        // Formater la date
        const today = new Date();
        const nextWeek = new Date();
        nextWeek.setDate(today.getDate() + 7);


        // Créer le texte à copier
        let textToCopy = `💙 *${weekActif}* 💙\n`;
        textToCopy += `(${formatDate(today)} au ${formatDate(nextWeek)}) \n\n`;

        if (datas[0].status === "Payé") {
            textToCopy += `*Voici la liste des membres actifs de la semaine* :\n\n`;
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
};