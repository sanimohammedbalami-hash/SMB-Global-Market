import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { getFeaturedProducts, getCategories } from '../../services/productService';
import { getApprovedVendors } from '../../services/vendorService';
import ProductCard from '../../components/customer/ProductCard';

export default function Home() {
  const [state, setState] = useState({ loading: true, error: null, products: [], categories: [], vendors: [] });

  useEffect(() => {
    (async () => {
      try {
        const [products, categories, vendors] = await Promise.all([
          getFeaturedProducts(12),
          getCategories(),
          getApprovedVendors(8)
        ]);
        setState({ loading: false, error: null, products, categories, vendors });
      } catch (e) {
        setState({ loading: false, error: e.message, products: [], categories: [], vendors: [] });
      }
    })();
  }, []);

  return (
    <div>
      <section className="bg-gradient-to-br from-brand-navy to-brand-green text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Discover. Shop. Grow.</h1>
          <p className="max-w-xl mx-auto text-white/90 mb-8">
            Find quality products from trusted sellers across the SMB Global Market marketplace.
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <Link to="/categories" className="btn-primary bg-white text-brand-green hover:bg-gray-100">Shop Now</Link>
            <Link to="/categories" className="btn-secondary bg-transparent border-white text-white hover:bg-white/10">
              Explore Categories
            </Link>
          </div>
        </div>
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-lg font-semibold mb-4">Categories</h2>
        {state.loading ? (
          <p className="text-gray-400 text-sm">Loading categories...</p>
        ) : state.categories.length === 0 ? (
          <p className="text-gray-400 text-sm">No categories yet. An admin can add some from /admin/products.</p>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-9 gap-3">
            {state.categories.map((c) => (
              <Link key={c.id} to={`/categories?cat=${c.id}`} className="card p-3 text-center text-sm hover:shadow-md">
                {c.name}
              </Link>
            ))}
          </div>
        )}
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-lg font-semibold mb-4">Featured Products</h2>
        {state.error && <p className="text-red-500 text-sm">Couldn't load products: {state.error}</p>}
        {state.loading ? (
          <p className="text-gray-400 text-sm">Loading products...</p>
        ) : state.products.length === 0 ? (
          <p className="text-gray-400 text-sm">No published products yet.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
            {state.products.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </section>

      <section className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-lg font-semibold mb-4">Top Vendors</h2>
        {!state.loading && state.vendors.length === 0 ? (
          <p className="text-gray-400 text-sm">No approved vendors yet.</p>
        ) : (
          <div className="flex gap-4 overflow-x-auto">
            {state.vendors.map((v) => (
              <div key={v.id} className="card p-4 min-w-[160px] text-center">
                <div className="w-14 h-14 rounded-full bg-gray-100 mx-auto mb-2" />
                <p className="text-sm font-medium truncate">{v.business_name}</p>
              </div>
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
