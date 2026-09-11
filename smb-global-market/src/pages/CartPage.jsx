import React from 'react';

function CartPage({ onNavigate, lang, setLang }) {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-emerald-900 text-white p-4 flex justify-between items-center sticky top-0 z-10 shadow-md">
        <h1 className="text-lg font-bold">{lang === 'ha' ? 'Kwandon Saye-Saye' : 'Shopping Cart'}</h1>
        <span className="text-sm bg-emerald-700 px-2.5 py-0.5 rounded-full font-bold">2 items</span>
      </div>

      <div className="p-4 space-y-3">
        <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">📱</span>
            <div>
              <h3 className="text-xs font-bold text-gray-800">Samsung Galaxy A55</h3>
              <p className="text-[11px] text-emerald-800 font-extrabold">₦320,000</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="w-6 h-6 bg-gray-200 rounded text-xs font-bold">-</button>
            <span className="text-xs font-bold">1</span>
            <button className="w-6 h-6 bg-emerald-800 text-white rounded text-xs font-bold">+</button>
          </div>
        </div>

        <div className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <span className="text-3xl">🎧</span>
            <div>
              <h3 className="text-xs font-bold text-gray-800">Wireless Earbuds</h3>
              <p className="text-[11px] text-emerald-800 font-extrabold">₦15,000</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button className="w-6 h-6 bg-gray-200 rounded text-xs font-bold">-</button>
            <span className="text-xs font-bold">1</span>
            <button className="w-6 h-6 bg-emerald-800 text-white rounded text-xs font-bold">+</button>
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm space-y-2 mt-4">
          <div className="flex justify-between text-xs text-gray-600">
            <span>{lang === 'ha' ? 'Jimillar Kaya' : 'Subtotal'}</span>
            <span>₦335,000</span>
          </div>
          <div className="flex justify-between text-xs text-gray-600">
            <span>{lang === 'ha' ? 'Kudin Isarwa' : 'Delivery Fee'}</span>
            <span>₦2,000</span>
          </div>
          <hr />
          <div className="flex justify-between text-sm font-bold text-gray-900">
            <span>{lang === 'ha' ? 'Cikakken Kudin' : 'Total'}</span>
            <span className="text-emerald-800">₦337,000</span>
          </div>
          <button
            onClick={() => onNavigate && onNavigate('checkout')}
            className="w-full mt-3 py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold rounded-xl text-xs transition"
          >
            {lang === 'ha' ? 'Ci gaba da Biya' : 'Proceed to Checkout'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default CartPage;
