import React from 'react';

function OrdersPage({ onNavigate, lang }) {
  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <button onClick={() => onNavigate('account')} className="text-emerald-800 text-xs font-bold mb-4">
        ‹ {lang === 'ha' ? 'Koma Asusu' : 'Back to Account'}
      </button>
      <h1 className="text-base font-extrabold text-gray-800 mb-4">{lang === 'ha' ? 'Odoɗina' : 'My Orders'}</h1>

      <div onClick={() => onNavigate('track')} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm cursor-pointer space-y-2">
        <div className="flex justify-between items-center text-xs">
          <span className="font-bold text-gray-800">Order #SMB9982</span>
          <span className="bg-emerald-100 text-emerald-800 font-bold px-2 py-0.5 rounded-full text-[10px]">On the way</span>
        </div>
        <div className="flex items-center space-x-3 pt-2">
          <span className="text-3xl">⌚</span>
          <div>
            <p className="text-xs font-bold text-gray-700">Sleek Smartwatch</p>
            <p className="text-xs font-extrabold text-emerald-800">₦26,500</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrdersPage;
