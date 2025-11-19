import { useState } from 'react';
import FavoriteButton from './FavoriteButton';

export default function CoctelCard({ coctel, onClick, onFavorite }) {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  return (
    <div
      className="group rounded-2xl overflow-hidden shadow-lg cursor-pointer transform transition-all duration-300 hover:shadow-2xl card-hover-lift bg-white"
      onClick={onClick}
    >
      <div className="relative h-64 overflow-hidden bg-gray-100">
        {imageLoading && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-12 h-12 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        {imageError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
            <svg className="w-16 h-16 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-sm">Sin imagen</span>
          </div>
        ) : (
          <img 
            src={coctel.foto_url || '/default-cocktail.jpg'} 
            alt={coctel.nombre} 
            className={`w-full h-full object-contain transform group-hover:scale-105 transition-transform duration-500 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
            onLoad={() => setImageLoading(false)}
            onError={() => {
              setImageLoading(false);
              setImageError(true);
            }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
        <div className="absolute left-4 bottom-4 right-4">
          <h3 className="text-2xl font-extrabold text-white drop-shadow-lg mb-1">{coctel.nombre}</h3>
          <p className="text-sm text-white/95 line-clamp-2">{coctel.descripcion}</p>
        </div>
        <div className="absolute right-3 top-3">
          <FavoriteButton isFavorite={coctel.favorito} onClick={onFavorite} />
        </div>
      </div>
      <div className="p-5 bg-gradient-to-br from-white to-gray-50">
        <div className="flex items-center gap-2 mb-3">
          <svg className="w-4 h-4 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z" />
          </svg>
          <div className="text-sm text-gray-700 font-medium line-clamp-1">
            {coctel.ingredientes?.split(',').slice(0,3).join(', ') || 'Sin ingredientes'}
          </div>
        </div>
        <div className="flex items-center justify-between text-xs">
          <span className="text-gray-500 flex items-center gap-1">
            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            {coctel.created_at ? new Date(coctel.created_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' }) : 'Reciente'}
          </span>
          <span className="px-3 py-1 rounded-full text-pink-600 bg-pink-50 font-semibold text-xs">
            Ver más
          </span>
        </div>
      </div>
    </div>
  );
}
