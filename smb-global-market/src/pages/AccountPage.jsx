import React from 'react';

function AccountPage({ onNavigate, onLogout, lang }) {
  return (
    <div className="p-4 bg-gray-50 min-h-screen space-y-4">
      <div className="bg-white p-4 rounded-xl border border-gray-100 flex items-center space-x-3">
        <div className="w-12 h-12 bg-emerald-800 text-white rounded-full flex items-center justify-center font-bold text-lg">
          S
        </div>
        <div>
          <h2 className="text-xs font-black text-gray-800">Sani Mohammed</h2>
          <p className="text-[10px] text-gray-400">sani@smbglobal.com</p>
        </div>
      </div>

      <div className="bg-white rounded-xl border border-gray-100 divide-y text-xs">
        <button onClick={() => onNavigate('orders')} className="w-full text-left p-3.5 font-semibold flex justify-between">
          <span>📦 {lang === 'ha' ? 'Odoɗina' : 'My Orders'}</span>
          <span>›</span>
        </button>
        <button onClick={() => onNavigate('address')} className="w-full text-left p-3.5 font-semibold flex justify-between">
          <span>📍 {lang === 'ha' ? 'Adireshin Isarwa' : 'Shipping Address'}</span>
          <span>›</span>
        </button>
        <button onClick={() => onNavigate('edit-profile')} className="w-full text-left p-3.5 font-semibold flex justify-between">
          <span>👤 {lang === 'ha' ? 'Gyara Profile' : 'Edit Profile'}</span>
          <span>›</span>
        </button>
        <button onClick={() => onNavigate('customer-service')} className="w-full text-left p-3.5 font-semibold flex justify-between">
          <span>🎧 {lang === 'ha' ? 'Taimako & Customer Service' : 'Customer Service'}</span>
          <span>›</span>
        </button>
      </div>

      <button onClick={onLogout} className="w-full bg-red-600 text-white font-bold py-3 rounded-xl text-xs">
        {lang === 'ha' ? 'Fita (Logout)' : 'Logout'}
      </button>
    </div>
  );
}

export default AccountPage;
