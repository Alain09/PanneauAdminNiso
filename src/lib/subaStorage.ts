import { createClient } from "@supabase/supabase-js";

// Validation des variables d'environnement
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl) {
  throw new Error('NEXT_PUBLIC_SUPABASE_URL is not defined in environment variables');
}

if (!supabaseServiceKey) {
  throw new Error('SUPABASE_SERVICE_ROLE_KEY is not defined in environment variables');
}

if (!supabaseUrl.startsWith('https://') && !supabaseUrl.startsWith('http://')) {
  throw new Error(`Invalid NEXT_PUBLIC_SUPABASE_URL: ${supabaseUrl}. Must start with https:// or http://`);
}

export const supabaseAdmin = createClient(supabaseUrl, supabaseServiceKey);
/**
 * Upload un fichier vers Supabase Storage
 * @param file - Le fichier à uploader
 * @param fileName - Le nom du fichier (optionnel, génère un nom unique si non fourni)
 * @returns Promise avec l'URL publique du fichier uploadé
 */
export async function uploadFileToSupabase(
  file: File, 
  fileName?: string
): Promise<{ url: string; path: string }> {
  try {
    // Générer un nom de fichier unique si non fourni
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2, 15);
    const fileExtension = file.name.split('.').pop();
    
    const finalFileName = fileName 
      ? `${fileName}_${timestamp}.${fileExtension}`
      : `image_${timestamp}_${randomString}.${fileExtension}`;

    // Upload du fichier
    const { data, error } = await supabaseAdmin.storage
      .from('Niso_image')
      .upload(finalFileName, file, {
        cacheControl: '3600',
        upsert: false, // Ne pas écraser si le fichier existe déjà
      });

    if (error) {
      console.error('Erreur upload Supabase:', error);
      throw new Error(`Erreur lors de l'upload: ${error.message}`);
    }

    // Obtenir l'URL publique
    const { data: urlData } = supabaseAdmin.storage
      .from('Niso_image')
      .getPublicUrl(data.path);

    return {
      url: urlData.publicUrl,
      path: data.path
    };
  } catch (error) {
    console.error('Erreur dans uploadFileToSupabase:', error);
    throw error;
  }
}

/**
 * Supprime un fichier de Supabase Storage
 * @param filePath - Le chemin du fichier à supprimer (ex: "image_123456789.jpg")
 * @returns Promise<boolean> - true si suppression réussie
 */
export async function deleteFileFromSupabase(filePath: string): Promise<boolean> {
  try {
    const { error } = await supabaseAdmin.storage
      .from('Niso_image')
      .remove([filePath]);

    if (error) {
      console.error('Erreur suppression Supabase:', error);
      throw new Error(`Erreur lors de la suppression: ${error.message}`);
    }

    return true;
  } catch (error) {
    console.error('Erreur dans deleteFileFromSupabase:', error);
    return false;
  }
}

/**
 * Supprime un fichier à partir de son URL publique
 * @param publicUrl - L'URL publique du fichier
 * @returns Promise<boolean> - true si suppression réussie
 */
export async function deleteFileFromSupabaseByUrl(publicUrl: string): Promise<boolean> {
  try {
    // Extraire le path depuis l'URL publique
    // Format: https://[project].supabase.co/storage/v1/object/public/Niso_image/filename.jpg
    const urlParts = publicUrl.split('/');
    const bucketIndex = urlParts.findIndex(part => part === 'Niso_image');
    
    if (bucketIndex === -1) {
      throw new Error('Bucket Niso_image non trouvé dans l\'URL');
    }
    
    // Récupérer tout ce qui suit le nom du bucket
    const fileName = urlParts.slice(bucketIndex + 1).join('/');
    
    if (!fileName) {
      throw new Error('Impossible d\'extraire le nom du fichier de l\'URL');
    }

    return await deleteFileFromSupabase(fileName);
  } catch (error) {
    console.error('Erreur dans deleteFileFromSupabaseByUrl:', error);
    return false;
  }
}

/**
 * Fonction helper pour déterminer si c'est une URL ou un path
 * et appeler la bonne fonction de suppression
 */
export async function deleteImageFromSupabase(imageUrlOrPath: string): Promise<boolean> {
  try {
    // Si c'est une URL complète, utiliser deleteFileFromSupabaseByUrl
    if (imageUrlOrPath.startsWith('http')) {
      return await deleteFileFromSupabaseByUrl(imageUrlOrPath);
    }
    // Sinon, c'est un path direct
    else {
      return await deleteFileFromSupabase(imageUrlOrPath);
    }
  } catch (error) {
    console.error('Erreur dans deleteImageFromSupabase:', error);
    return false;
  }
}

/**
 * Utilitaire pour valider les types de fichiers autorisés
 * @param file - Le fichier à valider
 * @param allowedTypes - Types MIME autorisés (par défaut: images)
 * @returns boolean
 */
export function validateFileType(
  file: File, 
  allowedTypes: string[] = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp', 'image/gif']
): boolean {
  return allowedTypes.includes(file.type);
}

/**
 * Utilitaire pour valider la taille du fichier
 * @param file - Le fichier à valider
 * @param maxSizeMB - Taille maximale en MB (par défaut: 5MB)
 * @returns boolean
 */
export function validateFileSize(file: File, maxSizeMB: number = 5): boolean {
  const maxSizeBytes = maxSizeMB * 1024 * 1024;
  return file.size <= maxSizeBytes;
}