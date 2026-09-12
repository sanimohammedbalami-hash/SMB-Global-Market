import React, { useState } from 'react';

function NotificationPage({ onNavigate, lang, setLang }) {
  const [filter, setFilter] = useState('all');

  const [notifications, setNotifications] = useState([
    {
      id: 1,
      category: 'orders',
      title: 'Order Status Update',
      titleHa: 'Sabuntawa game da Oda',
      desc: 'Your order #SMB123456 has been shipped and is on its way!',
      descHa: 'An aika odarka mai lamba #SMB123456 kuma tana hanya!',
      time: '2 mins ago',
      icon: '📦',
      isRead: false
    },
    {
      id: 2,
      category: 'promos',
      title: 'Special Weekend Offer',
      titleHa: 'Rangwamen Karshen Sati',
      desc: 'Get 20% discount on all electronics today using code SMB20.',
      descHa: 'Sami rangwamen 20% akan duk kayan lantarki a yau tare da lambar SMB20.',
      time: '1 hour ago',
      icon: '🎉',
      isRead: false
    },
    {
      id: 3,
      category: 'orders',
      title: 'Payment Confirmed',
      titleHa: 'An Tabbatar da Biya',
      desc: 'Payment for order #SMB123450 was successful.',
      descHa: 'Biyan kuɗi na odar #SMB123450 ya kammala cikin nasara.',
      time: '1 day ago',
      icon: '✅',
      isRead: true
    }
  ]);

  const content = {
    en: {
      title: 'Notifications',
      allTab: 'All',
      ordersTab: 'Orders',
      promosTab: 'Promos',
      emptyMsg: 'No notifications found.',
      markAllRead: 'Mark all as read'
    },
    ha: {
      title: 'Sanarwa',
      allTab: 'Duka',
      ordersTab: 'Ododina',
      promosTab: 'Rangwame',
      emptyMsg: 'Babu sabuwar sanarwa.',
      markAllRead: 'Yi alamar an karanta duka'
    }
  };

  const t = content[lang] || content.en;

  const filteredNotifications = notifications.filter((item) => {
    if (filter === 'all') return true;
    return item.category === filter;
  });

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, isRead: true })));
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
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

      <div className="bg-white border-b border-gray-200 px-4 py-2 flex justify-around text-xs font-bold text-gray-600">
        <button
          onClick={() => setFilter('all')}
          className={`pb-1 ${filter === 'all' ? 'text-emerald-800 border-b-2 border-emerald-800 font-extrabold' : ''}`}
        >
          {t.allTab}
        </button>
        <button
          onClick={() => setFilter('orders')}
          className={`pb-1 ${filter === 'orders' ? 'text-emerald-800 border-b-2 border-emerald-800 font-extrabold' : ''}`}
        >
          {t.ordersTab}
        </button>
        <button
          onClick={() => setFilter('promos')}
          className={`pb-1 ${filter === 'promos' ? 'text-emerald-800 border-b-2 border-emerald-800 font-extrabold' : ''}`}
        >
          {t.promosTab}
        </button>
      </div>

      <div className="p-4 pb-0 flex justify-end">
        <button
          onClick={markAllAsRead}
          className="text-[11px] font-bold text-emerald-800 underline"
        >
          {t.markAllRead}
        </button>
      </div>

      <div className="p-4 space-y-3">
        {filteredNotifications.length === 0 ? (
          <div className="text-center py-10 text-gray-400 text-xs">
            {t.emptyMsg}
          </div>
        ) : (
          filteredNotifications.map((item) => (
            <div
              key={item.id}
              className={`p-4 rounded-xl border transition flex items-start space-x-3 ${
                item.isRead ? 'bg-white border-gray-100' : 'bg-emerald-50/50 border-emerald-200 shadow-sm'
              }`}
            >
              <span className="text-2xl">{item.icon}</span>
              <div className="flex-1">
                <div className="flex justify-between items-center">
                  <h3 className="text-xs font-bold text-gray-900">
                    {lang === 'ha' ? item.titleHa : item.title}
                  </h3>
                  {!item.isRead && (
                    <span className="w-2 h-2 bg-emerald-600 rounded-full"></span>
                  )}
                </div>
                <p className="text-xs text-gray-600 mt-0.5">
                  {lang === 'ha' ? item.descHa : item.desc}
                </p>
                <span className="text-[10px] text-gray-400 mt-1 block">{item.time}</span>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default NotificationPage;
