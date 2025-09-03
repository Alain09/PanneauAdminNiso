import { del, put } from '@vercel/blob';

export interface BlobResult {
  url: string;
  pathname: string;
  contentType: string;

}

//Upload un fichier vers Vercel Blob
// @param file Le fichier à uploader
//@param fileName Nom personnalisé (optionnel)

export async function uploadFileToBlob(
  file: File,
  fileName?: string,
): Promise<BlobResult> {
  const blob = await put(fileName || file.name, file, {
    access: 'public',
    token: process.env.BLOB_READ_WRITE_TOKEN_READ_WRITE_TOKEN


  });

  return {
    url: blob.url,
    pathname: blob.pathname,
    contentType: file.type,
  };
}

// Fonction utilitaire pour vérifier si une URL est sur Vercel Blob
export const isVercelBlobUrl = (url: string | null): boolean => {
  if (!url) return false;
  return url.includes('blob.vercel-storage.com');
};

// Fonction utilitaire pour supprimer une image de Vercel Blob en toute sécurité
export const safeDeleteFromBlob = async (imageUrl: string | null): Promise<void> => {
  if (!imageUrl || !isVercelBlobUrl(imageUrl)) {
    console.log('Image non stockée sur Vercel Blob, suppression ignorée');
    return;
  }

  try {
    await del(imageUrl, {

      token: process.env.BLOB_READ_WRITE_TOKEN_READ_WRITE_TOKEN
    });
    console.log('Image supprimée de Vercel Blob avec succès');
  } catch (error) {
    console.error('Erreur lors de la suppression de Vercel Blob:', error);
    // Ne pas faire échouer l'opération principale si la suppression Blob échoue
  }
};