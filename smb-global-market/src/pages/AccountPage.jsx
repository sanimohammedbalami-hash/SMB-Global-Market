import React from 'react';

function AccountPage({ onNavigate, lang, setLang, user }) {
  const userName = user && user.name ? user.name : 'Sani Achibu';

  const content = {
    en: {
      accountTitle: 'Account',
      myOrders: 'My Orders',
      wishlist: 'Wishlist',
      editProfile: 'Edit Profile',
      addresses: 'Saved Addresses',
      notifications: 'Notifications',
      help: 'Customer Service',
      logout: 'Log Out'
    },
    ha: {
      accountTitle: 'Asusu',
      myOrders: 'Ododina',
      wishlist: 'Abubuwan Sha\'awa',
      editProfile: 'Sauya Bayanan Kanka',
      addresses: 'Adireshin da ke Ajiye',
      notifications: 'Sanarwa',
      help: 'Masu Taimako (Support)',
      logout: 'Fita daga Asusun'
    }
  };

  const t = content[lang] || content.en;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-emerald-900 text-white p-4 flex justify-between items-center shadow-md">
        <h1 className="text-sm font-bold">{t.accountTitle}</h1>
        <button
          onClick={() => setLang(lang === 'en' ? 'ha' : 'en')}
          className="px-2.5 py-1 bg-emerald-800 text-emerald-100 rounded-lg text-xs font-semibold"
        >
          {lang === 'en' ? '🇳🇬 HA' : '🇬🇧 EN'}
        </button>
      </div>

      <div className="bg-emerald-800 text-white p-6 rounded-b-3xl shadow-md text-center space-y-2">
        <div className="w-16 h-16 bg-white text-emerald-800 font-extrabold text-2xl rounded-full flex items-center justify-center mx-auto border-2 border-emerald-100 shadow">
          {userName.charAt(0)}
        </div>
        <div>
          <h2 className="text-base font-bold">{userName}</h2>
          <p className="text-xs text-emerald-200">saniachibu@gmail.com</p>
        </div>
      </div>

      <div className="p-4 space-y-3">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 divide-y divide-gray-100 overflow-hidden">
          <button onClick={() => onNavigate && onNavigate('orders')} className="w-full p-4 text-left flex justify-between items-center text-xs font-semibold text-gray-700 hover:bg-emerald-50 transition">
            <span className="flex items-center space-x-3"><span>📦</span><span>{t.myOrders}</span></span>
            <span className="text-gray-400">›</span>
          </button>

          <button onClick={() => onNavigate && onNavigate('wishlist')} className="w-full p-4 text-left flex justify-between items-center text-xs font-semibold text-gray-700 hover:bg-emerald-50 transition">
            <span className="flex items-center space-x-3"><span>❤️</span><span>{t.wishlist}</span></span>
            <span className="text-gray-400">›</span>
          </button>

          <button onClick={() => onNavigate && onNavigate('edit_profile')} className="w-full p-4 text-left flex justify-between items-center text-xs font-semibold text-gray-700 hover:bg-emerald-50 transition">
            <span className="flex items-center space-x-3"><span>✏️</span><span>{t.editProfile}</span></span>
            <span className="text-gray-400">›</span>
          </button>

          <button onClick={() => onNavigate && onNavigate('addresses')} className="w-full p-4 text-left flex justify-between items-center text-xs font-semibold text-gray-700 hover:bg-emerald-50 transition">
            <span className="flex items-center space-x-3"><span>📍</span><span>{t.addresses}</span></span>
            <span className="text-gray-400">›</span>
          </button>

          <button onClick={() => onNavigate && onNavigate('notifications')} className="w-full p-4 text-left flex justify-between items-center text-xs font-semibold text-gray-700 hover:bg-emerald-50 transition">
            <span className="flex items-center space-x-3"><span>🔔</span><span>{t.notifications}</span></span>
            <span className="text-gray-400">›</span>
          </button>

          <button onClick={() => onNavigate && onNavigate('customer_service')} className="w-full p-4 text-left flex justify-between items-center text-xs font-semibold text-gray-700 hover:bg-emerald-50 transition">
            <span className="flex items-center space-x-3"><span>🎧</span><span>{t.help}</span></span>
            <span className="text-gray-400">›</span>
          </button>
        </div>

        <button onClick={() => onNavigate && onNavigate('login')} className="w-full py-3 bg-red-50 text-red-600 font-bold text-xs rounded-xl border border-red-100 hover:bg-red-100 transition">
          {t.logout}
        </button>
      </div>
    </div>
  );
}

export default AccountPage;
