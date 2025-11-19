export default function SearchBar({ value, onChange }) {
  return (
    <input
      type="text"
      placeholder="Buscar cóctel..."
      className="w-full max-w-md px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-400 transition"
      value={value}
      onChange={onChange}
    />
  );
}