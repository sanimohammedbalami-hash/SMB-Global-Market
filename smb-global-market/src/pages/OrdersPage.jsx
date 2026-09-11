import React from 'react';

function OrdersPage({ onNavigate, lang, setLang }) {
  const orders = [
    {
      id: 'SMB123456',
      date: 'May 12, 2025',
      status: 'Processing',
      statusHa: 'Ana Shiryawa',
      statusBg: 'bg-yellow-100 text-yellow-800',
      total: 855000,
      items: [
        { name: 'iPhone 15 128GB', qty: 1, icon: '📱' },
        { name: 'Nike Sneakers', qty: 1, icon: '👟' }
      ]
    },
    {
      id: 'SMB771042',
      date: '28 Aug 2026',
      status: 'Delivered',
      statusHa: 'An Isar da Saƙo',
      statusBg: 'bg-emerald-100 text-emerald-800',
      total: 15000,
      items: [
        { name: 'Wireless Earbuds', qty: 1, icon: '🎧' }
      ]
    }
  ];

  const content = {
    en: {
      title: 'My Orders',
      noOrders: 'No orders found',
      orderId: 'Order ID',
      totalAmount: 'Total Amount',
      viewDetails: 'View Details'
    },
    ha: {
      title: 'Ododina na Baya',
      noOrders: 'Ba a samu wata oda ba tukuna',
      orderId: 'Lambar Oda',
      totalAmount: 'Jimillar Kudin',
      viewDetails: 'Duba Bayani'
    }
  };

  const t = content[lang] || content.en;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Top Bar */}
      <div className="bg-emerald-900 text-white p-4 flex justify-between items-center sticky top-0 z-10 shadow-md">
        <button
          onClick={() => onNavigate && onNavigate('account')}
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

      {/* Orders List */}
      <div className="p-4 space-y-3">
        {orders.map((order) => (
          <div key={order.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm space-y-3">
            <div className="flex justify-between items-center border-b border-gray-100 pb-2">
              <div>
                <span className="text-[10px] text-gray-400 font-medium">{t.orderId}</span>
                <p className="text-xs font-bold text-gray-800">#{order.id}</p>
              </div>
              <span className={`text-[10px] font-bold px-2.5 py-1 rounded-full ${order.statusBg}`}>
                {lang === 'ha' ? order.statusHa : order.status}
              </span>
            </div>

            {/* Items */}
            {order.items.map((item, idx) => (
              <div key={idx} className="flex items-center space-x-3 py-1">
                <div className="w-10 h-10 bg-emerald-50 rounded-lg flex items-center justify-center text-xl">
                  {item.icon}
                </div>
                <div className="flex-1">
                  <h3 className="text-xs font-bold text-gray-800">{item.name}</h3>
                  <p className="text-[10px] text-gray-500">Qty: {item.qty}</p>
                </div>
              </div>
            ))}

            <div className="flex justify-between items-center pt-2 border-t border-gray-100 text-xs">
              <div>
                <span className="text-[10px] text-gray-400">{t.totalAmount}</span>
                <p className="font-extrabold text-emerald-800">₦{order.total.toLocaleString()}</p>
              </div>
              <button
                onClick={() => onNavigate && onNavigate('order_details')}
                className="px-3 py-1.5 bg-emerald-800 text-white rounded-lg text-xs font-bold hover:bg-emerald-900"
              >
                {t.viewDetails}
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default OrdersPage;
