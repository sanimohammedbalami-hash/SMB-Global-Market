import React from 'react';

function OrderSuccessPage({ onNavigate, lang }) {
  return (
    <div className="p-6 bg-white min-h-screen flex flex-col items-center justify-center text-center">
      <div className="w-20 h-20 bg-emerald-100 text-emerald-800 rounded-full flex items-center justify-center text-4xl mb-4">
        ✅
      </div>
      <h1 className="text-lg font-black text-gray-800 mb-2">
        {lang === 'ha' ? 'An Karbi Odarku Cikin Nasara!' : 'Order Placed Successfully!'}
      </h1>
      <p className="text-xs text-gray-500 max-w-xs mb-6">
        {lang === 'ha' ? 'Mungode da siyayya a SMB Global Market. Zamu sanar daku da zarar an aika kaya.' : 'Thank you for shopping with us. We will notify you once your package ships.'}
      </p>

      <button onClick={() => onNavigate('track')} className="w-full bg-emerald-800 text-white font-bold py-3 rounded-xl text-xs shadow-md mb-2">
        {lang === 'ha' ? 'Binciko Oda (Track Order)' : 'Track Order'}
      </button>

      <button onClick={() => onNavigate('home')} className="w-full border border-gray-200 text-gray-700 font-bold py-3 rounded-xl text-xs">
        {lang === 'ha' ? 'Koma Kasuwa' : 'Continue Shopping'}
      </button>
    </div>
  );
}

export default OrderSuccessPage;
