import React from 'react';
import { Card , CardContent } from '../ui/card';
import Image from 'next/image';

interface CardImageProductProps {
  product: string;
  quantity: number;
  image?: string;
  onClick?: () => void;
}

export const CardImageProduct: React.FC<CardImageProductProps> = ({ 
  product, 
  quantity, 
  image ,
  onClick
}) => {
  return (
    <Card className=" shadow-none hover:shadow-sm  w-full  bg-white border border-gray-200 p-2" onClick={onClick}>
      <CardContent className="p-0">
        <div className="flex items-center h-20 ">
          {/* Partie gauche - Informations */}
          <div className="flex-1 px-3 sm:px-4 py-3 min-w-0">
            <h3 className="font-semibold text-gray-900 text-sm sm:text-base leading-tight mb-1 truncate">
              {product}
            </h3>
            <div className="flex items-center">
              <span className="text-xs sm:text-sm text-gray-600 mr-1">
                Quantité:
              </span>
              <span className="font-medium text-blue-600 text-sm sm:text-base">
                {quantity}
              </span>
            </div>
          </div>
          
          {/* Partie droite - Image */}
          <div className="flex-shrink-0 w-20 h-20   rounded-r-lg overflow-hidden relative ">
            {image ? (
              <Image
                src={image as string}
                alt={product}
                fill
                sizes="(max-width: 640px) 80px, 96px"
                className="object-cover"
                priority={false}
              />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center">
                <svg 
                  className="w-8 h-8 sm:w-10 sm:h-10 text-gray-400" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={1.5} 
                    d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" 
                  />
                </svg>
              </div>
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};