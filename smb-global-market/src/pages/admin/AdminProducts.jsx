import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';

export default function AdminProducts() {
  const [products, setProducts] = useState([]);
  const [q, setQ] = useState('');
  const [newCategory, setNewCategory] = useState('');

  async function load() {
    const { data } = await supabase
      .from('products')
      .select('id, name, price, status, vendor:vendors(business_name)')
      .order('created_at', { ascending: false });
    setProducts(data || []);
  }

  useEffect(() => {
    load();
  }, []);

  async function disable(id) {
    await supabase.from('products').update({ status: 'disabled' }).eq('id', id);
    load();
  }

  async function addCategory(e) {
    e.preventDefault();
    if (!newCategory.trim()) return;
    const slug = newCategory.trim().toLowerCase().replace(/\s+/g, '-');
    await supabase.from('categories').insert({ name: newCategory.trim(), slug });
    setNewCategory('');
  }

  const filtered = products.filter((p) => p.name.toLowerCase().includes(q.toLowerCase()));

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-xl font-bold mb-4">Products</h1>

      <form onSubmit={addCategory} className="flex gap-2 mb-6 max-w-sm">
        <input className="input" placeholder="New category name" value={newCategory} onChange={(e) => setNewCategory(e.target.value)} />
        <button className="btn-secondary whitespace-nowrap">Add category</button>
      </form>

      <input className="input mb-4 max-w-sm" placeholder="Search products..." value={q} onChange={(e) => setQ(e.target.value)} />
      <div className="space-y-2">
        {filtered.map((p) => (
          <div key={p.id} className="card p-3 flex justify-between items-center">
            <div>
              <p className="font-medium">{p.name}</p>
              <p className="text-sm text-gray-500">{p.vendor?.business_name} · ₦{Number(p.price).toLocaleString()} · {p.status}</p>
            </div>
            {p.status !== 'disabled' && (
              <button onClick={() => disable(p.id)} className="text-red-500 text-xs">Disable</button>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
