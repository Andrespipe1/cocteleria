import FavoriteButton from './FavoriteButton';

export default function CoctelCard({ coctel, onClick, onFavorite }) {
  return (
    <div className="bg-white rounded-xl shadow-md p-4 flex flex-col gap-2 hover:scale-[1.03] transition-transform duration-200 cursor-pointer" onClick={onClick}>
      <img src={coctel.foto_url || '/default-cocktail.jpg'} alt={coctel.nombre} className="w-full h-40 object-cover rounded-lg mb-2" />
      <div className="flex justify-between items-center">
        <h2 className="text-lg font-semibold text-pink-700">{coctel.nombre}</h2>
        <FavoriteButton isFavorite={coctel.favorito} onClick={onFavorite} />
      </div>
      <p className="text-gray-600 text-sm line-clamp-2">{coctel.descripcion}</p>
    </div>
  );
}
