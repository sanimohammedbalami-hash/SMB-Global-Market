import React from 'react';

function HomePage({ onNavigate, userPhone, lang, setLang }) {
  const categories = [
    { id: 'fashion', name: 'Fashion', icon: '👕', bg: 'bg-emerald-100' },
    { id: 'beauty', name: 'Beauty', icon: '💄', bg: 'bg-pink-100' },
    { id: 'phones', name: 'Phones', icon: '📱', bg: 'bg-blue-100' },
    { id: 'home', name: 'Home', icon: '🛋️', bg: 'bg-yellow-100' },
    { id: 'groceries', name: 'Groceries', icon: '🧺', bg: 'bg-orange-100' },
    { id: 'sports', name: 'Sports', icon: '⚽', bg: 'bg-purple-100' },
    { id: 'automotive', name: 'Automotive', icon: '🚗', bg: 'bg-red-100' },
    { id: 'baby', name: 'Baby & Kids', icon: '🧸', bg: 'bg-teal-100' },
  ];

  const featuredProducts = [
    { id: 1, name: 'Smart Smartphone X', price: '₦120,000', discount: '-15%', icon: '📱' },
    { id: 2, name: 'Wireless Headphones', price: '₦18,500', discount: '-20%', icon: '🎧' },
  ];

  return (
    <div className="bg-gray-50 min-h-screen pb-24 max-w-md mx-auto">
      {/* Header na Koren gaba-daya */}
      <div className="bg-emerald-900 text-white p-4 rounded-b-2xl shadow-lg space-y-3">
        <div className="flex justify-between items-start">
          <div className="flex items-center space-x-2">
            <div className="w-10 h-10 bg-emerald-800/80 border border-emerald-700 rounded-full flex items-center justify-center font-bold text-sm">
              0
            </div>
            <div>
              <h1 className="text-xs font-black tracking-wide flex items-center gap-1">
                Hello, {userPhone || '09025777951'} 👋
              </h1>
              <p className="text-[10px] text-emerald-200">Welcome back to SMB Global Market</p>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={() => setLang(lang === 'ha' ? 'en' : 'ha')}
              className="px-2 py-0.5 bg-emerald-800 text-[10px] font-bold rounded-lg border border-emerald-700"
            >
              {lang === 'ha' ? '🇳🇬 HA' : '🇬🇧 EN'}
            </button>
            <div className="relative cursor-pointer" onClick={() => onNavigate('customer-service')}>
              <span className="text-lg">🔔</span>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center">3</span>
            </div>
            <div className="relative cursor-pointer" onClick={() => onNavigate('cart')}>
              <span className="text-lg">🛒</span>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[8px] font-black w-3.5 h-3.5 rounded-full flex items-center justify-center">2</span>
            </div>
          </div>
        </div>

        <div className="text-[10px] text-emerald-200 flex items-center space-x-1">
          <span>📍 Delivery Location:</span>
          <span className="font-bold text-white">Kano, Nigeria</span>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <input
            type="text"
            placeholder="Search for products, brands, or categories..."
            className="w-full pl-9 pr-8 py-2 bg-white text-gray-800 text-xs rounded-xl focus:outline-none shadow"
          />
          <span className="absolute left-3 top-2.5 text-gray-400 text-xs">🔍</span>
          <span className="absolute right-3 top-2.5 text-gray-400 text-xs">🎙️</span>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Flash Sale Banner */}
        <div className="bg-emerald-900 text-white p-4 rounded-2xl shadow relative overflow-hidden flex justify-between items-center">
          <div className="space-y-1.5 z-10 max-w-[65%]">
            <span className="bg-yellow-400 text-emerald-950 text-[9px] font-black px-2 py-0.5 rounded-full uppercase">FLASH SALE</span>
            <h2 className="text-xs font-black leading-tight">Big Discounts, Bigger Dreams!</h2>
            <p className="text-[10px] text-emerald-100">Top brands. Best prices. Shop now!</p>
            <div className="flex items-center space-x-1 pt-1 text-[10px]">
              <span className="text-emerald-200">Ends in:</span>
              <span className="bg-red-600 font-mono font-bold px-1.5 py-0.5 rounded">02</span>
              <span>:</span>
              <span className="bg-red-600 font-mono font-bold px-1.5 py-0.5 rounded">45</span>
              <span>:</span>
              <span className="bg-red-600 font-mono font-bold px-1.5 py-0.5 rounded">12</span>
            </div>
          </div>
          <div className="bg-yellow-400 text-emerald-950 font-black rounded-full w-16 h-16 flex flex-col items-center justify-center text-center shadow-lg transform rotate-12">
            <span className="text-[9px]">UP TO</span>
            <span className="text-xs leading-none">70%</span>
            <span className="text-[8px]">OFF</span>
          </div>
        </div>

        {/* Limited Stock Bar */}
        <div className="bg-emerald-50 border border-emerald-100 p-2.5 rounded-xl flex justify-between items-center text-xs">
          <div className="flex items-center space-x-2">
            <span>🔥</span>
            <div>
              <p className="font-bold text-gray-800 text-[11px]">Limited Stock!</p>
              <p className="text-[10px] text-gray-500">Popular items are selling fast. Don't miss out!</p>
            </div>
          </div>
          <span className="bg-emerald-800 text-white text-[9px] font-bold px-2 py-1 rounded-lg">Only 5 left</span>
        </div>

        {/* Shop by Category */}
        <div>
          <div className="flex justify-between items-center mb-2.5">
            <h3 className="text-xs font-extrabold text-gray-800">Shop by Category</h3>
            <button onClick={() => onNavigate('categories')} className="text-[11px] font-bold text-emerald-800">
              See All &gt;
            </button>
          </div>
          <div className="grid grid-cols-4 gap-2.5 text-center">
            {categories.map((cat) => (
              <div
                key={cat.id}
                onClick={() => onNavigate('categories')}
                className="bg-white p-2.5 rounded-2xl border border-gray-100 shadow-sm flex flex-col items-center justify-center cursor-pointer hover:shadow-md transition"
              >
                <div className={`w-10 h-10 ${cat.bg} rounded-xl flex items-center justify-center text-xl mb-1`}>
                  {cat.icon}
                </div>
                <span className="text-[10px] font-bold text-gray-700 leading-tight">{cat.name}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Products */}
        <div>
          <div className="flex justify-between items-center mb-2.5">
            <h3 className="text-xs font-extrabold text-gray-800">Featured Products</h3>
            <button onClick={() => onNavigate('categories')} className="text-[11px] font-bold text-emerald-800">
              See All &gt;
            </button>
          </div>
          <div className="grid grid-cols-2 gap-3">
            {featuredProducts.map((p) => (
              <div
                key={p.id}
                onClick={() => onNavigate('details', p)}
                className="bg-white p-3 rounded-2xl border border-gray-100 shadow-sm cursor-pointer relative"
              >
                <span className="absolute top-2 left-2 bg-red-500 text-white text-[9px] font-black px-1.5 py-0.5 rounded-md z-10">
                  {p.discount}
                </span>
                <div className="bg-gray-50 h-28 rounded-xl flex items-center justify-center text-5xl mb-2">
                  {p.icon}
                </div>
                <h4 className="text-xs font-bold text-gray-800 line-clamp-1">{p.name}</h4>
                <p className="text-xs font-black text-emerald-800 mt-1">{p.price}</p>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-200 px-4 py-2 flex justify-around items-center z-30">
        <button onClick={() => onNavigate('home')} className="flex flex-col items-center text-emerald-800 font-bold">
          <span className="text-lg">🏠</span>
          <span className="text-[10px]">Home</span>
        </button>
        <button onClick={() => onNavigate('categories')} className="flex flex-col items-center text-gray-400 font-medium">
          <span className="text-lg">📁</span>
          <span className="text-[10px]">Categories</span>
        </button>
        <button onClick={() => onNavigate('cart')} className="flex flex-col items-center text-gray-400 font-medium relative">
          <span className="text-lg">🛒</span>
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[8px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">2</span>
          <span className="text-[10px]">Cart</span>
        </button>
        <button onClick={() => onNavigate('orders')} className="flex flex-col items-center text-gray-400 font-medium relative">
          <span className="text-lg">📦</span>
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[8px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">3</span>
          <span className="text-[10px]">Orders</span>
        </button>
        <button onClick={() => onNavigate('account')} className="flex flex-col items-center text-gray-400 font-medium">
          <span className="text-lg">👤</span>
          <span className="text-[10px]">Account</span>
        </button>
      </div>
    </div>
  );
}

export default HomePage;
