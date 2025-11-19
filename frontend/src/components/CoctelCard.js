import FavoriteButton from './FavoriteButton';

export default function CoctelCard({ coctel, onClick, onFavorite }) {
  return (
    <div
      className="group rounded-2xl overflow-hidden shadow-lg cursor-pointer transform transition-all duration-300 hover:shadow-2xl card-hover-lift bg-white"
      onClick={onClick}
    >
      <div className="relative h-56 overflow-hidden">
        <img 
          src={coctel.foto_url || '/default-cocktail.jpg'} 
          alt={coctel.nombre} 
          className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" 
        />
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
            {new Date(coctel.created_at || Date.now()).toLocaleDateString('es-ES', { day: 'numeric', month: 'short' })}
          </span>
          <span className="px-3 py-1 rounded-full text-pink-600 bg-pink-50 font-semibold text-xs">
            Ver más
          </span>
        </div>
      </div>
    </div>
  );
}
