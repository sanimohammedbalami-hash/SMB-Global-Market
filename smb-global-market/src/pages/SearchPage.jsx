import React, { useState } from 'react';

function SearchPage({ onNavigate, lang, setLang }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const products = [
    { id: 1, name: 'Samsung Galaxy A55 5G', category: 'Phones', price: 320000, icon: '📱' },
    { id: 2, name: 'Wireless Earbuds', category: 'Phones', price: 15000, icon: '🎧' },
    { id: 3, name: 'Smart Watch Series 8', category: 'Phones', price: 45000, icon: '⌚' },
    { id: 4, name: 'Men Designer Jacket', category: 'Fashion', price: 25000, icon: '🧥' },
    { id: 5, name: 'Lipstick & Makeup Kit', category: 'Beauty', price: 12000, icon: '💄' },
    { id: 6, name: 'Modern Sofa Set', category: 'Home', price: 180000, icon: '🛋️' }
  ];

  const categories = ['All', 'Phones', 'Fashion', 'Beauty', 'Home'];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const content = {
    en: {
      title: 'Search Products',
      placeholder: 'Search items, brands...',
      noResults: 'No products found',
      all: 'All'
    },
    ha: {
      title: 'Neman Kayayyaki',
      placeholder: 'Binciki kaya, samfura...',
      noResults: 'Ba a samu kayan ba',
      all: 'Duk'
    }
  };

  const t = content[lang] || content.en;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Top Bar with Input */}
      <div className="bg-emerald-900 text-white p-4 sticky top-0 z-10 shadow-md space-y-3">
        <div className="flex justify-between items-center">
          <button
            onClick={() => onNavigate && onNavigate('home')}
            className="text-sm font-bold bg-emerald-800 px-3 py-1 rounded-lg"
          >
            ‹ {lang === 'ha' ? 'Koma' : 'Back'}
          </button>
          <h1 className="text-sm font-bold">{t.title}</h1>
          <button
            onClick={() => setLang(lang === 'en' ? 'ha' : 'en')}
            className="px-2.5 py-1 bg-emerald-800 text-emerald-100 rounded-lg text-xs font-semibold"
          >
            {lang === 'en' ? '🇳🇬 HA' : '🇬🇧 EN'}
          </button>
        </div>

        <div className="relative">
          <input
            type="text"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            placeholder={t.placeholder}
            className="w-full pl-9 pr-4 py-2 bg-white text-gray-800 rounded-xl text-xs shadow-inner focus:outline-none"
          />
          <span className="absolute left-3 top-2.5 text-gray-400 text-xs">🔍</span>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Category Filters */}
        <div className="flex space-x-2 overflow-x-auto pb-1 scrollbar-none">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3 py-1.5 rounded-lg text-xs font-semibold whitespace-nowrap transition ${
                selectedCategory === cat
                  ? 'bg-emerald-800 text-white'
                  : 'bg-white text-gray-600 border border-gray-200'
              }`}
            >
              {cat === 'All' ? t.all : cat}
            </button>
          ))}
        </div>

        {/* Results Grid */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-12 text-gray-400 text-xs">
            {t.noResults}
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            {filteredProducts.map((product) => (
              <div
                key={product.id}
                onClick={() => onNavigate && onNavigate('product_details')}
                className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm cursor-pointer hover:border-emerald-500 transition"
              >
                <div className="h-24 bg-gray-50 rounded-lg flex items-center justify-center text-4xl mb-2">
                  {product.icon}
                </div>
                <h4 className="font-bold text-xs text-gray-800 truncate">{product.name}</h4>
                <p className="text-emerald-800 font-extrabold text-xs mt-1">
                  ₦{product.price.toLocaleString()}
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

export default SearchPage;
