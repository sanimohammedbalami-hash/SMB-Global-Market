-- Storage buckets for product images, vendor logos, avatars.
insert into storage.buckets (id, name, public)
values
  ('product-images', 'product-images', true),
  ('vendor-logos', 'vendor-logos', true),
  ('avatars', 'avatars', true)
on conflict (id) do nothing;

-- Public read for all three (they're display images on a public marketplace).
create policy "public_read_product_images" on storage.objects
  for select using (bucket_id = 'product-images');
create policy "public_read_vendor_logos" on storage.objects
  for select using (bucket_id = 'vendor-logos');
create policy "public_read_avatars" on storage.objects
  for select using (bucket_id = 'avatars');

-- Authenticated users may only write into a folder named after their own
-- auth uid, e.g. avatars/<uid>/photo.jpg — enforced via storage.foldername.
create policy "avatars_owner_write" on storage.objects
  for insert with check (
    bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text
  );
create policy "avatars_owner_update" on storage.objects
  for update using (
    bucket_id = 'avatars' and (storage.foldername(name))[1] = auth.uid()::text
  );

-- Vendor logos / product images: writable by authenticated users into a
-- folder named after their vendor id; application code must construct
-- paths as <vendor_id>/<file> and the vendor ownership is validated by the
-- application layer at upload time plus the vendor RLS on the vendors table.
create policy "vendor_logos_write" on storage.objects
  for insert with check (bucket_id = 'vendor-logos' and auth.role() = 'authenticated');
create policy "product_images_write" on storage.objects
  for insert with check (bucket_id = 'product-images' and auth.role() = 'authenticated');
