import { useState } from 'react';
import FavoriteButton from './FavoriteButton';

export default function CoctelDetail({ coctel, onEdit, onBack, onFavorite, onDelete }) {
  const [imageLoading, setImageLoading] = useState(true);
  const [imageError, setImageError] = useState(false);

  if (!coctel) return null;

  const ingredientesList = coctel.ingredientes?.split(',').map(i => i.trim()).filter(Boolean) || [];

  return (
    <div className="animate-scalein">
      <div className="relative rounded-3xl overflow-hidden shadow-2xl mb-8 h-[500px] bg-gray-100">
        {imageLoading && !imageError && (
          <div className="absolute inset-0 flex items-center justify-center z-10">
            <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}
        {imageError ? (
          <div className="absolute inset-0 flex flex-col items-center justify-center text-gray-400">
            <svg className="w-24 h-24 mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
            </svg>
            <span className="text-lg font-medium">Imagen no disponible</span>
          </div>
        ) : (
          <img
            src={coctel.foto_url || '/default-cocktail.jpg'}
            alt={coctel.nombre}
            className={`w-full h-full object-contain transition-opacity duration-300 ${imageLoading ? 'opacity-0' : 'opacity-100'}`}
            onLoad={() => setImageLoading(false)}
            onError={() => {
              setImageLoading(false);
              setImageError(true);
            }}
          />
        )}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
        
        {/* Botón de favorito flotante */}
        <div className="absolute top-6 right-6 z-20">
          <FavoriteButton isFavorite={coctel.favorito} onClick={onFavorite} />
        </div>
        
        <div className="absolute bottom-0 left-0 right-0 p-8">
          <div className="flex items-center gap-3 mb-3">
            {coctel.favorito && (
              <span className="px-3 py-1 bg-pink-500 text-white text-xs font-bold rounded-full flex items-center gap-1">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
                </svg>
                Favorito
              </span>
            )}
            <span className="px-3 py-1 bg-white/20 backdrop-blur-sm text-white text-xs font-semibold rounded-full">
            {coctel.created_at ? new Date(coctel.created_at).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' }) : 'Reciente'}
            </span>
          </div>
          <h1 className="text-5xl font-extrabold text-white mb-2 drop-shadow-lg">{coctel.nombre}</h1>
        </div>
      </div>

      {/* contenido */}
      <div className="grid md:grid-cols-3 gap-8">
        {/*Columna Izquierda */}
        <div className="md:col-span-2 space-y-6">
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-6 h-6 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
              </svg>
              <h2 className="text-2xl font-bold text-gray-800">Descripción</h2>
            </div>
            <p className="text-gray-700 text-lg leading-relaxed">{coctel.descripcion || 'Sin descripción disponible.'}</p>
          </div>
        </div>

        {/*Columna Derecha - Ingredientes */}
        <div className="space-y-6">
          <div className="bg-gradient-to-br from-pink-50 to-purple-50 rounded-2xl shadow-lg p-6">
            <div className="flex items-center gap-2 mb-4">
              <svg className="w-6 h-6 text-pink-600" fill="currentColor" viewBox="0 0 20 20">
                <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z" />
              </svg>
              <h2 className="text-xl font-bold text-gray-800">Ingredientes</h2>
            </div>
            {ingredientesList.length > 0 ? (
              <ul className="space-y-2">
                {ingredientesList.map((ing, idx) => (
                  <li key={idx} className="flex items-start gap-2 text-gray-700">
                    <svg className="w-5 h-5 text-pink-500 mt-0.5 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                    <span>{ing}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-gray-500 italic">No hay ingredientes registrados.</p>
            )}
          </div>

          {/* Botones*/}
          <div className="space-y-3">
            <button
              onClick={onEdit}
              className="w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
              </svg>
              Editar Cóctel
            </button>
            <button
              onClick={onDelete}
              className="w-full px-6 py-3 bg-red-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:bg-red-600 hover:scale-105 transition-all duration-300 flex items-center justify-center gap-2"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
              </svg>
              Eliminar Cóctel
            </button>
            <button
              onClick={onBack}
              className="w-full px-6 py-3 bg-white text-gray-700 font-semibold rounded-xl shadow hover:shadow-lg hover:bg-gray-50 transition-all duration-300 flex items-center justify-center gap-2 border border-gray-200"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
              </svg>
              Volver
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
