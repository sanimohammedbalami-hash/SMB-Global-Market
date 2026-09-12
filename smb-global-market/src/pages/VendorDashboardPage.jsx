import React from 'react';

function VendorDashboardPage({ onNavigate, lang }) {
  return (
    <div className="bg-gray-50 min-h-screen max-w-md mx-auto pb-20">
      {/* Top Header */}
      <div className="bg-emerald-800 text-white p-4 flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <span className="text-xl">🛒</span>
          <span className="font-bold text-sm">SMB GLOBAL MARKET</span>
        </div>
        <div className="flex items-center space-x-3">
          <span className="text-sm">🔔</span>
          <button onClick={() => onNavigate('home')} className="text-xs bg-emerald-700 px-2 py-1 rounded">
            {lang === 'ha' ? 'Fita' : 'Logout'}
          </button>
        </div>
      </div>

      <div className="p-4 space-y-4">
        {/* Store Card Header */}
        <div className="bg-white p-4 rounded-xl shadow-sm border border-gray-200 flex justify-between items-center">
          <div>
            <h3 className="font-bold text-sm text-gray-800">Ahmed Fashion Store</h3>
            <span className="inline-block bg-yellow-100 text-yellow-800 text-[10px] px-2 py-0.5 rounded-full font-bold mt-1">
              {lang === 'ha' ? 'Ana Jiran Amincewa' : 'Pending Approval'}
            </span>
            <p className="text-[10px] text-gray-400 mt-1">Store ID: SMBV12345</p>
          </div>
          <button className="text-gray-400 font-bold">›</button>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-3 gap-2 text-center">
          <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-200">
            <p className="text-[10px] text-gray-500">{lang === 'ha' ? 'Jimillar Kayayyaki' : 'Products'}</p>
            <p className="font-black text-base text-gray-800 mt-1">12</p>
          </div>
          <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-200">
            <p className="text-[10px] text-gray-500">{lang === 'ha' ? 'Masu Aiki' : 'Active'}</p>
            <p className="font-black text-base text-emerald-600 mt-1">10</p>
          </div>
          <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-200">
            <p className="text-[10px] text-gray-500">{lang === 'ha' ? 'Odah' : 'Orders'}</p>
            <p className="font-black text-base text-gray-800 mt-1">8</p>
          </div>
        </div>

        {/* Pending Review Notice */}
        <div className="bg-emerald-50 border border-emerald-200 p-3 rounded-xl flex items-start space-x-3">
          <span className="text-emerald-800 text-lg">🛡️</span>
          <div className="flex-1">
            <h4 className="text-xs font-bold text-emerald-900">
              {lang === 'ha' ? 'Ana Duba Shagonka' : 'Under Review'}
            </h4>
            <p className="text-[10px] text-emerald-700 mt-0.5">
              {lang === 'ha' ? 'Za a sanar da kai da zaran an amince.' : 'You will be notified once approved.'}
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-200 flex justify-around py-2">
        <button onClick={() => onNavigate('vendor-dashboard')} className="flex flex-col items-center text-emerald-800">
          <span className="text-base">📊</span>
          <span className="text-[10px] font-bold">Dashboard</span>
        </button>
        <button onClick={() => onNavigate('home')} className="flex flex-col items-center text-gray-400">
          <span className="text-base">🏠</span>
          <span className="text-[10px]">Back to Home</span>
        </button>
      </div>
    </div>
  );
}

export default VendorDashboardPage;
