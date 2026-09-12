import React from 'react';

function FavoritesPage({ onNavigate, lang }) {
  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <button onClick={() => onNavigate('home')} className="text-emerald-800 text-xs font-bold mb-4">
        ‹ {lang === 'ha' ? 'Koma Gida' : 'Back Home'}
      </button>
      <h1 className="text-base font-extrabold text-gray-800 mb-4">{lang === 'ha' ? 'Abubuwan da kafi so' : 'Favorites'}</h1>

      <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-center justify-between shadow-sm">
        <div className="flex items-center space-x-3">
          <span className="text-3xl">🎧</span>
          <div>
            <h4 className="text-xs font-bold text-gray-800">Wireless Earbuds</h4>
            <span className="text-xs text-emerald-800 font-extrabold">₦12,500</span>
          </div>
        </div>
        <button onClick={() => onNavigate('cart')} className="bg-emerald-800 text-white text-xs px-3 py-1.5 rounded-lg font-bold">
          {lang === 'ha' ? 'Sanya a Kwamfa' : 'Add to Cart'}
        </button>
      </div>
    </div>
  );
}

export default FavoritesPage;
