export default function SearchBar({ value, onChange }) {
  return (
    <div className="relative w-full max-w-md">
      <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
        <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
      </div>
      <input
        type="text"
        placeholder="Buscar cóctel..."
        className="w-full pl-12 pr-4 py-3 border-2 border-gray-200 rounded-2xl shadow-sm focus:outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-100 transition-all duration-300"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}