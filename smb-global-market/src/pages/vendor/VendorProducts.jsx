import { useEffect, useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { getVendorByProfileId } from '../../services/vendorService';
import { getVendorProducts, createProduct, updateProduct, deleteProduct } from '../../services/productService';
import { getCategories } from '../../services/productService';

export default function VendorProducts() {
  const { profile } = useAuth();
  const [vendor, setVendor] = useState(null);
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [form, setForm] = useState({ name: '', price: '', stock: '', category_id: '', description: '' });
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!profile) return;
    (async () => {
      const v = await getVendorByProfileId(profile.id);
      setVendor(v);
      setCategories(await getCategories());
      if (v) setProducts(await getVendorProducts(v.id));
    })();
  }, [profile]);

  async function handleCreate(e) {
    e.preventDefault();
    setError(null);
    try {
      const created = await createProduct(vendor.id, {
        name: form.name,
        price: Number(form.price),
        category_id: form.category_id || null,
        description: form.description,
        status: 'draft',
        stock: Number(form.stock)
      });
      setProducts((p) => [created, ...p]);
      setForm({ name: '', price: '', stock: '', category_id: '', description: '' });
    } catch (err) {
      setError(err.message);
    }
  }

  async function togglePublish(product) {
    const status = product.status === 'published' ? 'draft' : 'published';
    await updateProduct(product.id, { status });
    setProducts((ps) => ps.map((p) => (p.id === product.id ? { ...p, status } : p)));
  }

  async function handleDelete(id) {
    await deleteProduct(id);
    setProducts((ps) => ps.filter((p) => p.id !== id));
  }

  if (!vendor) return <div className="p-8 text-gray-400">Loading...</div>;

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-xl font-bold mb-6">Manage Products</h1>

      <form onSubmit={handleCreate} className="card p-4 grid grid-cols-2 gap-3 mb-8">
        <input className="input col-span-2" placeholder="Product name" required value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
        <input className="input" type="number" placeholder="Price (₦)" required value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
        <input className="input" type="number" placeholder="Stock quantity" required value={form.stock} onChange={(e) => setForm({ ...form, stock: e.target.value })} />
        <select className="input col-span-2" value={form.category_id} onChange={(e) => setForm({ ...form, category_id: e.target.value })}>
          <option value="">Select category</option>
          {categories.map((c) => <option key={c.id} value={c.id}>{c.name}</option>)}
        </select>
        <textarea className="input col-span-2" placeholder="Description" value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} />
        {error && <p className="text-red-500 text-sm col-span-2">{error}</p>}
        <button className="btn-primary col-span-2">Add Product (as draft)</button>
      </form>

      <div className="space-y-2">
        {products.map((p) => (
          <div key={p.id} className="card p-3 flex justify-between items-center">
            <div>
              <p className="font-medium">{p.name}</p>
              <p className="text-xs text-gray-500">₦{Number(p.price).toLocaleString()} · {p.status}</p>
            </div>
            <div className="flex gap-2">
              <button onClick={() => togglePublish(p)} className="btn-secondary text-xs">
                {p.status === 'published' ? 'Unpublish' : 'Publish'}
              </button>
              <button onClick={() => handleDelete(p.id)} className="text-red-500 text-xs">Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
