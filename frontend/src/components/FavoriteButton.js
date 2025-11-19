export default function FavoriteButton({ isFavorite, onClick }) {
  return (
    <button
      className={`p-2 rounded-full transition-colors duration-200 ${isFavorite ? 'bg-pink-100 text-pink-600' : 'bg-gray-100 text-gray-400'} hover:bg-pink-200`}
      onClick={onClick}
      aria-label={isFavorite ? 'Quitar de favoritos' : 'Agregar a favoritos'}
    >
      <svg xmlns="http://www.w3.org/2000/svg" fill={isFavorite ? 'currentColor' : 'none'} viewBox="0 0 24 24" stroke="currentColor" className="w-6 h-6">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5.121 19.364l7.071-7.071a2 2 0 012.828 0l7.071 7.071M5.121 19.364A8 8 0 1119.364 5.121M5.121 19.364L12 12" />
      </svg>
    </button>
  );
}