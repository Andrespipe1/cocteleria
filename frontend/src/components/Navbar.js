import Link from "next/link";

export default function Navbar() {
  return (
    <header className="bg-white shadow-md sticky top-0 z-20">
      <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="text-2xl font-bold tracking-tight text-pink-600 transition-colors duration-200 hover:text-pink-800">Coctelería</Link>
        <div className="space-x-4">
          <Link href="/" className="font-medium text-gray-700 hover:text-pink-600 transition">Lista</Link>
          <Link href="/agregar" className="font-medium text-gray-700 hover:text-pink-600 transition">Agregar</Link>
        </div>
      </nav>
    </header>
  );
}