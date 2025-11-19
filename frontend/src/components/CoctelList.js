import CoctelCard from './CoctelCard';
import Loader from './Loader';

export default function CoctelList({ cocteles, loading, onCoctelClick, onFavorite }) {
  if (loading) return <Loader />;
  if (!cocteles?.length) {
    return (
      <div className="text-center py-16">
        <svg className="w-24 h-24 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <p className="text-xl text-gray-500 font-medium">No hay cócteles para mostrar</p>
        <p className="text-sm text-gray-400 mt-2">Agrega tu primer cóctel para comenzar</p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {cocteles.map((c, index) => (
        <div
          key={c.id}
          className="animate-scalein"
          style={{ animationDelay: `${index * 0.05}s`, animationFillMode: 'both' }}
        >
          <CoctelCard coctel={c} onClick={() => onCoctelClick(c)} onFavorite={() => onFavorite(c)} />
        </div>
      ))}
    </div>
  );
}
