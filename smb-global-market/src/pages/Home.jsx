import React from 'react';

function Home({ onNavigate, lang, setLang, user }) {
  const userName = user && user.name ? user.name : 'Customer';

  const content = {
    en: {
      greeting: `Hello, ${userName} 👋`,
      subGreeting: 'Welcome back to SMB Global Market',
      delivery: 'Delivery Location: Kano, Nigeria',
      searchPlaceholder: 'Search for products, brands, or categories...',
      flashSale: 'FLASH SALE',
      flashTitle: 'Big Discounts, Bigger Dreams!',
      flashSub: 'Top brands. Best prices. Shop now!',
      endsIn: 'Ends in:',
      categories: 'Shop by Category',
      seeAll: 'See All >',
      featured: 'Featured Products',
      limitedStock: 'Limited Stock!',
      limitedSub: 'Popular items are selling fast. Don\'t miss out!',
      onlyLeft: 'Only 5 left'
    },
    ha: {
      greeting: `Sannu, ${userName} 👋`,
      subGreeting: 'Barka da dawowa SMB Global Market',
      delivery: 'Wajen Isar da Sako: Kano, Nigeria',
      searchPlaceholder: 'Nemi kayayyaki, alama, ko rukuni...',
      flashSale: 'RAGIN FARASHI',
      flashTitle: 'Ragi Mai Yawa, Cikar Burinku!',
      flashSub: 'Manyan samfura. Farashi mai kyau. Saya yanzu!',
      endsIn: 'Yana karewa a:',
      categories: 'Rarrabuwar Kayayyaki',
      seeAll: 'Duba Duka >',
      featured: 'Zantattun Kayayyaki',
      limitedStock: 'Kayan sun kusa ƙarewa!',
      limitedSub: 'Kaya masu farinjini suna saurin ƙarewa!',
      onlyLeft: 'Sauran guda 5 kawai'
    }
  };

  const t = content[lang] || content.en;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Top Header */}
      <div className="bg-emerald-900 text-white p-4 rounded-b-2xl shadow-md space-y-3">
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-emerald-700 rounded-full flex items-center justify-center font-bold text-sm">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="font-bold text-sm leading-tight">{t.greeting}</h1>
              <p className="text-[10px] text-emerald-200">{t.subGreeting}</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setLang(lang === 'en' ? 'ha' : 'en')}
              className="px-2 py-1 bg-emerald-800 text-emerald-100 rounded-lg text-xs font-semibold"
            >
              {lang === 'en' ? '🇳🇬 HA' : '🇬🇧 EN'}
            </button>
            <span className="text-lg cursor-pointer">🔔</span>
            <span className="text-lg cursor-pointer" onClick={() => onNavigate && onNavigate('cart')}>🛒</span>
          </div>
        </div>

        <div className="text-[11px] text-emerald-200 flex items-center space-x-1">
          <span>📍</span>
          <span>{t.delivery}</span>
        </div>

        <div className="relative">
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            className="w-full pl-9 pr-4 py-2 bg-white text-gray-800 rounded-xl text-xs shadow-inner focus:outline-none"
          />
          <span className="absolute left-3 top-2.5 text-gray-400 text-xs">🔍</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-4">
        {/* Banner */}
        <div className="bg-emerald-800 text-white p-4 rounded-2xl shadow-md relative overflow-hidden">
          <span className="bg-yellow-400 text-emerald-950 font-extrabold text-[10px] px-2 py-0.5 rounded-md uppercase">
            {t.flashSale}
          </span>
          <h2 className="text-base font-bold mt-2">{t.flashTitle}</h2>
          <p className="text-[11px] text-emerald-100 mt-1">{t.flashSub}</p>
        </div>

        {/* Categories */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-xs text-gray-800">{t.categories}</h3>
            <span 
              onClick={() => onNavigate && onNavigate('categories')} 
              className="text-emerald-800 text-xs font-bold cursor-pointer"
            >
              {t.seeAll}
            </span>
          </div>
          <div className="grid grid-cols-4 gap-2 text-center">
            {['Fashion', 'Beauty', 'Phones', 'Home'].map((cat, idx) => (
              <div 
                key={idx} 
                onClick={() => onNavigate && onNavigate('categories')}
                className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm cursor-pointer hover:border-emerald-500"
              >
                <div className="text-2xl mb-1">{idx === 0 ? '👕' : idx === 1 ? '💄' : idx === 2 ? '📱' : '🛋️'}</div>
                <span className="text-[10px] font-medium text-gray-700">{cat}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Products */}
        <div>
          <div className="flex justify-between items-center mb-2">
            <h3 className="font-bold text-xs text-gray-800">{t.featured}</h3>
            <span 
              onClick={() => onNavigate && onNavigate('categories')} 
              className="text-emerald-800 text-xs font-bold cursor-pointer"
            >
              {t.seeAll}
            </span>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div 
              onClick={() => onNavigate && onNavigate('product_details')}
              className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm cursor-pointer hover:border-emerald-500 transition"
            >
              <div className="h-24 bg-gray-50 rounded-lg flex items-center justify-center text-4xl mb-2">📱</div>
              <h4 className="font-bold text-xs text-gray-800 truncate">Samsung Galaxy A55</h4>
              <p className="text-emerald-800 font-extrabold text-xs mt-1">₦320,000</p>
            </div>

            <div 
              onClick={() => onNavigate && onNavigate('product_details')}
              className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm cursor-pointer hover:border-emerald-500 transition"
            >
              <div className="h-24 bg-gray-50 rounded-lg flex items-center justify-center text-4xl mb-2">🎧</div>
              <h4 className="font-bold text-xs text-gray-800 truncate">Wireless Earbuds</h4>
              <p className="text-emerald-800 font-extrabold text-xs mt-1">₦15,000</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
