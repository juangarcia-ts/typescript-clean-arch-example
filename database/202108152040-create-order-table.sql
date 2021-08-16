CREATE TABLE public.order (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  cpf TEXT NOT NULL,
  shipping_cost NUMERIC NOT NULL,
  coupon_code TEXT REFERENCES "coupon"("code") 
);