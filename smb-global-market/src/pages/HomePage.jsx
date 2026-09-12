import React from 'react';

function HomePage({ onNavigate, lang, setLang }) {
  return (
    <div className="p-4">
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-lg font-bold text-emerald-900">SMB Global Market</h1>
        <button
          onClick={() => setLang(lang === 'en' ? 'ha' : 'en')}
          className="px-2 py-1 bg-emerald-100 text-emerald-800 rounded text-xs font-bold"
        >
          {lang === 'en' ? '🇳🇬 HA' : '🇬🇧 EN'}
        </button>
      </div>
      <p className="text-sm text-gray-600">Barka da zuwa SMB Global Market!</p>
    </div>
  );
}

export default HomePage;
