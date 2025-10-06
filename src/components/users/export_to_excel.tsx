"use client";

import ExcelJS from "exceljs";
import { DataBaseUsersTabs } from "@/type";

export const exportToExcel = async (data: DataBaseUsersTabs[]) => {
  // Création du classeur
  const workbook = new ExcelJS.Workbook();
  const worksheet = workbook.addWorksheet("Utilisateurs Camp2");

  // Définir les colonnes
  worksheet.columns = [
    { header: "Noms & Prénoms", key: "name", width: 25 },
    { header: "Contact", key: "phone", width: 15 },
    { header: "Provenance", key: "provenance", width: 20 },
    { header: "Catégorie(s)", key: "categorie", width: 20 },
    { header: "Option(s)", key: "option", width: 20 },
    { header: "Date d'entrée", key: "date", width: 20 },
  ];

  // Ajouter les lignes de données
  data.forEach((row) => {
    worksheet.addRow({
      name: `${row.firstName} ${row.lastName}`,
      phone: row.contact || "",
      provenance: row.provence || "",
      categorie: row.category || "",
      option: Array.isArray(row.listOptions)
        ? row.listOptions.join(", ")
        : row.listOptions || "",
      date: row.dateEntree || "",
    });
  });

  // --- 🎨 STYLE : En-tête orange
  worksheet.getRow(1).eachCell((cell) => {
    cell.font = { bold: true, color: { argb: "FFFFFFFF" } }; // blanc
    cell.alignment = { vertical: "middle", horizontal: "center" };
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFFF8C00" }, // orange vif (#FF8C00)
    };
    cell.border = {
      top: { style: "thin", color: { argb: "FFFF8C00" } },
      left: { style: "thin", color: { argb: "FFFF8C00" } },
      bottom: { style: "thin", color: { argb: "FFFF8C00" } },
      right: { style: "thin", color: { argb: "FFFF8C00" } },
    };
  });

  // --- 💅 STYLE : lignes alternées
  worksheet.eachRow((row, rowNumber) => {
    if (rowNumber > 1 && rowNumber % 2 === 0) {
      row.eachCell((cell) => {
        cell.fill = {
          type: "pattern",
          pattern: "solid",
          fgColor: { argb: "FFFFF8F0" }, // beige clair
        };
      });
    }
  });

  // Générer le fichier Excel
  const buffer = await workbook.xlsx.writeBuffer();

  // Créer un lien de téléchargement
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const url = URL.createObjectURL(blob);

  const link = document.createElement("a");
  link.href = url;
  link.download = "Utilisateurs_Tontines.xlsx";
  link.click();

  URL.revokeObjectURL(url);
};
