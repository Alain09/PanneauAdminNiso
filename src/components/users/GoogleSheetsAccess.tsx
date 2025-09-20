// components/GoogleSheetsAccess.tsx
import { useState } from 'react';

interface GoogleSheetsAccessProps {
  id: string;
  userName?: string;
  categories?: string[];
  className?: string;
}

export default function GoogleSheetsAccess({ 
  id, 
 
}: GoogleSheetsAccessProps) {
  const [loading, setLoading] = useState(false);
 

  // Ouvrir le Google Sheet
  const openGoogleSheet = async () => {
    setLoading(true);
    try {
      const response = await fetch(`/api/users/${id}/sheet`);
      const data = await response.json();

      if (data.success && data.data.url) {
        window.open(data.data.url, '_blank');
     
      } else {
        console
        .error(data.message || 'Google Sheet non trouvé');
      }
    } catch (error) {
      console.error('Erreur lors de l\'ouverture du Google Sheet');
      console.error('Erreur ouverture sheet:', error);
    } finally {
      setLoading(false);
    }
  };


  return (
    <div className={`space-y-3 `}>
      
      <div className="flex gap-2 flex-wrap items-center">
        <button
          onClick={openGoogleSheet}
          disabled={loading}
          className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 text-sm font-medium transition-colors"
        >
          {loading ? (
            <>
              <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              Chargement...
            </>
          ) : (
            <>
              <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                <path d="M4 4a2 2 0 00-2 2v8a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2H4zm2 2h8v2H6V6zm0 4h8v2H6v-2z"/>
              </svg>
              open Sheet
            </>
          )}
        </button>
      </div>
    </div>
  );
}