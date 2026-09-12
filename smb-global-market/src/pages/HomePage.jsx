import React, { useState } from 'react';

function HomePage({ onNavigate, lang, setLang, cartCount = 2 }) {
  const [activeCategory, setActiveCategory] = useState('All');

  const categories = [
    { id: 'All', name: 'All', nameHa: 'Duka' },
    { id: 'Bags', name: 'Bags', nameHa: 'Jatuka' },
    { id: 'Watches', name: 'Watches', nameHa: 'Agogo' },
    { id: 'Shadda', name: 'Shadda', nameHa: 'Shadda' },
    { id: 'Yard', name: 'Yard', nameHa: 'Yardi' },
    { id: 'Atamfa', name: 'Atamfa', nameHa: 'Atamfa' },
    { id: 'Lace', name: 'Lace', nameHa: 'Lace' },
    { id: 'Shoes', name: 'Shoes', nameHa: 'Takalma' },
  ];

  const allProducts = [
    {
      id: 1,
      category: 'Shadda',
      title: 'Premium Quality Shadda (5 Yards)',
      titleHa: 'Shadda Mai Kyau Yardi 5',
      price: '₦25,000',
      oldPrice: '₦32,000',
      discount: '-22%',
      tag: 'Flash Sale',
    },
    {
      id: 2,
      category: 'Bags',
      title: 'Luxury Gold Handbag for Ladies',
      titleHa: 'Jakar Mata Mai Kyau',
      price: '₦12,500',
      oldPrice: '₦16,000',
      discount: '-20%',
      tag: 'Top Rated',
    },
    {
      id: 3,
      category: 'Watches',
      title: 'Designer Swiss Watch',
      titleHa: 'Agogon Swiss Mai Kyau',
      price: '₦18,000',
      oldPrice: '₦22,000',
      discount: '-18%',
      tag: 'Best Seller',
    },
    {
      id: 4,
      category: 'Atamfa',
      title: 'High Quality Atamfa Material',
      titleHa: 'Atamfa Mai Kyawun Gaske',
      price: '₦8,500',
      oldPrice: '₦11,000',
      discount: '-22%',
      tag: 'Hot Deals',
    },
    {
      id: 5,
      category: 'Shoes',
      title: 'Men Italian Leather Shoes',
      titleHa: 'Takalmin Fata Na Maza',
      price: '₦21,000',
      oldPrice: '₦26,000',
      discount: '-19%',
      tag: 'New Arrival',
    },
    {
      id: 6,
      category: 'Lace',
      title: 'French Voile Lace (5 Yards)',
      titleHa: 'Lace Mai Tsada Yardi 5',
      price: '₦35,000',
      oldPrice: '₦42,000',
      discount: '-16%',
      tag: 'Trending',
    },
  ];

  const filteredProducts = activeCategory === 'All'
    ? allProducts
    : allProducts.filter(p => p.category === activeCategory);

  return (
    <div className="bg-gray-50 min-h-screen pb-20 max-w-md mx-auto">
      {/* Top Header Bar */}
      <div className="bg-emerald-800 text-white p-3 space-y-2 sticky top-0 z-20 shadow-md">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <span className="bg-white text-emerald-800 font-black text-xs px-2 py-0.5 rounded shadow-xs">
              SMB
            </span>
            <span className="text-xs font-semibold">
              Hello, G. Bbb
            </span>
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={() => setLang(lang === 'ha' ? 'en' : 'ha')}
              className="bg-emerald-700 hover:bg-emerald-600 text-white text-[10px] font-bold px-2 py-1 rounded flex items-center space-x-1 transition border border-emerald-600"
            >
              <span>🇳🇬</span>
              <span>{lang === 'ha' ? 'HA' : 'EN'}</span>
            </button>
            <button
              onClick={() => onNavigate('cart')}
              className="relative p-1 text-white"
            >
              <span className="text-lg">🛒</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[9px] font-bold w-4 h-4 rounded-full flex items-center justify-center border border-white">
                  {cartCount}
                </span>
              )}
            </button>
          </div>
        </div>

        {/* Search Field */}
        <div className="relative">
          <input
            type="text"
            placeholder={lang === 'ha' ? 'Nemi kayayyaki, samfuran kaya...' : 'Search products, brands...'}
            className="w-full bg-white text-gray-800 text-xs py-2 pl-8 pr-3 rounded-md focus:outline-none placeholder-gray-400"
          />
          <span className="absolute left-2.5 top-2 text-gray-400 text-xs">🔍</span>
        </div>
      </div>

      {/* Horizontal Categories */}
      <div className="bg-white border-b border-gray-200 overflow-x-auto whitespace-nowrap scrollbar-none px-2 py-2">
        <div className="flex space-x-4 px-1">
          {categories.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setActiveCategory(cat.id)}
                className={`text-xs font-bold transition-all relative pb-1 ${
                  isActive
                    ? 'text-emerald-800 border-b-2 border-emerald-800'
                    : 'text-gray-600 hover:text-emerald-700'
                }`}
              >
                {lang === 'ha' ? cat.nameHa : cat.name}
              </button>
            );
          })}
        </div>
      </div>

      {/* Flash Banner */}
      <div className="p-3">
        <div className="bg-emerald-900 text-white rounded-xl p-3 shadow-sm relative overflow-hidden flex justify-between items-center">
          <div>
            <span className="bg-yellow-400 text-emerald-950 text-[9px] font-black px-1.5 py-0.5 rounded uppercase">
              {lang === 'ha' ? 'RAGIN RANA' : 'FLASH SALE'}
            </span>
            <h3 className="text-xs font-bold mt-1">
              {lang === 'ha' ? 'Ragi Mai Yawa A Yau!' : 'Big Discounts, Bigger Dreams!'}
            </h3>
            <p className="text-[10px] text-emerald-200">Up to 70% Off • Limited Time</p>
          </div>
          <div className="bg-emerald-950/60 px-2 py-1 rounded text-center text-yellow-300 font-mono text-[10px] border border-emerald-700">
            02 : 45 : 12
          </div>
        </div>

        {/* Feature Badges - Guaranteed Quality Instead of Free Shipping */}
        <div className="flex justify-between items-center text-[10px] font-semibold text-emerald-900 bg-emerald-50/70 py-1.5 px-3 rounded-lg mt-2 border border-emerald-100">
          <div className="flex items-center space-x-1">
            <span>✓</span>
            <span>{lang === 'ha' ? 'Ingantattun Kaya' : 'Guaranteed Quality'}</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>⚡</span>
            <span>{lang === 'ha' ? 'Isar da Sauri' : 'Fast Delivery'}</span>
          </div>
          <div className="flex items-center space-x-1">
            <span>🛡️</span>
            <span>{lang === 'ha' ? 'Tabbacin Biya' : 'Safe Payments'}</span>
          </div>
        </div>
      </div>

      {/* Title */}
      <div className="px-3 flex justify-between items-center mb-2">
        <h2 className="text-xs font-black text-gray-800 uppercase tracking-wide">
          {activeCategory === 'All' 
            ? (lang === 'ha' ? 'KAYAYYAKINMU' : 'FEATURED PRODUCTS')
            : `${activeCategory.toUpperCase()} PRODUCTS`}
        </h2>
        <span className="text-[10px] text-emerald-700 font-bold cursor-pointer">
          See All &rsaquo;
        </span>
      </div>

      {/* Product Grid */}
      <div className="px-3 grid grid-cols-2 gap-2">
        {filteredProducts.length > 0 ? (
          filteredProducts.map((p) => (
            <div
              key={p.id}
              onClick={() => onNavigate('product')}
              className="bg-white rounded-lg p-2 border border-gray-100 shadow-xs relative flex flex-col justify-between cursor-pointer hover:shadow-sm transition"
            >
              <span className="absolute top-2 left-2 bg-red-600 text-white text-[9px] font-bold px-1.5 py-0.5 rounded-full z-10">
                {p.discount}
              </span>

              <div className="w-full h-28 bg-gray-50 rounded-md mb-2 flex items-center justify-center p-2">
                <div className="w-16 h-16 bg-emerald-100/50 rounded-lg flex items-center justify-center text-3xl">
                  🛍️
                </div>
              </div>

              <div>
                <h4 className="text-[11px] font-bold text-gray-800 line-clamp-2 leading-tight">
                  {lang === 'ha' ? p.titleHa : p.title}
                </h4>

                <div className="flex items-baseline space-x-1.5 mt-1">
                  <span className="text-xs font-black text-emerald-800">{p.price}</span>
                  <span className="text-[9px] text-gray-400 line-through">{p.oldPrice}</span>
                </div>
              </div>

              <div className="mt-2 flex justify-between items-center">
                <span className="text-[9px] text-emerald-700 font-semibold bg-emerald-50 px-1.5 py-0.5 rounded">
                  {p.tag}
                </span>
                <button className="bg-emerald-800 text-white w-5 h-5 rounded flex items-center justify-center font-bold text-xs shadow-xs hover:bg-emerald-700">
                  +
                </button>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-2 text-center py-8 text-gray-400 text-xs">
            {lang === 'ha' ? 'Babu kayayyaki a wannan rukunin a yanzu.' : 'No products found in this category.'}
          </div>
        )}
      </div>

      {/* Bottom Navigation */}
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
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[8px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
            {cartCount}
          </span>
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
