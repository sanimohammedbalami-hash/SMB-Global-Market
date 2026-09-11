import React, { useState } from 'react';

function AddressPage({ onNavigate, lang, setLang }) {
  const [addresses, setAddresses] = useState([
    { id: 1, name: 'Gida (Home)', address: 'No. 12 Zoo Road, Kano, Nigeria', isDefault: true },
    { id: 2, name: 'Ofis (Office)', address: 'Commercial Complex, Post Office Road, Kano, Nigeria', isDefault: false }
  ]);

  const content = {
    en: { title: 'Saved Addresses', addBtn: '+ Add New Address', defaultBadge: 'Default' },
    ha: { title: 'Adireshin da ke Ajiye', addBtn: '+ Ƙara Sabon Adireshi', defaultBadge: 'Na Farko' }
  };

  const t = content[lang] || content.en;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-emerald-900 text-white p-4 flex justify-between items-center sticky top-0 z-10 shadow-md">
        <button onClick={() => onNavigate && onNavigate('account')} className="text-sm font-bold bg-emerald-800 px-3 py-1 rounded-lg">
          ‹ {lang === 'ha' ? 'Koma' : 'Back'}
        </button>
        <h1 className="text-sm font-bold">{t.title}</h1>
        <button onClick={() => setLang(lang === 'en' ? 'ha' : 'en')} className="px-2.5 py-1 bg-emerald-800 text-emerald-100 rounded-lg text-xs font-semibold">
          {lang === 'en' ? '🇳🇬 HA' : '🇬🇧 EN'}
        </button>
      </div>

      <div className="p-4 space-y-3">
        {addresses.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm space-y-2">
            <div className="flex justify-between items-center">
              <h3 className="text-xs font-bold text-gray-900">{item.name}</h3>
              {item.isDefault && (
                <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded">
                  {t.defaultBadge}
                </span>
              )}
            </div>
            <p className="text-xs text-gray-600">{item.address}</p>
          </div>
        ))}

        <button
          onClick={() => alert(lang === 'ha' ? 'Za a faɗada sashen ƙara adireshi!' : 'Add address coming soon!')}
          className="w-full py-3 bg-emerald-800 text-white text-xs font-bold rounded-xl shadow hover:bg-emerald-900 transition mt-4"
        >
          {t.addBtn}
        </button>
      </div>
    </div>
  );
}

export default AddressPage;
