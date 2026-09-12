import React from 'react';

function AddressPage({ onNavigate, lang }) {
  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <button onClick={() => onNavigate('account')} className="text-emerald-800 text-xs font-bold mb-4">
        ‹ {lang === 'ha' ? 'Koma Asusu' : 'Back to Account'}
      </button>
      <h1 className="text-base font-extrabold text-gray-800 mb-4">{lang === 'ha' ? 'Adireshin Isarwa' : 'Shipping Address'}</h1>

      <div className="bg-white p-4 rounded-xl border border-gray-100 space-y-3">
        <textarea defaultValue="No 12, Kano Road, Commercial Area, Nigeria" className="w-full border rounded-lg p-2 text-xs" rows="3" />
        <button onClick={() => onNavigate('account')} className="w-full bg-emerald-800 text-white font-bold py-3 rounded-xl text-xs">
          {lang === 'ha' ? 'Ajiye Adireshi' : 'Save Address'}
        </button>
      </div>
    </div>
  );
}

export default AddressPage;
