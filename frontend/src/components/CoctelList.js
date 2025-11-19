import CoctelCard from './CoctelCard';
import Loader from './Loader';

export default function CoctelList({ cocteles, loading, onCoctelClick, onFavorite }) {
  if (loading) return <Loader />;
  if (!cocteles?.length) return <div className="text-center py-8 text-gray-500">No hay cócteles para mostrar.</div>;
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
      {cocteles.map((c) => (
        <CoctelCard key={c.id} coctel={c} onClick={() => onCoctelClick(c)} onFavorite={() => onFavorite(c)} />
      ))}
    </div>
  );
}
