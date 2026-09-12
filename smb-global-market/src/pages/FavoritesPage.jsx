import React from 'react';

function FavoritesPage({ onNavigate, lang }) {
  return (
    <div className="p-4">
      <button onClick={() => onNavigate && onNavigate('home')} className="text-emerald-800 text-sm font-bold mb-4">
        ‹ {lang === 'ha' ? 'Koma' : 'Back'}
      </button>
      <h1 className="text-lg font-bold text-gray-800">{lang === 'ha' ? 'Abubuwan da kafi so' : 'Favorites'}</h1>
      <p className="text-xs text-gray-500 mt-2">{lang === 'ha' ? 'Babu abubuwan da aka adana.' : 'No favorite items yet.'}</p>
    </div>
  );
}

export default FavoritesPage;
