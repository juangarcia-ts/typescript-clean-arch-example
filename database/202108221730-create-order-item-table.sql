CREATE TABLE public.order_item (
  order_id UUID REFERENCES "order"("id"),
  item_id UUID REFERENCES "item"("id"),
  price numeric,
	amount integer,
  primary key (order_id, item_id)
);