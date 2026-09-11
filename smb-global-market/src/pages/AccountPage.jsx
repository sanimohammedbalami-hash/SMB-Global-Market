import React from 'react';

function AccountPage({ onNavigate, lang, setLang, user }) {
  const userName = user && user.name ? user.name : 'Sani Achibu';

  const content = {
    en: {
      title: 'My Profile',
      greeting: `Hello, ${userName}`,
      myOrders: 'My Orders',
      wishlist: 'My Wishlist',
      shippingAddress: 'Shipping Address',
      paymentMethods: 'Payment Methods',
      support: 'Customer Support',
      logout: 'Log Out'
    },
    ha: {
      title: 'Asusun Nawa',
      greeting: `Barka, ${userName}`,
      myOrders: 'Ododina na Baya',
      wishlist: 'Abubuwan Sha\'awa',
      shippingAddress: 'Adireshin Isar da Saƙo',
      paymentMethods: 'Hanyoyin Biya',
      support: 'Taimakon Abokan Ciniki',
      logout: 'Fita daga Asusun'
    }
  };

  const t = content[lang] || content.en;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-emerald-900 text-white p-4 flex justify-between items-center sticky top-0 z-10 shadow-md">
        <h1 className="text-base font-bold">{t.title}</h1>
        <button
          onClick={() => setLang(lang === 'en' ? 'ha' : 'en')}
          className="px-2.5 py-1 bg-emerald-800 text-emerald-100 rounded-lg text-xs font-semibold"
        >
          {lang === 'en' ? '🇳🇬 HA' : '🇬🇧 EN'}
        </button>
      </div>

      <div className="p-4 space-y-4">
        {/* User Card */}
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-center space-x-3">
          <div className="w-12 h-12 bg-emerald-800 text-white rounded-full flex items-center justify-center font-bold text-lg">
            {userName.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="font-bold text-sm text-gray-900">{t.greeting}</h2>
            <p className="text-[11px] text-gray-500">sani@smbglobalmarket.com</p>
          </div>
        </div>

        {/* Menu Options */}
        <div className="bg-white rounded-xl border border-gray-100 shadow-sm divide-y divide-gray-100">
          <div 
            onClick={() => onNavigate && onNavigate('orders')}
            className="p-3.5 flex justify-between items-center cursor-pointer hover:bg-gray-50"
          >
            <div className="flex items-center space-x-3">
              <span className="text-lg">📦</span>
              <span className="text-xs font-bold text-gray-800">{t.myOrders}</span>
            </div>
            <span className="text-gray-400 text-xs">›</span>
          </div>

          <div 
            onClick={() => onNavigate && onNavigate('wishlist')}
            className="p-3.5 flex justify-between items-center cursor-pointer hover:bg-gray-50"
          >
            <div className="flex items-center space-x-3">
              <span className="text-lg">❤️</span>
              <span className="text-xs font-bold text-gray-800">{t.wishlist}</span>
            </div>
            <span className="text-gray-400 text-xs">›</span>
          </div>

          <div className="p-3.5 flex justify-between items-center cursor-pointer hover:bg-gray-50">
            <div className="flex items-center space-x-3">
              <span className="text-lg">📍</span>
              <span className="text-xs font-bold text-gray-800">{t.shippingAddress}</span>
            </div>
            <span className="text-gray-400 text-xs">›</span>
          </div>

          <div className="p-3.5 flex justify-between items-center cursor-pointer hover:bg-gray-50">
            <div className="flex items-center space-x-3">
              <span className="text-lg">💳</span>
              <span className="text-xs font-bold text-gray-800">{t.paymentMethods}</span>
            </div>
            <span className="text-gray-400 text-xs">›</span>
          </div>

          <div className="p-3.5 flex justify-between items-center cursor-pointer hover:bg-gray-50">
            <div className="flex items-center space-x-3">
              <span className="text-lg">🎧</span>
              <span className="text-xs font-bold text-gray-800">{t.support}</span>
            </div>
            <span className="text-gray-400 text-xs">›</span>
          </div>
        </div>

        <button
          onClick={() => onNavigate && onNavigate('login')}
          className="w-full py-3 bg-red-50 text-red-700 text-xs font-bold rounded-xl border border-red-100"
        >
          🚪 {t.logout}
        </button>
      </div>
    </div>
  );
}

export default AccountPage;
