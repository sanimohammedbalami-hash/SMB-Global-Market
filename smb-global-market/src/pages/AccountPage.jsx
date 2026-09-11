import React from 'react';

function AccountPage({ onNavigate, lang, setLang, user }) {
  const userName = user && user.name ? user.name : 'Customer';

  const menuItems = [
    { icon: '📦', title: lang === 'ha' ? 'Odojina' : 'My Orders', action: () => alert('Orders Clicked') },
    { icon: '📍', title: lang === 'ha' ? 'Adireshin Isar da Saƙo' : 'Shipping Address', action: () => alert('Address Clicked') },
    { icon: '💳', title: lang === 'ha' ? 'Hanyoyin Biya' : 'Payment Methods', action: () => alert('Payments Clicked') },
    { icon: '🔔', title: lang === 'ha' ? 'Sanarwa' : 'Notifications', action: () => alert('Notifications Clicked') },
    { icon: '⚙️', title: lang === 'ha' ? 'Saituna' : 'Settings', action: () => alert('Settings Clicked') },
    { icon: '🎧', title: lang === 'ha' ? 'Taimako da Tallafi' : 'Help & Support', action: () => alert('Support Clicked') }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-emerald-900 text-white p-6 rounded-b-2xl shadow-md text-center">
        <div className="w-16 h-16 bg-emerald-700 mx-auto rounded-full flex items-center justify-center font-bold text-2xl border-2 border-white mb-2">
          {userName.charAt(0).toUpperCase()}
        </div>
        <h1 className="font-bold text-lg">{userName}</h1>
        <p className="text-xs text-emerald-200">{lang === 'ha' ? 'Abokin Ciniki' : 'Valued Customer'}</p>
      </div>

      <div className="p-4 space-y-2">
        {menuItems.map((item, idx) => (
          <div
            key={idx}
            onClick={item.action}
            className="bg-white p-3.5 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between cursor-pointer hover:bg-gray-50"
          >
            <div className="flex items-center space-x-3">
              <span className="text-xl">{item.icon}</span>
              <span className="text-xs font-bold text-gray-800">{item.title}</span>
            </div>
            <span className="text-gray-400 text-sm">›</span>
          </div>
        ))}

        <button
          onClick={() => onNavigate && onNavigate('login')}
          className="w-full mt-4 py-3 bg-red-50 text-red-600 font-bold rounded-xl text-xs border border-red-200"
        >
          {lang === 'ha' ? 'Fita daga Asusun' : 'Log Out'}
        </button>
      </div>
    </div>
  );
}

export default AccountPage;
