export default function ErrorBanner({ message }) {
  if (!message) return null;
  return (
    <div className="mb-6 p-4 rounded-md bg-red-50 border border-red-200 text-red-800">
      <strong className="block font-semibold">Error</strong>
      <div className="text-sm">{message}</div>
    </div>
  );
}
