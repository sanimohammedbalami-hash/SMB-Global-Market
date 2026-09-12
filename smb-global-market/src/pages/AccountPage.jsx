import React from 'react';

function AccountPage({ onNavigate, onLogout, lang }) {
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-lg font-bold text-gray-800">{lang === 'ha' ? 'Asusu na' : 'My Account'}</h1>
      <button
        onClick={() => onNavigate && onNavigate('customer-service')}
        className="block w-full text-left p-3 bg-gray-100 rounded-lg text-sm font-semibold"
      >
        🎧 {lang === 'ha' ? 'Taimako & Customer Service' : 'Customer Service'}
      </button>
      <button
        onClick={() => onNavigate && onNavigate('notification')}
        className="block w-full text-left p-3 bg-gray-100 rounded-lg text-sm font-semibold"
      >
        🔔 {lang === 'ha' ? 'Sanarwa' : 'Notifications'}
      </button>
      <button
        onClick={onLogout}
        className="block w-full text-center p-3 bg-red-600 text-white font-bold rounded-lg text-sm mt-6"
      >
        {lang === 'ha' ? 'Fita (Logout)' : 'Logout'}
      </button>
    </div>
  );
}

export default AccountPage;
