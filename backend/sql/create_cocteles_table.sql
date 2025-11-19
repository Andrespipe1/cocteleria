-- Script SQL para crear la tabla cocteles en Supabase

CREATE TABLE IF NOT EXISTS cocteles (
  id serial PRIMARY KEY,
  nombre varchar(100) NOT NULL,
  descripcion text,
  ingredientes text,
  foto_url text,
  favorito boolean DEFAULT false,
  created_at timestamptz DEFAULT now()
);
