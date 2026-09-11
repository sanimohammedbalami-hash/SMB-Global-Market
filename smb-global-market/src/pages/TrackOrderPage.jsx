import React from 'react';

function TrackOrderPage({ onNavigate, lang, setLang }) {
  const content = {
    en: {
      title: 'Track Order',
      orderId: 'Order #SMB123456',
      estimatedDelivery: 'Estimated Delivery: May 15, 2025',
      steps: [
        { title: 'Order Placed', desc: 'May 12, 10:30 AM', completed: true },
        { title: 'Order Processed', desc: 'May 12, 02:15 PM', completed: true },
        { title: 'Shipped', desc: 'May 13, 09:00 AM', completed: true },
        { title: 'Out for Delivery', desc: 'Pending', completed: false },
        { title: 'Delivered', desc: 'Pending', completed: false }
      ],
      needHelp: 'Need Help?',
      contactSupport: 'Contact Support'
    },
    ha: {
      title: 'Binciki Inda Kayan Yake',
      orderId: 'Lambar Oda #SMB123456',
      estimatedDelivery: 'Kiyasin Isarwa: May 15, 2025',
      steps: [
        { title: 'An Sanya Oda', desc: 'May 12, 10:30 AM', completed: true },
        { title: 'An Sarrafa Oda', desc: 'May 12, 02:15 PM', completed: true },
        { title: 'An Aika Kayan', desc: 'May 13, 09:00 AM', completed: true },
        { title: 'Yana Hanyar Isarwa', desc: 'Ana jiran lokaci', completed: false },
        { title: 'An Isar da Saƙo', desc: 'Ana jiran lokaci', completed: false }
      ],
      needHelp: 'Kuna Buƙatar Ƙarin Bayani?',
      contactSupport: 'Tuntubi Taimako'
    }
  };

  const t = content[lang] || content.en;

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Top Header */}
      <div className="bg-emerald-900 text-white p-4 flex justify-between items-center sticky top-0 z-10 shadow-md">
        <button
          onClick={() => onNavigate && onNavigate('order_details')}
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
        {/* Status Overview Card */}
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm text-center space-y-1">
          <h2 className="text-sm font-extrabold text-gray-900">{t.orderId}</h2>
          <p className="text-xs text-emerald-800 font-bold">{t.estimatedDelivery}</p>
        </div>

        {/* Timeline Tracking */}
        <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm">
          <div className="relative border-l-2 border-emerald-800 ml-4 space-y-6">
            {t.steps.map((step, idx) => (
              <div key={idx} className="relative pl-6">
                <div
                  className={`absolute -left-[9px] top-0 w-4 h-4 rounded-full border-2 ${
                    step.completed
                      ? 'bg-emerald-800 border-emerald-800'
                      : 'bg-white border-gray-300'
                  }`}
                />
                <div>
                  <h3 className={`text-xs font-bold ${step.completed ? 'text-gray-900' : 'text-gray-400'}`}>
                    {step.title}
                  </h3>
                  <p className="text-[10px] text-gray-400">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Support Section */}
        <div className="bg-emerald-50 p-4 rounded-xl border border-emerald-100 flex items-center justify-between">
          <div>
            <h4 className="text-xs font-bold text-emerald-900">{t.needHelp}</h4>
            <p className="text-[10px] text-emerald-700">Akwai masu taimako awanni 24/7</p>
          </div>
          <button
            onClick={() => alert(lang === 'ha' ? 'Sada zumunci ta WhatsApp!' : 'Connecting to WhatsApp support!')}
            className="px-3 py-1.5 bg-emerald-800 text-white rounded-lg text-xs font-bold shadow hover:bg-emerald-900"
          >
            {t.contactSupport}
          </button>
        </div>
      </div>
    </div>
  );
}

export default TrackOrderPage;
