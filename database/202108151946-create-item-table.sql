CREATE TABLE public.item (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  description TEXT NOT NULL,
  price NUMERIC NOT NULL,
  height INTEGER NOT NULL,
  width INTEGER NOT NULL,
  depth INTEGER NOT NULL,
  weight INTEGER NOT NULL
);