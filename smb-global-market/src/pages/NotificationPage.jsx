import React from 'react';

function NotificationPage({ onNavigate, lang, setLang }) {
  const notifications = [
    {
      id: 1,
      title: 'Order Status Update',
      titleHa: 'Sabuntawa game da Oda',
      desc: 'Your order #SMB123456 has been shipped!',
      descHa: 'An aika odarka mai lamba #SMB123456!',
      time: '2 mins ago',
      icon: '📦'
    },
    {
      id: 2,
      title: 'Special Offer',
      titleHa: 'Kyautar Rangwame',
      desc: 'Get 20% discount on electronic items today.',
      descHa: 'Sami rangwamen 20% akan kayan lantarki a yau.',
      time: '1 hour ago',
      icon: '🎉'
    }
  ];

  const content = {
    en: { title: 'Notifications' },
    ha: { title: 'Sanarwa' }
  };

  const t = content[lang] || content.en;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-emerald-900 text-white p-4 flex justify-between items-center sticky top-0 z-10 shadow-md">
        <button onClick={() => onNavigate && onNavigate('account')} className="text-sm font-bold bg-emerald-800 px-3 py-1 rounded-lg">
          ‹ {lang === 'ha' ? 'Koma' : 'Back'}
        </button>
        <h1 className="text-sm font-bold">{t.title}</h1>
        <button onClick={() => setLang(lang === 'en' ? 'ha' : 'en')} className="px-2.5 py-1 bg-emerald-800 text-emerald-100 rounded-lg text-xs font-semibold">
          {lang === 'en' ? '🇳🇬 HA' : '🇬🇧 EN'}
        </button>
      </div>

      <div className="p-4 space-y-3">
        {notifications.map((item) => (
          <div key={item.id} className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex items-start space-x-3">
            <span className="text-2xl">{item.icon}</span>
            <div className="flex-1">
              <h3 className="text-xs font-bold text-gray-900">{lang === 'ha' ? item.titleHa : item.title}</h3>
              <p className="text-xs text-gray-600 mt-0.5">{lang === 'ha' ? item.descHa : item.desc}</p>
              <span className="text-[10px] text-gray-400 mt-1 block">{item.time}</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default NotificationPage;
