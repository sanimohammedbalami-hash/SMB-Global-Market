import React from 'react';

function CategoriesPage({ onNavigate, lang }) {
  return (
    <div className="p-4">
      <button onClick={() => onNavigate && onNavigate('home')} className="text-emerald-800 text-sm font-bold mb-4">
        ‹ {lang === 'ha' ? 'Koma' : 'Back'}
      </button>
      <h1 className="text-lg font-bold text-gray-800">{lang === 'ha' ? 'Rukunai' : 'Categories'}</h1>
    </div>
  );
}

export default CategoriesPage;
