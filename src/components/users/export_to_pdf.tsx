import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { DataBaseUsersTabs } from "@/type";


export const exportToPDF = (data: DataBaseUsersTabs[]) => {
  // Créer une nouvelle instance de jsPDF au format A4
  // A4 = 210mm x 297mm
  const doc = new jsPDF({
    orientation: "portrait",
    unit: "mm",
    format: "a4"
  });

  // Dimensions de la page A4 en mm

  // Marges et dimensions
  const marginLeft = 10;
  const marginRight = 10;
  const marginTop = 20;
  const pageWidth = doc.internal.pageSize.getWidth();
  const pageHeight = doc.internal.pageSize.getHeight();
  // Largeur disponible pour le contenu
  const contentWidth = pageWidth - marginLeft - marginRight;

  // Ajouter un titre centré
  doc.setFontSize(16);
  doc.text("Liste des utilisateurs de la tontine", pageWidth / 2, marginTop, { align: "center" });

  // Ajouter la date d'exportation
  doc.setFontSize(10);
  doc.text(`Exporté le: ${new Date().toLocaleDateString()}`, pageWidth / 2, marginTop + 5, { align: "center"  });

  // Définir les en-têtes de tableau
  // Définir les colonnes
  const headers = [
    [
      "Noms & Prénoms",
      "Contact",
      "Provenance",
      "Catégorie(s)",
      "Option(s)",
      "Date d'entrée",
    ],
  ];
   // Préparer les données du tableau
  const tableData = data.map((row) => [
    row.firstName + " "+row.lastName || "",
    row.contact || "",
    row.provence || "",
    row.category || "",
    row.listOptions || "",
    row.dateEntree || "",
  ]);

  // Calculer les proportions du tableau
  // La largeur totale est contentWidth, on répartit selon l'importance des colonnes
// Largeurs relatives (elles doivent totaliser ~100 %)
  const colWidthPercents = [25, 20, 15, 15, 15, 10];

  // Générer le tableau
  // Génération du tableau
  autoTable(doc, {
    head: headers,
    body: tableData,
    startY: marginTop + 10,
    theme: "grid",
    tableWidth: contentWidth,
    margin: { left: marginLeft, right: marginRight },
    styles: {
      fontSize: 9,
      cellPadding: 2,
      lineColor: [0, 0, 0],
      lineWidth: 0.1,
      overflow: "linebreak",
      cellWidth: "wrap",
    },
    headStyles: {
      fillColor: [255, 140, 0],
      textColor: [255, 255, 255],
      fontStyle: "bold",
      halign: "center",
    },
    alternateRowStyles: {
      fillColor: [255, 250, 240],
    },
    columnStyles: {
      0: { cellWidth: contentWidth * colWidthPercents[0] / 100 },
      1: { cellWidth: contentWidth * colWidthPercents[1] / 100 },
      2: { cellWidth: contentWidth * colWidthPercents[2] / 100 },
      3: { cellWidth: contentWidth * colWidthPercents[3] / 100 },
      4: { cellWidth: contentWidth * colWidthPercents[4] / 100 },
      5: { cellWidth: contentWidth * colWidthPercents[5] / 100 },
    },
    didDrawPage: (dataArg) => {
      // En-tête
      doc.setFontSize(12);
     doc.setTextColor(255, 140, 0)
      

      // Pied de page
     
      doc.setFontSize(8);
      doc.setTextColor(100, 100, 100);
      doc.text(
        `Page ${dataArg.pageNumber} `,
        pageWidth / 2,
        pageHeight - 10,
        { align: "center" }
      );
    },
  });

  // Enregistrer le PDF
   doc.save("Liste_Utilisateurs.pdf");
};