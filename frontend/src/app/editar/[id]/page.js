"use client";

import CoctelForm from '@/components/CoctelForm';
import { useRouter, useParams } from 'next/navigation';
import { useState, useEffect } from 'react';
import Loader from '@/components/Loader';

export default function EditarPage() {
  const params = useParams();
  const router = useRouter();
  const id = params?.id;
  const [coctel, setCoctel] = useState(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!id) return;
    async function fetchCoctel() {
      try {
        setLoading(true);
        const API_URL = process.env.NEXT_PUBLIC_API_URL;
        const res = await fetch(`${API_URL}/api/cocteles/${id}`);
        if (!res.ok) throw new Error('Cóctel no encontrado');
        const data = await res.json();
        setCoctel(data);
      } catch (err) {
        console.error(err);
        setError(err.message || 'Error al cargar el cóctel');
      } finally {
        setLoading(false);
      }
    }
    fetchCoctel();
  }, [id]);

  async function handleSubmit(form) {
    try {
      setSaving(true);
      setError('');
      const data = new FormData();
      data.append('nombre', form.nombre);
      data.append('descripcion', form.descripcion);
      data.append('ingredientes', form.ingredientes);
      if (form.foto) data.append('foto', form.foto);

      const API_URL = process.env.NEXT_PUBLIC_API_URL;
      const res = await fetch(`${API_URL}/api/cocteles/${id}`, {
        method: 'PUT',
        body: data,
      });
      if (!res.ok) {
        const errText = await res.text();
        throw new Error(`Error al actualizar cóctel: ${errText}`);
      }
      router.push(`/coctel/${id}`);
    } catch (err) {
      console.error(err);
      setError(err.message || 'Error al actualizar el cóctel');
    } finally {
      setSaving(false);
    }
  }

  if (loading) return <Loader />;
  
  if (error && !coctel) {
    return (
      <div className="text-center py-16 animate-fadein">
        <svg className="w-20 h-20 mx-auto text-red-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
        <h2 className="text-2xl font-bold text-gray-700 mb-2">Error al cargar</h2>
        <p className="text-gray-500 mb-6">{error}</p>
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
        <button
          onClick={() => router.push(`/coctel/${id}`)}
          className="text-pink-600 hover:text-pink-700 hover:underline transition"
        >
          {coctel?.nombre || 'Cóctel'}
        </button>
        <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        <span className="text-gray-700 font-medium">Editar</span>
      </nav>

      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-2">Editar Cóctel</h1>
        <p className="text-gray-600">Actualiza la información de tu cóctel</p>
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

      {coctel && <CoctelForm initialData={coctel} onSubmit={handleSubmit} loading={saving} />}
    </div>
  );
}
