import React from 'react';

function AccountPage({ onNavigate, onBack, onLogout, userPhone, lang }) {
  return (
    <div className="bg-gray-50 min-h-screen pb-24 max-w-md mx-auto">
      {/* Top Header with Back Button */}
      <div className="bg-emerald-900 text-white p-4 rounded-b-2xl shadow-lg flex items-center justify-between">
        <button
          onClick={onBack}
          className="w-8 h-8 bg-emerald-800 rounded-full flex items-center justify-center font-bold text-base hover:bg-emerald-700"
        >
          ←
        </button>
        <h1 className="text-sm font-black tracking-wide">
          {lang === 'ha' ? 'Asusu na (My Account)' : 'My Account'}
        </h1>
        <div className="w-8"></div>
      </div>

      <div className="p-4 space-y-4">
        {/* User Card */}
        <div className="bg-white p-4 rounded-2xl shadow-sm border border-gray-100 flex items-center space-x-3">
          <div className="w-14 h-14 bg-emerald-800 text-white rounded-full flex items-center justify-center text-xl font-extrabold shadow">
            S
          </div>
          <div>
            <h2 className="text-sm font-black text-gray-800">Sani Mohammed</h2>
            <p className="text-xs text-gray-500">{userPhone || '09025777951'}</p>
            <p className="text-[10px] text-gray-400">sani@smbglobal.com</p>
          </div>
        </div>

        {/* Menu Items */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden divide-y divide-gray-100">
          <div
            onClick={() => onNavigate('orders')}
            className="p-3.5 flex justify-between items-center cursor-pointer hover:bg-gray-50 text-xs font-bold text-gray-700"
          >
            <div className="flex items-center space-x-3">
              <span>📦</span>
              <span>{lang === 'ha' ? 'Odarina (My Orders)' : 'My Orders'}</span>
            </div>
            <span className="text-gray-400">&gt;</span>
          </div>

          <div
            onClick={() => onNavigate('address')}
            className="p-3.5 flex justify-between items-center cursor-pointer hover:bg-gray-50 text-xs font-bold text-gray-700"
          >
            <div className="flex items-center space-x-3">
              <span>📍</span>
              <span>{lang === 'ha' ? 'Adireshin Isarwa (Shipping Address)' : 'Shipping Address'}</span>
            </div>
            <span className="text-gray-400">&gt;</span>
          </div>

          <div
            onClick={() => onNavigate('edit-profile')}
            className="p-3.5 flex justify-between items-center cursor-pointer hover:bg-gray-50 text-xs font-bold text-gray-700"
          >
            <div className="flex items-center space-x-3">
              <span>👤</span>
              <span>{lang === 'ha' ? 'Gyara Bayanai (Edit Profile)' : 'Edit Profile'}</span>
            </div>
            <span className="text-gray-400">&gt;</span>
          </div>

          <div
            onClick={() => onNavigate('customer-service')}
            className="p-3.5 flex justify-between items-center cursor-pointer hover:bg-gray-50 text-xs font-bold text-gray-700"
          >
            <div className="flex items-center space-x-3">
              <span>🎧</span>
              <span>{lang === 'ha' ? 'Taimakon Abokan Ciniki' : 'Customer Service'}</span>
            </div>
            <span className="text-gray-400">&gt;</span>
          </div>
        </div>

        {/* Logout Button */}
        <button
          onClick={onLogout}
          className="w-full bg-red-600 text-white font-bold py-3 rounded-2xl text-xs shadow-md hover:bg-red-700 transition"
        >
          {lang === 'ha' ? 'Fita (Logout)' : 'Logout'}
        </button>
      </div>

      {/* Bottom Nav */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-200 px-4 py-2 flex justify-around items-center z-30">
        <button onClick={() => onNavigate('home')} className="flex flex-col items-center text-gray-400 font-medium">
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
        <button onClick={() => onNavigate('account')} className="flex flex-col items-center text-emerald-800 font-bold">
          <span className="text-lg">👤</span>
          <span className="text-[10px]">Account</span>
        </button>
      </div>
    </div>
  );
}

export default AccountPage;
