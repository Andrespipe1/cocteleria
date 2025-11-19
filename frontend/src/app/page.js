"use client";

import { useState, useEffect } from 'react';
import CoctelList from '@/components/CoctelList';
import SearchBar from '@/components/SearchBar';
import ErrorBanner from '@/components/ErrorBanner';
import { useRouter } from 'next/navigation';

export default function Home() {
  const [cocteles, setCocteles] = useState([]);
  const [filteredCocteles, setFilteredCocteles] = useState([]);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
  const router = useRouter();

  useEffect(() => {
    fetchCocteles();
  }, []);

  useEffect(() => {
    if (search.trim() === '') {
      setFilteredCocteles(cocteles);
    } else {
      const filtered = cocteles.filter(c => 
        c.nombre?.toLowerCase().includes(search.toLowerCase()) ||
        c.descripcion?.toLowerCase().includes(search.toLowerCase()) ||
        c.ingredientes?.toLowerCase().includes(search.toLowerCase())
      );
      setFilteredCocteles(filtered);
    }
  }, [search, cocteles]);

  async function fetchCocteles() {
    try {
      setLoading(true);
      const res = await fetch(`${API_URL}/api/cocteles`);
      const contentType = res.headers.get('content-type') || '';
      if (!res.ok) {
        const text = await res.text();
        throw new Error(`Request failed ${res.status}: ${text}`);
      }
      if (!contentType.includes('application/json')) {
        const text = await res.text();
        throw new Error(`Invalid JSON response from server: ${text.slice(0,200)}`);
      }
      const data = await res.json();
      
      // Sincronizar con favoritos de localStorage
      const favs = getFavorites();
      const mergedData = data.map(c => ({
        ...c,
        favorito: favs.includes(c.id)
      }));
      
      setCocteles(mergedData);
      setFilteredCocteles(mergedData);
    } catch (err) {
      console.error('Error al obtener cócteles:', err);
      setError(err.message || String(err));
    } finally {
      setLoading(false);
    }
  }

  function getFavorites() {
    if (typeof window === 'undefined') return [];
    try {
      const stored = localStorage.getItem('favoritos');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  }

  function saveFavorites(ids) {
    if (typeof window === 'undefined') return;
    try {
      localStorage.setItem('favoritos', JSON.stringify(ids));
    } catch (err) {
      console.error('Error al guardar favoritos:', err);
    }
  }

  function handleCoctelClick(coctel) {
    router.push(`/coctel/${coctel.id}`);
  }

  function handleFavorite(coctel) {
    const favs = getFavorites();
    const isFav = favs.includes(coctel.id);
    const newFavs = isFav ? favs.filter(id => id !== coctel.id) : [...favs, coctel.id];
    saveFavorites(newFavs);

    // Actualizar estado local
    const updatedCocteles = cocteles.map(c => 
      c.id === coctel.id ? { ...c, favorito: !isFav } : c
    );
    setCocteles(updatedCocteles);
  }

  return (
    <div className="animate-fadein">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl mb-12 tropical-gradient p-12 md:p-16 text-white shadow-2xl">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 max-w-3xl animate-slidein">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-4 leading-tight">
            Explora el Mundo de los Cócteles
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-white/90">
            Descubre recetas únicas, crea tus favoritos y sorprende con cada mezcla
          </p>
          <button
            onClick={() => router.push('/agregar')}
            className="bg-white text-pink-600 px-8 py-3 rounded-full font-bold text-lg shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 inline-flex items-center gap-2"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Agregar Cóctel
          </button>
        </div>
      </section>

      {/* Buscador y Lista */}
      <div className="mb-8">
        <h2 className="text-3xl font-bold text-gray-800 mb-4">Tu Colección</h2>
        <div className="flex flex-col md:flex-row gap-4 items-start md:items-center justify-between mb-6">
          <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
          <div className="text-sm text-gray-600">
            {filteredCocteles.length} {filteredCocteles.length === 1 ? 'cóctel' : 'cócteles'}
          </div>
        </div>
        <ErrorBanner message={error} />
      </div>
      
      <CoctelList 
        cocteles={filteredCocteles} 
        loading={loading} 
        onCoctelClick={handleCoctelClick}
        onFavorite={handleFavorite}
      />
    </div>
  );
}
