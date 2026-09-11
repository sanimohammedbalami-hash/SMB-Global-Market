import React from 'react';

function Home({ onNavigate, lang, setLang, user }) {
  const userName = user && user.name ? user.name : 'Customer';

  const content = {
    en: {
      greeting: `Hello, ${userName} 👋`,
      subGreeting: 'Welcome back to SMB Global Market',
      delivery: 'Delivery Location',
      searchPlaceholder: 'Search for products, brands, or categories...',
      flashTitle: 'Big Discounts, Bigger Dreams!',
      flashSub: 'Top brands. Best prices. Shop now!',
      flashBadge: '⚡ FLASH SALE',
      endsIn: 'Ends in',
      limitedStock: 'Limited Stock!',
      limitedSub: 'Popular items are selling fast. Don\'t miss out!',
      onlyLeft: 'Only 5 left',
      shopCategory: 'Shop by Category',
      seeAll: 'See All >',
      featured: 'Featured Products',
      addToCart: 'Add to Cart',
      navHome: 'Home',
      navCategories: 'Categories',
      navCart: 'Cart',
      navOrders: 'Orders',
      navAccount: 'Account'
    },
    ha: {
      greeting: `Sannu, ${userName} 👋`,
      subGreeting: 'Barka da sake dawowa SMB Global Market',
      delivery: 'Wurin Isar da Saƙo',
      searchPlaceholder: 'Binciki kayayyaki, alama, ko rukuni...',
      flashTitle: 'Raguwar Farashi Mai Yawa!',
      flashSub: 'Ingantattun samfura akan mafi sauƙin farashi!',
      flashBadge: '⚡ RAGUWAR FARASHI',
      endsIn: 'Rage lokacin',
      limitedStock: 'Kaya Sun Kusa Karewa!',
      limitedSub: 'Kayayyaki suna karewa cikin sauri. Kada a bar ka a baya!',
      onlyLeft: 'Sauran 5 kawai',
      shopCategory: 'Rarrabuwar Kayayyaki',
      seeAll: 'Duba Duka >',
      featured: 'Kayayyakin da Aka Fi Nema',
      addToCart: 'Zuba a Kwando',
      navHome: 'Gida',
      navCategories: 'Rukuni',
      navCart: 'Kwando',
      navOrders: 'Odoji',
      navAccount: 'Asusu'
    }
  };

  const t = content[lang] || content.en;

  const categories = [
    { name: lang === 'ha' ? 'Kayan Sawa' : 'Fashion', icon: '👕', bg: 'bg-emerald-100' },
    { name: lang === 'ha' ? 'Kayan Kyau' : 'Beauty', icon: '💄', bg: 'bg-pink-100' },
    { name: lang === 'ha' ? 'Lantarki' : 'Phones', icon: '📱', bg: 'bg-blue-100' },
    { name: lang === 'ha' ? 'Kayan Gida' : 'Home', icon: '🛋️', bg: 'bg-amber-100' },
    { name: lang === 'ha' ? 'Abinci' : 'Groceries', icon: '🧺', bg: 'bg-red-100' },
    { name: lang === 'ha' ? 'Wasanni' : 'Sports', icon: '⚽', bg: 'bg-purple-100' },
    { name: lang === 'ha' ? 'Motoci' : 'Automotive', icon: '🚗', bg: 'bg-cyan-100' },
    { name: lang === 'ha' ? 'Yara' : 'Baby & Kids', icon: '🧸', bg: 'bg-rose-100' }
  ];

  const products = [
    {
      id: 1,
      name: 'Samsung Galaxy A55',
      desc: '128GB, 8GB RAM',
      price: '₦320,000',
      oldPrice: '₦380,000',
      discount: '-15%',
      rating: '4.8',
      sold: '120 sold',
      img: '📱'
    },
    {
      id: 2,
      name: 'Wireless Earbuds',
      desc: 'Bluetooth 5.3',
      price: '₦15,000',
      oldPrice: '₦18,750',
      discount: '-20%',
      rating: '4.7',
      sold: '235 sold',
      img: '🎧'
    },
    {
      id: 3,
      name: 'Nike Air Force 1',
      desc: 'Men\'s Sneakers',
      price: '₦45,000',
      oldPrice: '₦60,000',
      discount: '-25%',
      rating: '4.9',
      sold: '98 sold',
      img: '👟'
    },
    {
      id: 4,
      name: 'Skincare Set',
      desc: 'Brightening & Glow',
      price: '₦28,000',
      oldPrice: '₦34,000',
      discount: '-18%',
      rating: '4.6',
      sold: '150 sold',
      img: '🧴'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20 relative">
      {/* Top Header */}
      <div className="bg-emerald-900 text-white p-4 rounded-b-2xl shadow-md">
        <div className="flex justify-between items-center mb-3">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-emerald-700 rounded-full flex items-center justify-center font-bold text-lg">
              {userName.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="font-bold text-base leading-tight">{t.greeting}</h1>
              <p className="text-xs text-emerald-200">{t.subGreeting}</p>
            </div>
          </div>

          <div className="flex items-center space-x-3">
            <button
              onClick={() => setLang(lang === 'en' ? 'ha' : 'en')}
              className="px-2.5 py-1 bg-emerald-800 text-emerald-100 rounded-lg text-xs font-semibold hover:bg-emerald-700 transition"
            >
              {lang === 'en' ? '🇳🇬 HA' : '🇬🇧 EN'}
            </button>

            <div className="relative cursor-pointer">
              <span className="text-xl">🔔</span>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                3
              </span>
            </div>

            <div className="relative cursor-pointer">
              <span className="text-xl">🛒</span>
              <span className="absolute -top-1 -right-1 bg-red-500 text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
                2
              </span>
            </div>
          </div>
        </div>

        {/* Location bar */}
        <div className="flex items-center text-xs text-emerald-200 mb-2">
          <span>📍 {t.delivery}: <strong className="text-white">Kano, Nigeria</strong></span>
        </div>

        {/* Search Bar */}
        <div className="relative mt-2">
          <input
            type="text"
            placeholder={t.searchPlaceholder}
            className="w-full py-2.5 pl-9 pr-10 text-xs rounded-xl text-gray-800 bg-white shadow focus:outline-none"
          />
          <span className="absolute left-3 top-2.5 text-gray-400 text-sm">🔍</span>
          <span className="absolute right-3 top-2.5 text-emerald-700 text-sm cursor-pointer">🎙️</span>
        </div>
      </div>

      {/* Content Container */}
      <div className="p-4 space-y-4">
        {/* Compact Banner Hook */}
        <div className="bg-gradient-to-r from-emerald-800 to-teal-900 rounded-2xl p-4 text-white shadow-lg relative overflow-hidden">
          <div className="flex justify-between items-start">
            <div>
              <span className="bg-yellow-400 text-gray-900 text-[10px] font-bold px-2 py-0.5 rounded-md uppercase">
                {t.flashBadge}
              </span>
              <h2 className="text-base font-extrabold mt-1.5 leading-tight">{t.flashTitle}</h2>
              <p className="text-xs text-emerald-200 mt-0.5">{t.flashSub}</p>

              {/* Countdown Timer */}
              <div className="flex items-center space-x-1 mt-3">
                <span className="text-[11px] text-emerald-200">{t.endsIn}:</span>
                <span className="bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded">02</span>
                <span>:</span>
                <span className="bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded">45</span>
                <span>:</span>
                <span className="bg-red-600 text-white text-xs font-bold px-1.5 py-0.5 rounded">12</span>
              </div>
            </div>

            <div className="bg-yellow-400 text-gray-900 font-extrabold rounded-full p-2 text-center text-xs shadow-md">
              UP TO<br /><span className="text-base font-black">70%</span><br />OFF
            </div>
          </div>
        </div>

        {/* Limited Stock Strip */}
        <div className="bg-emerald-50 border border-emerald-200 rounded-xl p-3 flex items-center justify-between shadow-sm">
          <div className="flex items-center space-x-2">
            <span className="text-lg">🔥</span>
            <div>
              <h3 className="text-xs font-bold text-gray-800">{t.limitedStock}</h3>
              <p className="text-[10px] text-gray-500">{t.limitedSub}</p>
            </div>
          </div>
          <span className="bg-emerald-700 text-white text-[10px] font-bold px-2.5 py-1 rounded-full whitespace-nowrap">
            {t.onlyLeft}
          </span>
        </div>

        {/* Categories Section */}
        <div>
          <div className="flex justify-between items-center mb-2.5">
            <h2 className="text-sm font-bold text-gray-800">{t.shopCategory}</h2>
            <button className="text-xs font-semibold text-emerald-700 hover:underline">{t.seeAll}</button>
          </div>

          <div className="grid grid-cols-4 gap-2.5">
            {categories.map((cat, idx) => (
              <div key={idx} className="flex flex-col items-center cursor-pointer">
                <div className={`w-12 h-12 ${cat.bg} rounded-2xl flex items-center justify-center text-xl shadow-sm mb-1`}>
                  {cat.icon}
                </div>
                <span className="text-[11px] font-medium text-gray-700 text-center leading-tight">
                  {cat.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Featured Products */}
        <div>
          <div className="flex justify-between items-center mb-2.5">
            <h2 className="text-sm font-bold text-gray-800">{t.featured}</h2>
            <button className="text-xs font-semibold text-emerald-700 hover:underline">{t.seeAll}</button>
          </div>

          <div className="grid grid-cols-2 gap-3">
            {products.map((p) => (
              <div key={p.id} className="bg-white rounded-xl border border-gray-100 p-2.5 shadow-sm relative flex flex-col justify-between">
                <span className="absolute top-2 left-2 bg-red-500 text-white text-[10px] font-bold px-1.5 py-0.5 rounded">
                  {p.discount}
                </span>

                <div className="h-24 bg-gray-50 rounded-lg flex items-center justify-center text-4xl mb-2">
                  {p.img}
                </div>

                <div>
                  <h3 className="text-xs font-bold text-gray-800 truncate">{p.name}</h3>
                  <p className="text-[10px] text-gray-400 truncate">{p.desc}</p>

                  <div className="flex items-center space-x-1 my-1">
                    <span className="text-yellow-500 text-xs">★</span>
                    <span className="text-[10px] font-bold text-gray-700">{p.rating}</span>
                    <span className="text-[10px] text-gray-400">({p.sold})</span>
                  </div>

                  <div className="flex items-baseline space-x-1 mb-2">
                    <span className="text-xs font-extrabold text-emerald-800">{p.price}</span>
                    <span className="text-[10px] text-gray-400 line-through">{p.oldPrice}</span>
                  </div>
                </div>

                <button
                  onClick={() => alert(`${p.name} added to cart!`)}
                  className="w-full py-1.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-lg transition"
                >
                  + {t.addToCart}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 py-2 px-4 flex justify-around items-center z-50">
        <button className="flex flex-col items-center text-emerald-800">
          <span className="text-lg">🏠</span>
          <span className="text-[10px] font-bold">{t.navHome}</span>
        </button>

        <button className="flex flex-col items-center text-gray-500 hover:text-emerald-800">
          <span className="text-lg">🗂️</span>
          <span className="text-[10px] font-medium">{t.navCategories}</span>
        </button>

        <button className="flex flex-col items-center text-gray-500 hover:text-emerald-800 relative">
          <span className="text-lg">🛒</span>
          <span className="absolute -top-1 right-2 bg-red-500 text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
            2
          </span>
          <span className="text-[10px] font-medium">{t.navCart}</span>
        </button>

        <button className="flex flex-col items-center text-gray-500 hover:text-emerald-800 relative">
          <span className="text-lg">📦</span>
          <span className="absolute -top-1 right-2 bg-red-500 text-white text-[9px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">
            3
          </span>
          <span className="text-[10px] font-medium">{t.navOrders}</span>
        </button>

        <button className="flex flex-col items-center text-gray-500 hover:text-emerald-800">
          <span className="text-lg">👤</span>
          <span className="text-[10px] font-medium">{t.navAccount}</span>
        </button>
      </div>
    </div>
  );
}

export default Home;
