import React, { useState } from 'react';

function HomePage({ onNavigate, userPhone, lang, setLang }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    'All',
    'Bags',
    'Watches',
    'Shadda',
    'Yard',
    'Atamfa',
    'Lace',
    'Shoes',
    'Beauty',
    'Phones',
    'Electronics'
  ];

  const products = [
    {
      id: 1,
      title: 'Premium Quality Shadda (5 Yards)',
      titleHa: 'Kyakkyawan Shadda Mai Inganci (Yardi 5)',
      price: '₦25,000',
      oldPrice: '₦32,000',
      discount: '-22%',
      badge: 'Flash Sale',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300&auto=format&fit=crop&q=60',
      category: 'Shadda'
    },
    {
      id: 2,
      title: 'Luxury Gold Handbag for Ladies',
      titleHa: 'Atsattsaren Jakar Mata Mai Kyau',
      price: '₦12,500',
      oldPrice: '₦16,000',
      discount: '-20%',
      badge: 'Top Rated',
      image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=300&auto=format&fit=crop&q=60',
      category: 'Bags'
    },
    {
      id: 3,
      title: 'Designer Swiss Watch',
      titleHa: 'Agogon Hannu Mai Kyau',
      price: '₦18,000',
      oldPrice: '₦22,000',
      discount: '-18%',
      badge: 'Best Seller',
      image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&auto=format&fit=crop&q=60',
      category: 'Watches'
    },
    {
      id: 4,
      title: 'High Quality Atamfa Material',
      titleHa: 'Atamfa Mai Sanyi da Inganci',
      price: '₦8,500',
      oldPrice: '₦11,000',
      discount: '-22%',
      badge: 'Hot Deals',
      image: 'https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=300&auto=format&fit=crop&q=60',
      category: 'Atamfa'
    }
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-20 max-w-md mx-auto">
      {/* 1. COMPACT TOP HEADER */}
      <div className="bg-emerald-900 text-white p-3 space-y-2 sticky top-0 z-30 shadow-md">
        <div className="flex justify-between items-center text-xs">
          <div className="flex items-center space-x-2">
            <span className="w-6 h-6 bg-emerald-800 rounded-full flex items-center justify-center font-bold text-[10px]">SMB</span>
            <span className="font-semibold text-[11px]">Hello, {userPhone || '09025777951'}</span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setLang(lang === 'en' ? 'ha' : 'en')}
              className="bg-emerald-800 border border-emerald-700 px-2 py-0.5 rounded text-[10px] font-bold"
            >
              {lang === 'en' ? '🇳🇬 HA' : '🇬🇧 EN'}
            </button>
            <button onClick={() => onNavigate('cart')} className="relative">
              <span className="text-sm">🛒</span>
              <span className="absolute -top-1 -right-1 bg-red-500 text-[8px] rounded-full w-3 h-3 flex items-center justify-center font-bold">2</span>
            </button>
          </div>
        </div>

        {/* Compact Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder={lang === 'ha' ? "Binciki kayayyaki..." : "Search products, brands..."}
            className="w-full bg-white text-gray-800 text-xs py-1.5 pl-8 pr-3 rounded-full focus:outline-none shadow-inner"
          />
          <span className="absolute left-2.5 top-1.5 text-gray-400 text-xs">🔍</span>
        </div>
      </div>

      {/* 2. TEMO-STYLE HORIZONTAL CATEGORIES (TEXT ONLY) */}
      <div className="bg-white border-b border-gray-200 overflow-x-auto whitespace-nowrap scrollbar-hide px-2 py-2 flex space-x-4 text-xs font-semibold text-gray-600 sticky top-[75px] z-20 shadow-sm">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setActiveCategory(cat)}
            className={`pb-0.5 transition-all ${
              activeCategory === cat
                ? 'text-emerald-800 font-extrabold border-b-2 border-emerald-800 scale-105'
                : 'hover:text-emerald-700'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* 3. COMPACT BANNER (HALF HEIGHT) */}
      <div className="p-3">
        <div className="bg-gradient-to-r from-emerald-900 to-emerald-700 text-white rounded-xl p-3 shadow-sm flex items-center justify-between">
          <div>
            <span className="bg-amber-400 text-emerald-950 font-black text-[9px] px-1.5 py-0.5 rounded uppercase tracking-wider">Flash Sale</span>
            <h2 className="text-xs font-extrabold mt-1">Big Discounts, Bigger Dreams!</h2>
            <p className="text-[10px] text-emerald-200">Up to 70% Off • Limited Time</p>
          </div>
          <div className="text-right">
            <div className="bg-emerald-950/60 p-1.5 rounded-lg border border-emerald-600 text-[10px] font-mono font-bold text-amber-300">
              02 : 45 : 12
            </div>
          </div>
        </div>
      </div>

      {/* 4. TEMO-STYLE BADGES & ANNOUNCEMENT */}
      <div className="px-3 pb-2 flex items-center justify-between text-[10px] text-emerald-900 font-semibold bg-emerald-50/60 mx-3 rounded-lg p-2 border border-emerald-100">
        <span>✓ Free shipping offer</span>
        <span>⚡ Fast Delivery</span>
        <span>🛡️ Safe Payments</span>
      </div>

      {/* 5. PRODUCTS GRID (FEATURED) */}
      <div className="p-3">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-xs font-black text-gray-800 uppercase tracking-wide">
            {lang === 'ha' ? 'Kayayyakin da ke Kasuwa' : 'Featured Products'}
          </h3>
          <button onClick={() => onNavigate('categories')} className="text-[10px] text-emerald-800 font-bold">
            See All ›
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2.5">
          {products.map((item) => (
            <div
              key={item.id}
              onClick={() => onNavigate('details', item)}
              className="bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 cursor-pointer hover:shadow-md transition"
            >
              <div className="relative bg-gray-100 h-32 flex items-center justify-center p-2">
                <span className="text-4xl">🛍️</span>
                <span className="absolute top-1.5 left-1.5 bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full">
                  {item.discount}
                </span>
              </div>
              <div className="p-2 space-y-1">
                <p className="text-[11px] font-bold text-gray-800 truncate">
                  {lang === 'ha' ? item.titleHa : item.title}
                </p>
                <div className="flex items-baseline space-x-1.5">
                  <span className="text-xs font-black text-emerald-800">{item.price}</span>
                  <span className="text-[9px] text-gray-400 line-through">{item.oldPrice}</span>
                </div>
                <div className="pt-1 flex items-center justify-between">
                  <span className="text-[8px] bg-emerald-50 text-emerald-800 font-bold px-1.5 py-0.5 rounded">
                    {item.badge}
                  </span>
                  <button className="bg-emerald-800 text-white text-[10px] p-1 rounded-md">
                    +
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* 6. BOTTOM NAVIGATION BAR */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-200 px-4 py-2 flex justify-around items-center z-30">
        <button onClick={() => onNavigate('home')} className="flex flex-col items-center text-emerald-800 font-bold">
          <span className="text-base">🏠</span>
          <span className="text-[10px]">Home</span>
        </button>
        <button onClick={() => onNavigate('categories')} className="flex flex-col items-center text-gray-400 font-medium">
          <span className="text-base">📁</span>
          <span className="text-[10px]">Categories</span>
        </button>
        <button onClick={() => onNavigate('cart')} className="flex flex-col items-center text-gray-400 font-medium relative">
          <span className="text-base">🛒</span>
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[8px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">2</span>
          <span className="text-[10px]">Cart</span>
        </button>
        <button onClick={() => onNavigate('orders')} className="flex flex-col items-center text-gray-400 font-medium relative">
          <span className="text-base">📦</span>
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[8px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">3</span>
          <span className="text-[10px]">Orders</span>
        </button>
        <button onClick={() => onNavigate('account')} className="flex flex-col items-center text-gray-400 font-medium">
          <span className="text-base">👤</span>
          <span className="text-[10px]">Account</span>
        </button>
      </div>
    </div>
  );
}

export default HomePage;
