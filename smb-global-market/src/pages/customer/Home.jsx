import { useEffect, useState } from 'react';
import { Search, Truck, RotateCcw, Shield, Gift } from 'lucide-react';
import { getFeaturedProducts } from '../../services/productService';
import ProductCard from '../../components/customer/ProductCard';
import BottomNav from '../../components/common/BottomNav';

const CATEGORIES = ['All', 'Electronics', 'Shadda', 'Atamfa/Lace', 'Shoes', 'Watch', 'Men', 'Bags', 'Beauty'];

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    getFeaturedProducts(50)
      .then(setProducts)
      .finally(() => setLoading(false));
  }, []);

  const filteredProducts =
    activeCategory === 'All'
      ? products
      : products.filter((p) => p.category?.name?.toLowerCase() === activeCategory.toLowerCase());

  return (
    <div className="bg-gray-50 min-h-screen pb-16">
      <div className="bg-white px-4 py-3 sticky top-0 z-30 border-b border-gray-100">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <input className="w-full pl-9 pr-4 py-2.5 bg-gray-100 rounded-full text-sm outline-none" placeholder="Search products..." />
        </div>
      </div>

      <div className="bg-white px-4 py-2 flex gap-2 overflow-x-auto sticky top-[57px] z-20 border-b border-gray-100">
        {CATEGORIES.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`whitespace-nowrap px-3 py-1.5 rounded-full text-xs font-medium ${
              activeCategory === cat ? 'bg-brand-green text-white' : 'bg-gray-100 text-gray-600'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-px bg-gray-100 mt-2 text-center">
        <div className="bg-white py-3 flex flex-col items-center gap-1">
          <Truck className="w-5 h-5 text-brand-green" />
          <span className="text-xs font-medium text-brand-navy">Fast Delivery</span>
        </div>
        <div className="bg-white py-3 flex flex-col items-center gap-1">
          <RotateCcw className="w-5 h-5 text-brand-green" />
          <span className="text-xs font-medium text-brand-navy">Easy Returns</span>
        </div>
      </div>

      <div className="bg-white mt-2 px-4 py-3 flex items-center gap-3">
        <div className="flex items-center gap-2 flex-1">
          <Shield className="w-5 h-5 text-brand-green" />
          <span className="text-sm text-brand-navy font-medium">Why choose SMB Global Market?</span>
        </div>
        <span className="text-xs text-brand-green whitespace-nowrap">Secure Payments &gt;</span>
      </div>

      {!loading && filteredProducts.length === 0 && (
        <div className="bg-white mt-2 px-4 py-3 flex items-center justify-end gap-2">
          <Gift className="w-4 h-4 text-gray-300" />
          <span className="text-xs text-gray-400">No published products yet.</span>
        </div>
      )}

      {activeCategory === 'All' && (
        <div className="mt-2 px-4">
          <h2 className="text-sm font-semibold text-brand-navy mb-2">🔥 Offer Deals</h2>
          {loading ? (
            <p className="text-gray-400 text-sm">Loading...</p>
          ) : products.length === 0 ? null : (
            <div className="flex gap-3 overflow-x-auto pb-2">
              {products.slice(0, 6).map((p) => (
                <div key={p.id} className="min-w-[130px]">
                  <ProductCard product={p} />
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      <div className="mt-4 px-4">
        <h2 className="text-sm font-semibold text-brand-navy mb-2">
          {activeCategory === 'All' ? 'All Products' : activeCategory}
        </h2>
        {loading ? (
          <p className="text-gray-400 text-sm">Loading...</p>
        ) : filteredProducts.length === 0 ? null : (
          <div className="grid grid-cols-2 gap-3">
            {filteredProducts.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>

      <BottomNav />
    </div>
  );
}
