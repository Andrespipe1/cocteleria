import { useState } from 'react';

export default function CoctelForm({ initialData = {}, onSubmit, loading }) {
  const [form, setForm] = useState({
    nombre: initialData.nombre || '',
    descripcion: initialData.descripcion || '',
    ingredientes: initialData.ingredientes || '',
    foto: null,
  });
  const [preview, setPreview] = useState(initialData.foto_url || '');

  function handleChange(e) {
    const { name, value, type, checked, files } = e.target;
    if (type === 'checkbox') {
      setForm((f) => ({ ...f, [name]: checked }));
    } else if (type === 'file') {
      const file = files[0];
      setForm((f) => ({ ...f, foto: file }));
      if (file) {
        const reader = new FileReader();
        reader.onloadend = () => setPreview(reader.result);
        reader.readAsDataURL(file);
      } else {
        setPreview('');
      }
    } else {
      setForm((f) => ({ ...f, [name]: value }));
    }
  }

  function handleSubmit(e) {
    e.preventDefault();
    onSubmit(form);
  }

  return (
    <form 
      className="bg-white rounded-2xl shadow-xl p-8 max-w-3xl mx-auto space-y-6 animate-scalein" 
      onSubmit={handleSubmit}
    >
      {/* Nombre */}
      <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
          <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5c.512 0 1.024.195 1.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
          </svg>
          Nombre del Cóctel
        </label>
        <input 
          name="nombre" 
          value={form.nombre} 
          onChange={handleChange} 
          required 
          placeholder="Ej: Mojito Clásico" 
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-100 transition-all"
        />
      </div>

      {/* Descripción */}
      <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
          <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h7" />
          </svg>
          Descripción
        </label>
        <textarea 
          name="descripcion" 
          value={form.descripcion} 
          onChange={handleChange} 
          required 
          rows={4}
          placeholder="Describe el cóctel, su historia o características especiales..." 
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-100 transition-all resize-none"
        />
      </div>

      {/* Ingredientes */}
      <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
          <svg className="w-5 h-5 text-pink-500" fill="currentColor" viewBox="0 0 20 20">
            <path d="M3 1a1 1 0 000 2h1.22l.305 1.222a.997.997 0 00.01.042l1.358 5.43-.893.892C3.74 11.846 4.632 14 6.414 14H15a1 1 0 000-2H6.414l1-1H14a1 1 0 00.894-.553l3-6A1 1 0 0017 3H6.28l-.31-1.243A1 1 0 005 1H3z" />
          </svg>
          Ingredientes
        </label>
        <textarea 
          name="ingredientes" 
          value={form.ingredientes} 
          onChange={handleChange} 
          required 
          rows={3}
          placeholder="Separa los ingredientes con comas: Ron blanco, Menta fresca, Azúcar, Lima, Agua mineral" 
          className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:border-pink-400 focus:ring-4 focus:ring-pink-100 transition-all resize-none"
        />
        <p className="text-xs text-gray-500 mt-1">Separa cada ingrediente con una coma</p>
      </div>

      {/* Foto */}
      <div>
        <label className="flex items-center gap-2 text-sm font-semibold text-gray-700 mb-2">
          <svg className="w-5 h-5 text-pink-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
          </svg>
          Foto del Cóctel
        </label>
        <div className="flex flex-col md:flex-row gap-4 items-start">
          {preview && (
            <div className="w-full md:w-48 h-48 rounded-xl overflow-hidden shadow-lg border-2 border-gray-200">
              <img src={preview} alt="Preview" className="w-full h-full object-cover" />
            </div>
          )}
          <div className="flex-1">
            <input 
              type="file" 
              name="foto" 
              accept="image/*" 
              onChange={handleChange} 
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:bg-pink-50 file:text-pink-600 file:font-semibold hover:file:bg-pink-100 transition-all cursor-pointer"
            />
            <p className="text-xs text-gray-500 mt-2">Formatos: JPG, PNG, GIF (Max 5MB)</p>
          </div>
        </div>
      </div>

      {/* Botones */}
      <div className="flex gap-3 pt-4">
        <button 
          type="submit" 
          disabled={loading} 
          className="flex-1 px-6 py-3 bg-gradient-to-r from-pink-500 to-purple-500 text-white font-bold rounded-xl shadow-lg hover:shadow-xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-2"
        >
          {loading ? (
            <>
              <svg className="animate-spin w-5 h-5" fill="none" viewBox="0 0 24 24">
                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Guardando...
            </>
          ) : (
            <>
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
              </svg>
              Guardar Cóctel
            </>
          )}
        </button>
      </div>
    </form>
  );
}
