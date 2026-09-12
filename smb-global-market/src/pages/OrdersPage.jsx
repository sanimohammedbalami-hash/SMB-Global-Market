import React from 'react';

function OrdersPage({ onNavigate, lang }) {
  return (
    <div className="p-4">
      <button onClick={() => onNavigate && onNavigate('account')} className="text-emerald-800 text-sm font-bold mb-4">
        ‹ {lang === 'ha' ? 'Koma' : 'Back'}
      </button>
      <h1 className="text-lg font-bold text-gray-800">{lang === 'ha' ? 'Odoɗina' : 'My Orders'}</h1>
    </div>
  );
}

export default OrdersPage;
