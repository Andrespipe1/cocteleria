"use client";

import CoctelForm from '@/components/CoctelForm';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

export default function AgregarPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  async function handleSubmit(form) {
    try {
      setLoading(true);
      setError('');
      const data = new FormData();
      data.append('nombre', form.nombre);
      data.append('descripcion', form.descripcion);
      data.append('ingredientes', form.ingredientes);
      data.append('favorito', form.favorito);
      if (form.foto) data.append('foto', form.foto);

      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${API_URL}/api/cocteles`, {
        method: 'POST',
        body: data,
      });
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Error al crear cóctel: ${errText}`);
      }
      router.push('/');
    } catch (err) {
      console.error(err);
      setError(err.message || 'Error al guardar el cóctel');
    } finally {
      setLoading(false);
    }
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
        <span className="text-gray-700 font-medium">Agregar Cóctel</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Crear Nuevo Cóctel</h1>
        <p className="text-gray-600">Completa el formulario para agregar un nuevo cóctel a tu colección</p>
      </div>

      {/* Error Banner */}
      {error && (
        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-700 flex items-start gap-3">
          <svg className="w-5 h-5 flex-shrink-0 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
          <span>{error}</span>
        </div>
      )}

      <CoctelForm onSubmit={handleSubmit} loading={loading} />
    </div>
  );
}
