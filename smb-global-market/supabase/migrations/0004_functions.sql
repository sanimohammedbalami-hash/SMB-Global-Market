-- Atomic, floor-clamped inventory decrement, called by the webhook after
-- a verified payment. Runs as security definer so it can be invoked via
-- RPC from the Edge Function's service-role client.
create or replace function decrement_inventory(p_product_id uuid, p_qty int)
returns void as $$
begin
  update inventory
  set quantity = greatest(quantity - p_qty, 0),
      updated_at = now()
  where product_id = p_product_id;
end;
$$ language plpgsql security definer;
