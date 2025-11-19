import "./globals.css";
import Link from "next/link";
import React from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
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
              <Navbar />
            </header>
            <main className="flex-1 container mx-auto px-4 py-8 animate-fadein">
              {children}
            </main>
            <Footer />

          </div>
        </body>
      </html>
  );
}
