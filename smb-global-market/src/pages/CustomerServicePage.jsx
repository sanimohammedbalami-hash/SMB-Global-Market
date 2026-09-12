import React from 'react';

function CustomerServicePage({ onNavigate, lang }) {
  return (
    <div className="p-4 bg-gray-50 min-h-screen space-y-4">
      <button onClick={() => onNavigate('account')} className="text-emerald-800 text-xs font-bold">
        ‹ {lang === 'ha' ? 'Koma Asusu' : 'Back to Account'}
      </button>
      <h1 className="text-base font-extrabold text-gray-800">{lang === 'ha' ? 'Taimakon Abokan Ciniki' : 'Customer Service'}</h1>

      <div className="bg-white p-4 rounded-xl border border-gray-100 text-center space-y-3">
        <span className="text-4xl">🎧</span>
        <h3 className="text-xs font-bold text-gray-800">{lang === 'ha' ? 'Muna Nan Don Taimaka Muku' : 'We are here to help you'}</h3>
        <p className="text-[11px] text-gray-500">{lang === 'ha' ? 'Tuntuɓe mu ta WhatsApp ko waya gadan-gadan.' : 'Contact our support team directly.'}</p>
        <button className="w-full bg-emerald-600 text-white font-bold py-2.5 rounded-xl text-xs">
          💬 Chat on WhatsApp
        </button>
      </div>
    </div>
  );
}

export default CustomerServicePage;
