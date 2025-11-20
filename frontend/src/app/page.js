"use client";

import { useState, useEffect } from 'react';
import CoctelList from '@/components/CoctelList';
import SearchBar from '@/components/SearchBar';
import ErrorBanner from '@/components/ErrorBanner';
import { useRouter } from 'next/navigation';
import { useFavorites } from '@/hooks/useFavorites';

export default function Home() {
  const [cocteles, setCocteles] = useState([]);
  const [filteredCocteles, setFilteredCocteles] = useState([]);
  const [search, setSearch] = useState('');
  const [showFavoritesOnly, setShowFavoritesOnly] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;
  const API_URL = process.env.NEXT_PUBLIC_API_URL;
  const router = useRouter();
  const { favorites, toggleFavorite } = useFavorites();

  // Restaurar la página desde sessionStorage al cargar
  useEffect(() => {
    const savedPage = sessionStorage.getItem('currentPage');
    if (savedPage) {
      setCurrentPage(parseInt(savedPage, 10));
    }
  }, []);

  useEffect(() => {
    fetchCocteles();
  }, []);

  // Actualizar favoritos cuando cambie el estado de favorites
  useEffect(() => {
    if (cocteles.length > 0) {
      const updatedCocteles = cocteles.map(c => ({
        ...c,
        favorito: favorites.includes(c.id)
      }));
      setCocteles(updatedCocteles);
    }
  }, [favorites]);

  useEffect(() => {
    let filtered = cocteles;

    // Filtrar por búsqueda
    if (search.trim() !== '') {
      filtered = filtered.filter(c => 
        c.nombre?.toLowerCase().includes(search.toLowerCase())
      );
    }

    // Filtrar por favoritos
    if (showFavoritesOnly) {
      filtered = filtered.filter(c => c.favorito === true);
    }

    setFilteredCocteles(filtered);
    // Resetear a la primera página cuando cambia la búsqueda o el filtro
    setCurrentPage(1);
  }, [search, cocteles, showFavoritesOnly]);

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
      const mergedData = data.map(c => ({
        ...c,
        favorito: favorites.includes(c.id)
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

  function handleCoctelClick(coctel) {
    router.push(`/coctel/${coctel.id}`);
  }

  function handleFavorite(coctel) {
    toggleFavorite(coctel.id);
  }

  // Calcular paginación
  const totalPages = Math.ceil(filteredCocteles.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentCocteles = filteredCocteles.slice(startIndex, endIndex);

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    sessionStorage.setItem('currentPage', newPage.toString());
  };

  return (
    <div className="animate-fadein">
      {/* Hero Section */}
      <section className="relative overflow-hidden rounded-3xl mb-12 tropical-gradient p-12 md:p-16 text-white shadow-2xl">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        <div className="relative z-10 max-w animate-slidein">
          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
            Explora el Mundo de los Cócteles
          </h1>
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
          <div className="flex-1 max-w-2xl">
            <SearchBar value={search} onChange={(e) => setSearch(e.target.value)} />
          </div>
          <div className="flex items-center gap-4">
            {/* Filtro de Favoritos */}
            <button
              onClick={() => setShowFavoritesOnly(!showFavoritesOnly)}
              className={`flex items-center gap-2 px-4 py-2 rounded-full font-semibold transition-all duration-300 ${
                showFavoritesOnly
                  ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white shadow-lg scale-105'
                  : 'bg-white text-gray-700 shadow-md hover:shadow-lg hover:scale-105'
              }`}
            >
              <svg 
                className={`w-5 h-5 ${
                  showFavoritesOnly ? 'animate-heartbeat' : ''
                }`} 
                fill={showFavoritesOnly ? 'currentColor' : 'none'} 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path 
                  strokeLinecap="round" 
                  strokeLinejoin="round" 
                  strokeWidth={2} 
                  d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" 
                />
              </svg>
              <span>{showFavoritesOnly ? 'Favoritos' : 'Todos'}</span>
            </button>
            
            {/* Contador */}
            <div className="text-sm text-gray-600 whitespace-nowrap">
              {filteredCocteles.length} {filteredCocteles.length === 1 ? 'cóctel' : 'cócteles'}
            </div>
          </div>
        </div>
        <ErrorBanner message={error} />
      </div>
      
      <CoctelList 
        cocteles={currentCocteles} 
        loading={loading} 
        onCoctelClick={handleCoctelClick}
        onFavorite={handleFavorite}
      />

      {/* Paginación */}
      {!loading && filteredCocteles.length > itemsPerPage && (
        <div className="flex justify-center items-center gap-2 mt-12 mb-8">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg bg-white shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-md"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>

          <div className="flex gap-2">
            {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
              <button
                key={page}
                onClick={() => handlePageChange(page)}
                className={`px-4 py-2 rounded-lg font-semibold transition-all ${
                  currentPage === page
                    ? 'bg-gradient-to-r from-pink-500 to-purple-500 text-white shadow-lg'
                    : 'bg-white text-gray-700 shadow-md hover:shadow-lg'
                }`}
              >
                {page}
              </button>
            ))}
          </div>

          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="px-4 py-2 rounded-lg bg-white shadow-md hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:shadow-md"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      )}
    </div>
  );
}
