import { useState, useEffect } from 'react';

function getFavorites() {
  if (typeof window === 'undefined') return [];
  try {
    const stored = localStorage.getItem('favoritos');
    return stored ? JSON.parse(stored) : [];
  } catch {
    return [];
  }
}

function saveFavoritesToStorage(ids) {
  if (typeof window === 'undefined') return;
  try {
    localStorage.setItem('favoritos', JSON.stringify(ids));
    window.dispatchEvent(new Event('favoritesChanged'));
  } catch (err) {
    console.error('Error al guardar favoritos:', err);
  }
}

export function useFavorites() {
  const [favorites, setFavorites] = useState(() => getFavorites());

  useEffect(() => {
    // Escuchar cambios en localStorage desde otras pestañas/componentes
    const handleStorageChange = (e) => {
      if (e.key === 'favoritos') {
        setFavorites(getFavorites());
      }
    };

    window.addEventListener('storage', handleStorageChange);
    
    const handleFavoritesChange = () => {
      setFavorites(getFavorites());
    };
    
    window.addEventListener('favoritesChanged', handleFavoritesChange);

    return () => {
      window.removeEventListener('storage', handleStorageChange);
      window.removeEventListener('favoritesChanged', handleFavoritesChange);
    };
  }, []);

  function saveFavorites(ids) {
    setFavorites(ids);
    saveFavoritesToStorage(ids);
  }

  function toggleFavorite(coctelId) {
    const isFav = favorites.includes(coctelId);
    const newFavs = isFav 
      ? favorites.filter(id => id !== coctelId) 
      : [...favorites, coctelId];
    saveFavorites(newFavs);
    return !isFav;
  }

  function isFavorite(coctelId) {
    return favorites.includes(coctelId);
  }

  return {
    favorites,
    toggleFavorite,
    isFavorite,
    saveFavorites
  };
}
