import React from 'react';

function CustomerServicePage({ onNavigate, lang, setLang }) {
  const content = {
    en: {
      title: 'Customer Service',
      contactTitle: 'Direct Contact',
      whatsapp: 'Chat on WhatsApp',
      emailUs: 'Send Email',
      faqTitle: 'Frequently Asked Questions',
      faqs: [
        { q: 'How long does shipping take?', a: 'Standard delivery takes 2 - 4 working days.' },
        { q: 'How can I return an item?', a: 'You can initiate returns from your Order Details page.' }
      ]
    },
    ha: {
      title: 'Masu Taimako (Customer Service)',
      contactTitle: 'Hanyoyin Tuntuba',
      whatsapp: 'Yi Magana ta WhatsApp',
      emailUs: 'Aiko da Email',
      faqTitle: 'Tambayoyin da Aka Fiye Yi',
      faqs: [
        { q: 'Wanne lokaci kayana zai iso?', a: 'Aikawa da karɓar kaya yana ɗaukar kwanaki 2 zuwa 4.' },
        { q: 'Ta yaya zan maido kaya idan samfurin bai yi ba?', a: 'Zaka iya maido kaya ta shafin Bayanin Oda.' }
      ]
    }
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

      <div className="p-4 space-y-4">
        {/* Contact Options */}
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm space-y-3">
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider">{t.contactTitle}</h2>
          <button
            onClick={() => alert(lang === 'ha' ? 'Ana haɗawa da WhatsApp...' : 'Opening WhatsApp...')}
            className="w-full py-3 bg-emerald-800 text-white font-bold text-xs rounded-xl shadow flex items-center justify-center space-x-2"
          >
            <span>💬</span>
            <span>{t.whatsapp}</span>
          </button>
          <button
            onClick={() => alert('saniachibu@gmail.com')}
            className="w-full py-3 bg-gray-100 text-gray-800 font-bold text-xs rounded-xl border border-gray-200 flex items-center justify-center space-x-2"
          >
            <span>✉️</span>
            <span>{t.emailUs}</span>
          </button>
        </div>

        {/* FAQs */}
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm space-y-3">
          <h2 className="text-xs font-bold text-gray-500 uppercase tracking-wider">{t.faqTitle}</h2>
          <div className="space-y-3 divide-y divide-gray-100">
            {t.faqs.map((faq, idx) => (
              <div key={idx} className="pt-2">
                <h3 className="text-xs font-bold text-gray-900">Q: {faq.q}</h3>
                <p className="text-xs text-gray-600 mt-1">A: {faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default CustomerServicePage;
