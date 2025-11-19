"use client";

import { useEffect, useState } from 'react';
import { useRouter, useParams } from 'next/navigation';
import CoctelDetail from '@/components/CoctelDetail';
import Loader from '@/components/Loader';

export default function CoctelPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;
  const [coctel, setCoctel] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!id) return;
    async function fetchCoctel() {
      try {
        setLoading(true);
        const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:4000';
        const res = await fetch(`${API_URL}/api/cocteles/${id}`);
        if (!res.ok) throw new Error('Cóctel no encontrado');
        const data = await res.json();
        setCoctel(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    fetchCoctel();
  }, [id]);

  if (loading) return <Loader />;
  if (!coctel) {
    return (
      <div className="text-center py-16 animate-fadein">
        <svg className="w-20 h-20 mx-auto text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.172 16.172a4 4 0 015.656 0M9 10h.01M15 10h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h2 className="text-2xl font-bold text-gray-700 mb-2">Cóctel no encontrado</h2>
        <p className="text-gray-500 mb-6">El cóctel que buscas no existe o fue eliminado.</p>
        <button
          onClick={() => router.push('/')}
          className="px-6 py-2 bg-pink-600 text-white rounded-lg hover:bg-pink-700 transition"
        >
          Volver al inicio
        </button>
      </div>
    );
  }

  return (
    <div className="animate-fadein">
      {/* Breadcrumb */}
      <nav className="mb-6 flex items-center gap-2 text-sm">
        <button
          onClick={() => router.push('/')}
          className="text-pink-600 hover:text-pink-700 hover:underline transition"
        >
          Inicio
        </button>
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-gray-700 font-medium">{coctel.nombre}</span>
      </nav>

      <CoctelDetail coctel={coctel} onEdit={() => router.push(`/editar/${coctel.id}`)} onBack={() => router.push('/')} />
    </div>
  );
}
