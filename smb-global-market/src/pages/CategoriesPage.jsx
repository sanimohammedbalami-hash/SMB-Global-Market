import React from 'react';

function CategoriesPage({ onNavigate, lang, setLang }) {
  const categories = [
    { id: 'fashion', name: lang === 'ha' ? 'Kayan Sawa' : 'Fashion', icon: '👕', count: '1,200+ items' },
    { id: 'beauty', name: lang === 'ha' ? 'Kayan Kyau' : 'Beauty & Personal Care', icon: '💄', count: '850+ items' },
    { id: 'phones', name: lang === 'ha' ? 'Lantarki & Woyoyi' : 'Phones & Gadgets', icon: '📱', count: '430+ items' },
    { id: 'home', name: lang === 'ha' ? 'Kayan Gida' : 'Home & Living', icon: '🛋️', count: '620+ items' },
    { id: 'groceries', name: lang === 'ha' ? 'Abinci & Kayan Miya' : 'Groceries', icon: '🧺', count: '950+ items' },
    { id: 'sports', name: lang === 'ha' ? 'Wasanni' : 'Sports & Fitness', icon: '⚽', count: '310+ items' },
    { id: 'automotive', name: lang === 'ha' ? 'Motoci & Kayan Gyara' : 'Automotive', icon: '🚗', count: '180+ items' },
    { id: 'baby', name: lang === 'ha' ? 'Kayan Yara' : 'Baby & Kids', icon: '🧸', count: '540+ items' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-emerald-900 text-white p-4 flex justify-between items-center sticky top-0 z-10 shadow-md">
        <h1 className="text-lg font-bold">{lang === 'ha' ? 'Rarrabuwar Kayayyaki' : 'All Categories'}</h1>
        <button
          onClick={() => setLang(lang === 'en' ? 'ha' : 'en')}
          className="px-2.5 py-1 bg-emerald-800 text-emerald-100 rounded-lg text-xs font-semibold"
        >
          {lang === 'en' ? '🇳🇬 HA' : '🇬🇧 EN'}
        </button>
      </div>

      <div className="p-4 grid grid-cols-2 gap-3">
        {categories.map((cat) => (
          <div
            key={cat.id}
            onClick={() => alert(`Opening category: ${cat.name}`)}
            className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center justify-center cursor-pointer hover:border-emerald-500 transition"
          >
            <span className="text-4xl mb-2">{cat.icon}</span>
            <h3 className="font-bold text-gray-800 text-sm text-center">{cat.name}</h3>
            <p className="text-[11px] text-gray-400 mt-1">{cat.count}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default CategoriesPage;
