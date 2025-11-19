import "./globals.css";
import Link from "next/link";

export const metadata = {
  title: "Coctelería - Gestión de Cócteles",
  description: "Aplicación profesional para gestionar y descubrir cócteles",
};

export default function RootLayout({ children }) {
  return (
      <html lang="es">
        <body className="bg-gray-50 text-gray-900 min-h-screen">
          <div className="flex flex-col min-h-screen">
            <header className="bg-white shadow-md sticky top-0 z-20">
              <nav className="container mx-auto px-4 py-4 flex justify-between items-center">
                  <Link href="/" className="text-2xl font-bold tracking-tight text-pink-600 transition-colors duration-200 hover:text-pink-800">Coctelería</Link>
                <div className="space-x-4">
                    <Link href="/" className="font-medium text-gray-700 hover:text-pink-600 transition">Lista</Link>
                    <Link href="/agregar" className="font-medium text-gray-700 hover:text-pink-600 transition">Agregar</Link>
                </div>
              </nav>
            </header>
            <main className="flex-1 container mx-auto px-4 py-8 animate-fadein">
              {children}
            </main>
            <footer className="bg-white border-t mt-8 py-4 text-center text-sm text-gray-500">
              &copy; {new Date().getFullYear()} Coctelería — Prueba Técnica
            </footer>
          </div>
        </body>
      </html>
  );
}
