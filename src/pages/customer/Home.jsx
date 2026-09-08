// src/pages/customer/Home.jsx
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ShieldCheck, Truck, BadgeCheck, RotateCcw, ChevronRight,
  Shirt, Watch, Footprints, Smartphone, Sparkles, UtensilsCrossed,
  ShoppingBag, Tag,
} from 'lucide-react';
import { getFeaturedProducts, getCategories, getFlashDeals } from '../../services/productService';
import { getApprovedVendors } from '../../services/vendorService';
import ProductCard from '../../components/customer/ProductCard';
import FlashDealCard from '../../components/customer/FlashDealCard';
import VendorCard from '../../components/customer/VendorCard';

// Best-effort icon match by category name so /admin-created categories get a
// sensible icon with zero schema changes. Falls back to a generic tag icon.
const ICONS_BY_KEYWORD = [
  [/fashion|cloth|dress|shadda|atamfa/i, Shirt],
  [/bag/i, ShoppingBag],
  [/watch/i, Watch],
  [/shoe|footwear|takalma/i, Footprints],
  [/electronic|phone|gadget/i, Smartphone],
  [/beauty|cosmetic|kwalliya/i, Sparkles],
  [/home|kitchen/i, UtensilsCrossed],
];
function iconForCategory(name = '') {
  const match = ICONS_BY_KEYWORD.find(([re]) => re.test(name));
  return match ? match[1] : Tag;
}

const TRUST_BADGES = [
  { icon: ShieldCheck, label: '100% Secure', sub: 'Payments' },
  { icon: Truck, label: 'Fast & Safe', sub: 'Delivery' },
  { icon: BadgeCheck, label: 'Trusted', sub: 'Vendors' },
  { icon: RotateCcw, label: 'Easy Returns', sub: '& Refunds' },
];

export default function Home() {
  const [state, setState] = useState({
    loading: true, error: null,
    products: [], categories: [], vendors: [], deals: [],
  });

  useEffect(() => {
    (async () => {
      try {
        const [products, categories, vendors, deals] = await Promise.all([
          getFeaturedProducts(12),
          getCategories(),
          getApprovedVendors(8),
          getFlashDeals(4).catch(() => []), // optional — degrade quietly if not wired yet
        ]);
        setState({ loading: false, error: null, products, categories, vendors, deals });
      } catch (e) {
        setState({ loading: false, error: e.message, products: [], categories: [], vendors: [], deals: [] });
      }
    })();
  }, []);

  return (
    <div>
      {/* HERO */}
      <section className="bg-gradient-to-br from-brand-green to-emerald-700 text-white">
        <div className="max-w-7xl mx-auto px-4 py-16 md:py-24 text-center">
          <h1 className="text-3xl md:text-5xl font-bold mb-4">Discover. Shop. Grow.</h1>
          <p className="max-w-xl mx-auto text-white/90 mb-8">
            Quality products from trusted vendors. We handle the rest and deliver to your doorstep.
          </p>
          <div className="flex justify-center gap-3 flex-wrap">
            <Link to="/categories" className="btn-primary bg-white text-brand-green hover:bg-gray-100">
              Shop Now <ChevronRight className="inline w-4 h-4 -mr-1" />
            </Link>
            <Link to="/categories" className="btn-secondary bg-transparent border border-white text-white hover:bg-white/10">
              Explore Categories
            </Link>
          </div>
        </div>
      </section>

      {/* TRUST BADGES */}
      <section className="max-w-7xl mx-auto px-4 -mt-6 md:-mt-8 relative z-10">
        <div className="card grid grid-cols-2 md:grid-cols-4 gap-4 p-4 md:p-5">
          {TRUST_BADGES.map((b) => (
            <div key={b.label} className="flex items-center gap-2.5">
              <b.icon className="w-6 h-6 text-brand-green flex-shrink-0" />
              <div className="text-sm leading-tight">
                <p className="font-medium text-gray-800">{b.label}</p>
                <p className="text-gray-500 text-xs">{b.sub}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* CATEGORIES */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-semibold text-gray-800">Shop By Categories</h2>
          <Link to="/categories" className="text-sm text-brand-green font-medium flex items-center gap-0.5">
            View All <ChevronRight className="w-4 h-4" />
          </Link>
        </div>
        {state.loading ? (
          <p className="text-gray-400 text-sm">Loading categories...</p>
        ) : state.categories.length === 0 ? (
          <p className="text-gray-400 text-sm">No categories yet. An admin can add some from /admin/products.</p>
        ) : (
          <div className="grid grid-cols-3 sm:grid-cols-5 md:grid-cols-7 gap-4">
            {state.categories.map((c) => {
              const Icon = iconForCategory(c.name);
              return (
                <Link key={c.id} to={`/categories?cat=${c.id}`} className="flex flex-col items-center gap-2 text-center group">
                  <span className="w-14 h-14 rounded-full bg-emerald-50 flex items-center justify-center group-hover:bg-emerald-100 transition">
                    <Icon className="w-6 h-6 text-brand-green" />
                  </span>
                  <span className="text-xs font-medium text-gray-700 leading-tight">{c.name}</span>
                </Link>
              );
            })}
          </div>
        )}
      </section>

      {/* FLASH DEALS — only renders when discounted products actually exist */}
      {state.deals.length > 0 && (
        <section className="max-w-7xl mx-auto px-4 py-10">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-800">🔥 Flash Deals</h2>
            <Link to="/categories?sort=deals" className="text-sm text-brand-green font-medium flex items-center gap-0.5">
              View All <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {state.deals.map((p) => (
              <FlashDealCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}

      {/* FEATURED PRODUCTS */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <h2 className="text-lg font-semibold text-gray-800 mb-4">Featured Products</h2>
        {state.error && <p className="text-red-500 text-sm mb-3">Couldn't load products: {state.error}</p>}
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

      {/* TRUSTED VENDORS */}
      <section className="max-w-7xl mx-auto px-4 py-10">
        <div className="flex items-center gap-2 mb-4">
          <BadgeCheck className="w-5 h-5 text-brand-green" />
          <h2 className="text-lg font-semibold text-gray-800">Trusted Vendors</h2>
        </div>
        {!state.loading && state.vendors.length === 0 ? (
          <p className="text-gray-400 text-sm">No approved vendors yet.</p>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {state.vendors.map((v) => (
              <VendorCard key={v.id} vendor={v} />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
