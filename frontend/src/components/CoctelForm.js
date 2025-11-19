import { useState } from 'react';

export default function CoctelForm({ initialData = {}, onSubmit, loading }) {
  const [form, setForm] = useState({
    nombre: initialData.nombre || '',
    descripcion: initialData.descripcion || '',
    ingredientes: initialData.ingredientes || '',
    favorito: initialData.favorito || false,
    foto: null,
  });

  function handleChange(e) {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setForm((f) => ({ ...f, [name]: checked }));
    } else if (type === 'file') {
      setForm((f) => ({ ...f, foto: files[0] }));
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form);
  }

  return (
    <form className="bg-white rounded-xl shadow-lg p-6 max-w-xl mx-auto flex flex-col gap-4 animate-fadein" onSubmit={handleSubmit}>
      <input name="nombre" value={form.nombre} onChange={handleChange} required placeholder="Nombre" className="px-4 py-2 border rounded-lg" />
      <textarea name="descripcion" value={form.descripcion} onChange={handleChange} required placeholder="Descripción" className="px-4 py-2 border rounded-lg" />
      <textarea name="ingredientes" value={form.ingredientes} onChange={handleChange} required placeholder="Ingredientes" className="px-4 py-2 border rounded-lg" />
      <label className="flex items-center gap-2">
        <input type="checkbox" name="favorito" checked={form.favorito} onChange={handleChange} />
        <span>Favorito</span>
      </label>
      <input type="file" name="foto" accept="image/*" onChange={handleChange} className="px-4 py-2 border rounded-lg" />
      <button type="submit" disabled={loading} className="px-4 py-2 bg-pink-600 text-white rounded-lg shadow hover:bg-pink-700 transition">
        {loading ? 'Guardando...' : 'Guardar'}
      </button>
    </form>
  );
}
