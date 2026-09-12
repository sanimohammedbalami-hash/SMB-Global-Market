import React from 'react';

function ProductDetailsPage({ product, onNavigate, lang }) {
  return (
    <div className="p-4">
      <button onClick={() => onNavigate && onNavigate('home')} className="text-emerald-800 text-sm font-bold mb-4">
        ‹ {lang === 'ha' ? 'Koma' : 'Back'}
      </button>
      <h1 className="text-lg font-bold text-gray-800">{product?.name || (lang === 'ha' ? 'Bayanin Samfur' : 'Product Details')}</h1>
    </div>
  );
}

export default ProductDetailsPage;
