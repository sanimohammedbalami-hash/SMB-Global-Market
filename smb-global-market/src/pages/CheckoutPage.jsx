import React from 'react';

function CheckoutPage({ onNavigate, lang }) {
  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <button onClick={() => onNavigate('cart')} className="text-emerald-800 text-xs font-bold mb-4">
        ‹ {lang === 'ha' ? 'Koma Kwamfa' : 'Back to Cart'}
      </button>
      <h1 className="text-base font-extrabold text-gray-800 mb-4">{lang === 'ha' ? 'Tabbatar da Biya' : 'Checkout'}</h1>

      <div className="bg-white p-4 rounded-xl border border-gray-100 space-y-3 mb-4">
        <h3 className="text-xs font-bold text-gray-800">{lang === 'ha' ? 'Adireshin Isarwa' : 'Shipping Address'}</h3>
        <p className="text-[11px] text-gray-500">No 12, Kano Road, Commercial Area, Nigeria</p>
        <button onClick={() => onNavigate('address')} className="text-[11px] text-emerald-800 font-bold">
          {lang === 'ha' ? 'Sauya Adireshi' : 'Change Address'}
        </button>
      </div>

      <div className="bg-white p-4 rounded-xl border border-gray-100 space-y-3 mb-6">
        <h3 className="text-xs font-bold text-gray-800">{lang === 'ha' ? 'Hanyar Biya' : 'Payment Method'}</h3>
        <div className="space-y-2">
          <label className="flex items-center space-x-2 border p-2 rounded-lg text-xs">
            <input type="radio" name="pay" defaultChecked />
            <span>💳 Card / Bank Transfer (Paystack)</span>
          </label>
          <label className="flex items-center space-x-2 border p-2 rounded-lg text-xs">
            <input type="radio" name="pay" />
            <span>💵 Pay on Delivery</span>
          </label>
        </div>
      </div>

      <button onClick={() => onNavigate('order-success')} className="w-full bg-emerald-800 text-white font-bold py-3.5 rounded-xl text-xs shadow-md">
        {lang === 'ha' ? 'Biya ₦26,500' : 'Pay ₦26,500'}
      </button>
    </div>
  );
}

export default CheckoutPage;
