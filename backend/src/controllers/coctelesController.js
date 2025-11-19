import supabase from '../supabaseClient.js';

const BUCKET = 'cocteles';

export async function listCocteles(req, res) {
  try {
    const { data, error } = await supabase
      .from('cocteles')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al listar cócteles' });
  }
}

export async function getCoctel(req, res) {
  const { id } = req.params;
  try {
    const { data, error } = await supabase
      .from('cocteles')
      .select('*')
      .eq('id', id)
      .single();

    if (error) {
      return res.status(404).json({ error: 'Cóctel no encontrado' });
    }

    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al obtener cóctel' });
  }
}

async function uploadImage(file) {
  if (!file) return null;
  const filename = `${Date.now()}_${file.originalname}`;
  const path = `public/${filename}`;
  const { data, error } = await supabase.storage
    .from(BUCKET)
    .upload(path, file.buffer, { contentType: file.mimetype, upsert: false });

  if (error) {
    throw error;
  }

  const { data: urlData } = supabase.storage.from(BUCKET).getPublicUrl(path);
  return urlData?.publicUrl || null;
}

export async function createCoctel(req, res) {
  try {
    console.log('createCoctel body:', req.body);
    console.log('createCoctel files:', req.files);

    const { nombre, descripcion, ingredientes, favorito } = req.body || {};
    const file = req.files && req.files[0];

    // Validación básica
    if (!nombre || nombre.toString().trim() === '') {
      return res.status(400).json({ error: 'El campo "nombre" es requerido' });
    }

    let foto_url = null;
    if (file) {
      foto_url = await uploadImage(file);
    }

    const { data, error } = await supabase
      .from('cocteles')
      .insert([
        {
          nombre,
          descripcion,
          ingredientes,
          foto_url,
          favorito: favorito === 'true' || favorito === true
        }
      ])
      .select()
      .single();

    if (error) throw error;
    res.status(201).json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al crear cóctel' });
  }
}

export async function updateCoctel(req, res) {
  const { id } = req.params;
  try {
    const { nombre, descripcion, ingredientes, favorito } = req.body;
    const file = req.files && req.files[0];

    let foto_url = null;
    if (file) {
      foto_url = await uploadImage(file);
    }

    const updates = {
      ...(nombre && { nombre }),
      ...(descripcion && { descripcion }),
      ...(ingredientes && { ingredientes }),
      ...(typeof favorito !== 'undefined' && { favorito: favorito === 'true' || favorito === true }),
      ...(foto_url && { foto_url })
    };

    const { data, error } = await supabase
      .from('cocteles')
      .update(updates)
      .eq('id', id)
      .select()
      .single();

    if (error) throw error;
    res.json(data);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al actualizar cóctel' });
  }
}

export async function deleteCoctel(req, res) {
  const { id } = req.params;
  try {
    const { data, error } = await supabase
      .from('cocteles')
      .delete()
      .eq('id', id)
      .select();

    if (error) throw error;
    res.json({ deleted: true });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Error al eliminar cóctel' });
  }
}
