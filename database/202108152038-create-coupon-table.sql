CREATE TABLE public.coupon (
  code TEXT PRIMARY KEY,
  percentage INTEGER NOT NULL,
  expires_at DATE
);