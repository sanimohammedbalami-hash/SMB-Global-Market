import React, { useState } from 'react';

function HomePage({ onNavigate, lang, setLang }) {
  const [activeTab, setActiveTab] = useState('home');

  const products = [
    { id: 1, name: 'Sleek Smartwatch', nameHa: 'Agogon Hannu na Zamani', price: '₦25,000', category: 'electronics', image: '⌚', rating: '4.8' },
    { id: 2, name: 'Wireless Earbuds', nameHa: 'Na\'urar Sauraro ta Bluetooth', price: '₦12,500', category: 'electronics', image: '🎧', rating: '4.7' },
    { id: 3, name: 'Designer Backpack', nameHa: 'Katakon Jakar Baya', price: '₦18,000', category: 'fashion', image: '🎒', rating: '4.9' },
    { id: 4, name: 'Casual Sneakers', nameHa: 'Takalmin Zamani', price: '₦22,000', category: 'fashion', image: '👟', rating: '4.6' }
  ];

  const content = {
    en: {
      searchPlaceholder: 'Search products, brands...',
      bannerTitle: 'New Arrival Sale!',
      bannerDesc: 'Up to 40% OFF on Electronics & Fashion',
      shopNow: 'Shop Now',
      categories: 'Categories',
      popular: 'Popular Products',
      seeAll: 'See All'
    },
    ha: {
      searchPlaceholder: 'Bincika kayayyaki...',
      bannerTitle: 'Rangwamen Sababbin Kayan!',
      bannerDesc: 'Samu rangwamen har 40% akan Kayan Lantarki da Tufafi',
      shopNow: 'Yi Saye Yanzu',
      categories: 'Rukunai',
      popular: 'Kayayyakin da Aka Fiya Saye',
      seeAll: 'Duba Duka'
    }
  };

  const t = content[lang] || content.en;

  return (
    <div className="bg-gray-50 min-h-screen pb-24">
      {/* Top Header */}
      <div className="bg-emerald-900 text-white p-4 sticky top-0 z-20 shadow-md">
        <div className="flex justify-between items-center mb-3">
          <div>
            <h1 className="text-base font-extrabold tracking-wide">SMB Global Market</h1>
            <p className="text-[10px] text-emerald-200">Your trusted shopping marketplace</p>
          </div>
          <button
            onClick={() => setLang(lang === 'en' ? 'ha' : 'en')}
            className="px-2.5 py-1 bg-emerald-800 text-emerald-100 rounded-lg text-xs font-bold border border-emerald-700"
          >
            {lang === 'en' ? '🇳🇬 HA' : '🇬🇧 EN'}
          </button>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            className="w-full pl-9 pr-4 py-2 bg-white text-gray-800 text-xs rounded-xl focus:outline-none shadow-inner"
          />
          <span className="absolute left-3 top-2.5 text-gray-400 text-xs">🔍</span>
        </div>
      </div>

      {/* Main Content */}
      <div className="p-4 space-y-5">
        {/* Banner */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-700 text-white p-5 rounded-2xl shadow-lg relative overflow-hidden">
          <div className="relative z-10 max-w-[70%]">
            <span className="bg-emerald-600 text-[10px] font-bold uppercase px-2 py-0.5 rounded-full">LIMITED OFFER</span>
            <h2 className="text-sm font-bold mt-2 leading-tight">{t.bannerTitle}</h2>
            <p className="text-[11px] text-emerald-100 mt-1 leading-snug">{t.bannerDesc}</p>
            <button
              onClick={() => onNavigate('categories')}
              className="mt-3 bg-white text-emerald-900 text-xs font-bold px-3.5 py-1.5 rounded-lg shadow hover:bg-emerald-50 transition"
            >
              {t.shopNow}
            </button>
          </div>
          <span className="absolute right-2 bottom-1 text-7xl opacity-20 select-none">🛍️</span>
        </div>

        {/* Quick Categories */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-xs font-extrabold text-gray-800">{t.categories}</h3>
            <button onClick={() => onNavigate('categories')} className="text-[11px] font-bold text-emerald-800">
              {t.seeAll} ›
            </button>
          </div>
          <div className="grid grid-cols-4 gap-2 text-center">
            {[
              { id: 'electronics', icon: '📱', name: 'Electronics', nameHa: 'Lantarki' },
              { id: 'fashion', icon: '👕', name: 'Fashion', nameHa: 'Tufafi' },
              { id: 'beauty', icon: '💄', name: 'Beauty', nameHa: 'Kwalliya' },
              { id: 'groceries', icon: '🛒', name: 'Groceries', nameHa: 'Kayan Abinci' }
            ].map((cat) => (
              <div
                key={cat.id}
                onClick={() => onNavigate('categories')}
                className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center justify-center cursor-pointer active:scale-95 transition"
              >
                <span className="text-2xl mb-1">{cat.icon}</span>
                <span className="text-[10px] font-bold text-gray-700">{lang === 'ha' ? cat.nameHa : cat.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Popular Products Grid */}
        <div>
          <div className="flex justify-between items-center mb-3">
            <h3 className="text-xs font-extrabold text-gray-800">{t.popular}</h3>
            <button onClick={() => onNavigate('categories')} className="text-[11px] font-bold text-emerald-800">
              {t.seeAll} ›
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {products.map((item) => (
              <div
                key={item.id}
                onClick={() => onNavigate('details', item)}
                className="bg-white rounded-xl p-3 border border-gray-100 shadow-sm flex flex-col justify-between cursor-pointer active:scale-95 transition"
              >
                <div className="bg-gray-50 rounded-lg p-6 flex justify-center items-center text-4xl mb-2 relative">
                  {item.image}
                  <span className="absolute top-1 right-1 bg-white/80 backdrop-blur text-[9px] font-bold text-gray-600 px-1.5 py-0.5 rounded-full">
                    ⭐ {item.rating}
                  </span>
                </div>
                <div>
                  <h4 className="text-xs font-bold text-gray-800 line-clamp-1">
                    {lang === 'ha' ? item.nameHa : item.name}
                  </h4>
                  <div className="flex justify-between items-center mt-2">
                    <span className="text-xs font-extrabold text-emerald-800">{item.price}</span>
                    <button className="bg-emerald-800 text-white p-1 rounded-lg text-xs">
                      🛒
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-200 px-4 py-2 flex justify-around items-center z-30">
        <button
          onClick={() => { setActiveTab('home'); onNavigate('home'); }}
          className={`flex flex-col items-center ${activeTab === 'home' ? 'text-emerald-800 font-bold' : 'text-gray-400'}`}
        >
          <span className="text-lg">🏠</span>
          <span className="text-[10px] mt-0.5">{lang === 'ha' ? 'Gida' : 'Home'}</span>
        </button>

        <button
          onClick={() => { setActiveTab('categories'); onNavigate('categories'); }}
          className={`flex flex-col items-center ${activeTab === 'categories' ? 'text-emerald-800 font-bold' : 'text-gray-400'}`}
        >
          <span className="text-lg">🗂️</span>
          <span className="text-[10px] mt-0.5">{lang === 'ha' ? 'Rukunai' : 'Categories'}</span>
        </button>

        <button
          onClick={() => { setActiveTab('cart'); onNavigate('cart'); }}
          className={`flex flex-col items-center ${activeTab === 'cart' ? 'text-emerald-800 font-bold' : 'text-gray-400'}`}
        >
          <span className="text-lg">🛒</span>
          <span className="text-[10px] mt-0.5">{lang === 'ha' ? 'Kwamfa' : 'Cart'}</span>
        </button>

        <button
          onClick={() => { setActiveTab('favorites'); onNavigate('favorites'); }}
          className={`flex flex-col items-center ${activeTab === 'favorites' ? 'text-emerald-800 font-bold' : 'text-gray-400'}`}
        >
          <span className="text-lg">❤️</span>
          <span className="text-[10px] mt-0.5">{lang === 'ha' ? 'Abubuwan So' : 'Saved'}</span>
        </button>

        <button
          onClick={() => { setActiveTab('account'); onNavigate('account'); }}
          className={`flex flex-col items-center ${activeTab === 'account' ? 'text-emerald-800 font-bold' : 'text-gray-400'}`}
        >
          <span className="text-lg">👤</span>
          <span className="text-[10px] mt-0.5">{lang === 'ha' ? 'Asusu' : 'Account'}</span>
        </button>
      </div>
    </div>
  );
}

export default HomePage;
