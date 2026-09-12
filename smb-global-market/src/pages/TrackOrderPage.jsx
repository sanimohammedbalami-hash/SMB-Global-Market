import React from 'react';

function TrackOrderPage({ onNavigate, lang }) {
  return (
    <div className="p-4 bg-gray-50 min-h-screen">
      <button onClick={() => onNavigate('orders')} className="text-emerald-800 text-xs font-bold mb-4">
        ‹ {lang === 'ha' ? 'Koma Ododi' : 'Back to Orders'}
      </button>
      <h1 className="text-base font-extrabold text-gray-800 mb-4">{lang === 'ha' ? 'Matsayin Oda #SMB9982' : 'Track Order #SMB9982'}</h1>

      <div className="bg-white p-5 rounded-xl border border-gray-100 space-y-6 shadow-sm">
        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-emerald-800 rounded-full"></div>
          <div>
            <h4 className="text-xs font-bold text-gray-800">{lang === 'ha' ? 'An Tabbatar da Oda' : 'Order Confirmed'}</h4>
            <span className="text-[10px] text-gray-400">10:30 AM</span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-emerald-800 rounded-full"></div>
          <div>
            <h4 className="text-xs font-bold text-gray-800">{lang === 'ha' ? 'An Hada Kaya' : 'Package Packed'}</h4>
            <span className="text-[10px] text-gray-400">01:15 PM</span>
          </div>
        </div>

        <div className="flex items-center space-x-3">
          <div className="w-3 h-3 bg-emerald-400 rounded-full animate-pulse"></div>
          <div>
            <h4 className="text-xs font-bold text-emerald-800">{lang === 'ha' ? 'Kaya na Hanyar Isowa' : 'Out for Delivery'}</h4>
            <span className="text-[10px] text-emerald-600 font-semibold">{lang === 'ha' ? 'Yanzu haka' : 'In Progress'}</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TrackOrderPage;
