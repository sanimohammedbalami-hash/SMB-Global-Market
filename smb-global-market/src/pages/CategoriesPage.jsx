import React from 'react';

function CategoriesPage({ onNavigate, lang }) {
  const cats = [
    { id: 1, name: 'Electronics', nameHa: 'Kayan Lantarki', icon: '📱' },
    { id: 2, name: 'Fashion & Clothes', nameHa: 'Tufafi & Kwalliya', icon: '👕' },
    { id: 3, name: 'Beauty & Health', nameHa: 'Kula da Jiki', icon: '💄' },
    { id: 4, name: 'Groceries & Foods', nameHa: 'Kayan Abinci', icon: '🛒' },
    { id: 5, name: 'Home Appliances', nameHa: 'Kayan Gida', icon: '🏠' }
  ];

  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <button onClick={() => onNavigate('home')} className="text-emerald-800 text-xs font-bold mb-4 flex items-center">
        ‹ {lang === 'ha' ? 'Koma Gida' : 'Back Home'}
      </button>
      <h1 className="text-base font-extrabold text-gray-800 mb-4">{lang === 'ha' ? 'Dukkan Rukunai' : 'All Categories'}</h1>
      <div className="space-y-3">
        {cats.map((c) => (
          <div key={c.id} className="bg-white p-4 rounded-xl border border-gray-100 flex items-center justify-between shadow-sm cursor-pointer">
            <div className="flex items-center space-x-3">
              <span className="text-2xl">{c.icon}</span>
              <span className="text-xs font-bold text-gray-800">{lang === 'ha' ? c.nameHa : c.name}</span>
            </div>
            <span className="text-gray-400 text-xs">›</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoriesPage;
