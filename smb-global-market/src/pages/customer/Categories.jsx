import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { getCategories, getProductsByCategory } from '../../services/productService';
import ProductCard from '../../components/customer/ProductCard';

export default function Categories() {
  const [params, setParams] = useSearchParams();
  const activeCategory = params.get('cat');
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [sort, setSort] = useState('newest');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    getCategories().then(setCategories);
  }, []);

  useEffect(() => {
    if (!activeCategory) return setProducts([]);
    setLoading(true);
    getProductsByCategory(activeCategory, { sort }).then(setProducts).finally(() => setLoading(false));
  }, [activeCategory, sort]);

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 grid md:grid-cols-4 gap-6">
      <aside>
        <h2 className="font-semibold mb-3">Categories</h2>
        <ul className="space-y-1">
          {categories.map((c) => (
            <li key={c.id}>
              <button
                onClick={() => setParams({ cat: c.id })}
                className={`text-sm block w-full text-left px-2 py-1.5 rounded ${activeCategory === c.id ? 'bg-brand-green/10 text-brand-green font-medium' : 'text-gray-600'}`}
              >
                {c.name}
              </button>
            </li>
          ))}
        </ul>
      </aside>
      <section className="md:col-span-3">
        {!activeCategory ? (
          <p className="text-gray-400">Select a category to browse products.</p>
        ) : (
          <>
            <div className="flex justify-between items-center mb-4">
              <h2 className="font-semibold">{categories.find((c) => c.id === activeCategory)?.name}</h2>
              <select className="input w-40" value={sort} onChange={(e) => setSort(e.target.value)}>
                <option value="newest">Newest</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </div>
            {loading ? (
              <p className="text-gray-400 text-sm">Loading...</p>
            ) : products.length === 0 ? (
              <p className="text-gray-400 text-sm">No products in this category yet.</p>
            ) : (
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {products.map((p) => <ProductCard key={p.id} product={p} />)}
              </div>
            )}
          </>
        )}
      </section>
    </div>
  );
}
