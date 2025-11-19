"use client";

import { useRouter, useParams } from 'next/navigation';
import { useState } from 'react';

export default function EliminarCoctel() {
    const router = useRouter();
    const params = useParams();
    const id = params?.id;
    const [deleting, setDeleting] = useState(false);
    const [error, setError] = useState('');
    const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';

    const handleCancelar = () => {
        router.push(`/coctel/${id}`);
    };

    const handleEliminar = async () => {
        try {
            setDeleting(true);
            const response = await fetch(`${API_URL}/api/cocteles/${id}`, {
                method: 'DELETE',
            });

            if (response.ok) {
                // Limpiar favoritos si estaba marcado
                try {
                    const favs = JSON.parse(localStorage.getItem('favoritos') || '[]');
                    const newFavs = favs.filter(favId => favId !== parseInt(id));
                    localStorage.setItem('favoritos', JSON.stringify(newFavs));
                    window.dispatchEvent(new Event('favoritesChanged'));
                } catch (err) {
                    console.error('Error al actualizar favoritos:', err);
                }
                
                router.push('/?deleted=true');
            } else {
                const errorText = await response.text();
                throw new Error(errorText || 'Error al eliminar el cóctel');
            }
        } catch (error) {
            console.error('Error:', error);
            setError(error.message || 'Error de conexión al eliminar');
            setDeleting(false);
        }
    };

    if (error) {
        return (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fadein p-4">
                <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
                    <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Error al eliminar</h2>
                        <p className="text-gray-600 mb-6">{error}</p>
                        <button
                            onClick={() => router.push('/')}
                            className="w-full px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-xl hover:shadow-lg transition-all"
                        >
                            Volver al inicio
                        </button>
                    </div>
                </div>
            </div>
        );
    }

    if (deleting) {
        return (
            <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 p-4">
                <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl">
                    <div className="flex flex-col items-center text-center">
                        <div className="w-16 h-16 border-4 border-pink-500 border-t-transparent rounded-full animate-spin mb-4"></div>
                        <h2 className="text-2xl font-bold text-gray-900 mb-2">Eliminando cóctel</h2>
                        <p className="text-gray-600">Por favor espera un momento...</p>
                    </div>
                </div>
            </div>
        );
    }

    return (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50 animate-fadein p-4">
            <div className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl animate-scalein">
                <div className="flex flex-col items-center text-center">
                    <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mb-4">
                        <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                    </div>
                    
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">¿Eliminar cóctel?</h2>
                    <p className="text-gray-600 mb-6">
                        Esta acción no se puede deshacer. El cóctel será eliminado permanentemente.
                    </p>

                    <div className="flex gap-3 w-full">
                        <button
                            onClick={handleCancelar}
                            disabled={deleting}
                            className="flex-1 px-6 py-3 bg-gray-100 text-gray-700 font-semibold rounded-xl hover:bg-gray-200 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Cancelar
                        </button>
                        <button
                            onClick={handleEliminar}
                            disabled={deleting}
                            className="flex-1 px-6 py-3 bg-red-500 text-white font-bold rounded-xl hover:bg-red-600 hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            Eliminar
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}