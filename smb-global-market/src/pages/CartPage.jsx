import React from 'react';

function CartPage({ onNavigate, lang }) {
  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <button onClick={() => onNavigate('home')} className="text-emerald-800 text-xs font-bold mb-4">
        ‹ {lang === 'ha' ? 'Koma Gida' : 'Back Home'}
      </button>
      <h1 className="text-base font-extrabold text-gray-800 mb-4">{lang === 'ha' ? 'Kwamfan Saye' : 'Shopping Cart'}</h1>

      <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-center justify-between shadow-sm mb-4">
        <div className="flex items-center space-x-3">
          <span className="text-3xl">⌚</span>
          <div>
            <h4 className="text-xs font-bold text-gray-800">{lang === 'ha' ? 'Agogon Hannu' : 'Smartwatch'}</h4>
            <span className="text-xs text-emerald-800 font-extrabold">₦25,000</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <button className="w-6 h-6 bg-gray-100 rounded text-xs font-bold">-</button>
          <span className="text-xs font-bold">1</span>
          <button className="w-6 h-6 bg-gray-100 rounded text-xs font-bold">+</button>
        </div>
      </div>

      <div className="bg-white p-4 rounded-xl border border-gray-100 space-y-2 mb-6">
        <div className="flex justify-between text-xs text-gray-500">
          <span>{lang === 'ha' ? 'Jimillar Kaya' : 'Subtotal'}</span>
          <span className="font-bold text-gray-800">₦25,000</span>
        </div>
        <div className="flex justify-between text-xs text-gray-500">
          <span>{lang === 'ha' ? 'Kudin Isarwa' : 'Delivery Fee'}</span>
          <span className="font-bold text-gray-800">₦1,500</span>
        </div>
        <div className="border-t pt-2 flex justify-between text-xs font-extrabold text-emerald-800">
          <span>{lang === 'ha' ? 'Cikakken Kudin' : 'Total'}</span>
          <span>₦26,500</span>
        </div>
      </div>

      <button onClick={() => onNavigate('checkout')} className="w-full bg-emerald-800 text-white font-bold py-3.5 rounded-xl text-xs shadow-md">
        {lang === 'ha' ? 'Kammala Biya' : 'Proceed to Checkout'}
      </button>
    </div>
  );
}

export default CartPage;
