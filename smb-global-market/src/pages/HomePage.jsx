import React from 'react';

function HomePage({ onNavigate, lang, setLang, cartCount }) {
  return (
    <div className="bg-gray-100 min-h-screen pb-20 max-w-md mx-auto">
      {/* Header */}
      <div className="bg-emerald-800 text-white p-4 sticky top-0 z-50">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center space-x-2">
            <span className="text-xl">🛒</span>
            <span className="font-black text-sm tracking-wide">SMB GLOBAL MARKET</span>
          </div>
          <div className="flex items-center space-x-2">
            <button 
              onClick={() => setLang(lang === 'ha' ? 'en' : 'ha')}
              className="bg-emerald-700 text-white text-[10px] px-2 py-1 rounded font-bold"
            >
              {lang === 'ha' ? 'English' : 'Hausa'}
            </button>
            <div className="relative cursor-pointer" onClick={() => onNavigate('cart')}>
              <span className="text-xl">🛍️</span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-orange-500 text-white text-[9px] w-4 h-4 rounded-full flex items-center justify-center font-bold">
                  {cartCount}
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <input 
            type="text" 
            placeholder={lang === 'ha' ? 'Binciki kayayyaki...' : 'Search products...'} 
            className="w-full bg-white text-gray-800 text-xs rounded-lg pl-9 pr-3 py-2.5 focus:outline-none"
          />
          <span className="absolute left-3 top-2.5 text-gray-400 text-xs">🔍</span>
        </div>
      </div>

      {/* Vendor Access Banner (NEW) */}
      <div className="p-4">
        <div className="bg-gradient-to-r from-emerald-900 to-emerald-700 text-white p-4 rounded-xl shadow-sm flex justify-between items-center">
          <div>
            <h3 className="text-xs font-bold uppercase tracking-wider">
              {lang === 'ha' ? 'Kuna da Shago?' : 'Are you a Vendor?'}
            </h3>
            <p className="text-[10px] text-emerald-200 mt-0.5">
              {lang === 'ha' ? 'Sayar da kayanka a SMB Global Market' : 'Manage your store & products'}
            </p>
          </div>
          <div className="space-x-1">
            <button 
              onClick={() => onNavigate('vendor-login')}
              className="bg-white text-emerald-900 text-[10px] font-bold px-3 py-1.5 rounded-lg shadow"
            >
              {lang === 'ha' ? 'Shiga' : 'Login'}
            </button>
            <button 
              onClick={() => onNavigate('vendor-register')}
              className="bg-orange-500 text-white text-[10px] font-bold px-3 py-1.5 rounded-lg shadow"
            >
              {lang === 'ha' ? 'Rajista' : 'Register'}
            </button>
          </div>
        </div>
      </div>

      {/* Categories Section */}
      <div className="px-4 mb-4">
        <div className="flex justify-between items-center mb-2">
          <h4 className="text-xs font-bold text-gray-800">
            {lang === 'ha' ? 'Rukunoni (Categories)' : 'Categories'}
          </h4>
          <button 
            onClick={() => onNavigate('categories')}
            className="text-[11px] text-emerald-800 font-bold hover:underline"
          >
            {lang === 'ha' ? 'Duba Duka ›' : 'View All ›'}
          </button>
        </div>
        <div className="grid grid-cols-4 gap-2 text-center">
          <div onClick={() => onNavigate('categories')} className="bg-white p-2.5 rounded-xl shadow-sm cursor-pointer">
            <span className="text-xl">👔</span>
            <p className="text-[10px] font-bold text-gray-700 mt-1">Shadda</p>
          </div>
          <div onClick={() => onNavigate('categories')} className="bg-white p-2.5 rounded-xl shadow-sm cursor-pointer">
            <span className="text-xl">⌚</span>
            <p className="text-[10px] font-bold text-gray-700 mt-1">Watches</p>
          </div>
          <div onClick={() => onNavigate('categories')} className="bg-white p-2.5 rounded-xl shadow-sm cursor-pointer">
            <span className="text-xl">👟</span>
            <p className="text-[10px] font-bold text-gray-700 mt-1">Shoes</p>
          </div>
          <div onClick={() => onNavigate('categories')} className="bg-white p-2.5 rounded-xl shadow-sm cursor-pointer">
            <span className="text-xl">📱</span>
            <p className="text-[10px] font-bold text-gray-700 mt-1">Gadgets</p>
          </div>
        </div>
      </div>

      {/* Featured Products */}
      <div className="px-4">
        <h4 className="text-xs font-bold text-gray-800 mb-2">
          {lang === 'ha' ? 'Kayayyaki Masu Zafi' : 'Featured Products'}
        </h4>
        <div className="grid grid-cols-2 gap-2">
          <div className="bg-white p-3 rounded-xl shadow-sm">
            <div className="bg-gray-100 h-28 rounded-lg flex items-center justify-center text-2xl mb-2">👔</div>
            <p className="text-[11px] font-bold text-gray-800 truncate">Men's Luxury Shadda</p>
            <p className="text-xs font-black text-emerald-800 mt-1">₦ 25,000</p>
          </div>
          <div className="bg-white p-3 rounded-xl shadow-sm">
            <div className="bg-gray-100 h-28 rounded-lg flex items-center justify-center text-2xl mb-2">⌚</div>
            <p className="text-[11px] font-bold text-gray-800 truncate">Smart Watch Series 8</p>
            <p className="text-xs font-black text-emerald-800 mt-1">₦ 15,000</p>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-200 flex justify-around py-2 z-50">
        <button onClick={() => onNavigate('home')} className="flex flex-col items-center text-emerald-800">
          <span className="text-base">🏠</span>
          <span className="text-[10px] font-bold">Home</span>
        </button>
        <button onClick={() => onNavigate('categories')} className="flex flex-col items-center text-gray-400">
          <span className="text-base">📁</span>
          <span className="text-[10px]">Categories</span>
        </button>
        <button onClick={() => onNavigate('vendor-login')} className="flex flex-col items-center text-gray-400">
          <span className="text-base">🏪</span>
          <span className="text-[10px]">Vendor</span>
        </button>
      </div>
    </div>
  );
}

export default HomePage;
