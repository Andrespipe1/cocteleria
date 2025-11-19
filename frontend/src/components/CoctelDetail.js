export default function CoctelDetail({ coctel, onEdit }) {
  if (!coctel) return null;
  return (
    <div className="bg-white rounded-xl shadow-lg p-6 max-w-xl mx-auto animate-fadein">
      <img src={coctel.foto_url || '/default-cocktail.jpg'} alt={coctel.nombre} className="w-full h-56 object-cover rounded-lg mb-4" />
      <h2 className="text-2xl font-bold text-pink-700 mb-2">{coctel.nombre}</h2>
      <p className="text-gray-700 mb-2">{coctel.descripcion}</p>
      <div className="mb-4">
        <span className="font-semibold text-gray-600">Ingredientes:</span>
        <p className="text-gray-600">{coctel.ingredientes}</p>
      </div>
      <button onClick={onEdit} className="px-4 py-2 bg-pink-600 text-white rounded-lg shadow hover:bg-pink-700 transition">Editar</button>
    </div>
  );
}
