import React from 'react';

function OrderDetailsPage({ onNavigate, lang, setLang }) {
  const content = {
    en: {
      title: 'Order Details',
      orderNo: 'Order #SMB123456',
      date: 'May 12, 2025 • 3 Items',
      status: 'Processing',
      statusMsg: "We're preparing your order.",
      track: 'Track Order',
      itemsTitle: 'Items Ordered',
      summaryTitle: 'Payment Summary',
      subtotal: 'Subtotal',
      shipping: 'Shipping',
      total: 'Total Amount'
    },
    ha: {
      title: 'Bayanin Oda',
      orderNo: 'Lambar Oda #SMB123456',
      date: '12 May, 2025 • Kaya 3',
      status: 'Ana Shiryawa',
      statusMsg: 'Muna tsara kayanku don aikawa.',
      track: 'Binciki Inda Kayan Yake',
      itemsTitle: 'Kayayyakin da Aka Oda',
      summaryTitle: 'Taqaitaccen Biya',
      subtotal: 'Cikakken Farashi',
      shipping: 'Kudin Aikawa',
      total: 'Jimillar Kudi'
    }
  };

  const t = content[lang] || content.en;

  const items = [
    { name: 'iPhone 15 128GB', price: 650000, qty: 1, icon: '📱' },
    { name: 'Nike Sneakers', price: 120000, qty: 1, icon: '👟' },
    { name: 'Backpack', price: 45000, qty: 1, icon: '🎒' }
  ];

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Top Header */}
      <div className="bg-emerald-900 text-white p-4 flex justify-between items-center sticky top-0 z-10 shadow-md">
        <button
          onClick={() => onNavigate && onNavigate('orders')}
          className="text-sm font-bold bg-emerald-800 px-3 py-1 rounded-lg"
        >
          ‹ {lang === 'ha' ? 'Koma' : 'Back'}
        </button>
        <h1 className="text-sm font-bold">{t.title}</h1>
        <button
          onClick={() => setLang(lang === 'en' ? 'ha' : 'en')}
          className="px-2.5 py-1 bg-emerald-800 text-emerald-100 rounded-lg text-xs font-semibold"
        >
          {lang === 'en' ? '🇳🇬 HA' : '🇬🇧 EN'}
        </button>
      </div>

      <div className="p-4 space-y-4">
        {/* Order Info Card */}
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm space-y-3">
          <div className="flex justify-between items-start">
            <div>
              <h2 className="text-sm font-extrabold text-gray-900">{t.orderNo}</h2>
              <p className="text-[11px] text-gray-400 mt-0.5">{t.date}</p>
            </div>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2.5 py-1 rounded-full">
              {t.status}
            </span>
          </div>
          <p className="text-xs text-emerald-800 bg-emerald-50 p-2.5 rounded-lg border border-emerald-100 font-medium">
            💡 {t.statusMsg}
          </p>
          <button
            onClick={() => onNavigate && onNavigate('track_order')}
            className="w-full py-2.5 bg-emerald-800 text-white text-xs font-bold rounded-xl shadow hover:bg-emerald-900 transition"
          >
            📍 {t.track}
          </button>
        </div>

        {/* Items List */}
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm space-y-3">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">{t.itemsTitle}</h3>
          <div className="divide-y divide-gray-100">
            {items.map((item, idx) => (
              <div key={idx} className="py-2.5 flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className="w-10 h-10 bg-gray-50 rounded-lg flex items-center justify-center text-xl">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-xs font-bold text-gray-800">{item.name}</h4>
                    <p className="text-[10px] text-gray-400">Qty: {item.qty}</p>
                  </div>
                </div>
                <span className="text-xs font-bold text-emerald-800">₦{item.price.toLocaleString()}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Payment Summary */}
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm space-y-2 text-xs">
          <h3 className="font-bold text-gray-500 uppercase tracking-wider mb-2">{t.summaryTitle}</h3>
          <div className="flex justify-between text-gray-600">
            <span>{t.subtotal}</span>
            <span>₦815,000</span>
          </div>
          <div className="flex justify-between text-gray-600">
            <span>{t.shipping}</span>
            <span>₦40,000</span>
          </div>
          <div className="border-t pt-2 flex justify-between font-extrabold text-gray-900 text-sm">
            <span>{t.total}</span>
            <span className="text-emerald-800">₦855,000</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default OrderDetailsPage;
