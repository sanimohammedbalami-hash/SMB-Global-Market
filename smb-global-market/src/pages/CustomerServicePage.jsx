import React, { useState } from 'react';

function CustomerServicePage({ onNavigate, lang, setLang }) {
  const [activeTab, setActiveTab] = useState('faq');
  const [searchQuery, setSearchQuery] = useState('');

  const content = {
    en: {
      title: 'Help Center',
      searchPlaceholder: 'Search help topics or questions...',
      faqTab: 'FAQs',
      contactTab: 'Contact Us',
      ticketTab: 'Submit Ticket',
      contactTitle: 'Need Direct Assistance?',
      whatsappBtn: 'Chat on WhatsApp',
      emailBtn: 'Send Support Email',
      ticketTitle: 'Send Us a Message',
      subjectLabel: 'Subject',
      messageLabel: 'Message',
      sendBtn: 'Submit Request',
      ticketSuccess: 'Your support ticket has been sent!',
      faqs: [
        { q: 'How long does shipping take?', a: 'Standard delivery takes 2 to 4 working days within Nigeria.' },
        { q: 'How can I return an item?', a: 'Go to My Orders, select the order, and click "Return Item".' },
        { q: 'What payment methods are accepted?', a: 'We accept Bank Transfers, Card Payments, and Pay on Delivery.' },
        { q: 'How do I track my package?', a: 'Use the "Track Order" page in your account menu with your order ID.' }
      ]
    },
    ha: {
      title: 'Cibiyar Taimako (Help Center)',
      searchPlaceholder: 'Bincika tambaya ko sashen taimako...',
      faqTab: 'Tambayoyi (FAQs)',
      contactTab: 'Tuntubemu',
      ticketTab: 'Aika Saƙo',
      contactTitle: 'Kana buƙatar taimakon kai tsaye?',
      whatsappBtn: 'Yi Magana ta WhatsApp',
      emailBtn: 'Aika Email zuwa Taimako',
      ticketTitle: 'Aiko mana da saƙon neman taimako',
      subjectLabel: 'Batun Saƙo (Subject)',
      messageLabel: 'Cikakken Saƙo',
      sendBtn: 'Aika Saƙo',
      ticketSuccess: 'An aika saƙon neman taimakonka cikin nasara!',
      faqs: [
        { q: 'Wanne lokaci kayana zai iso?', a: 'Aikawa da karɓar kaya yana ɗaukar kwanaki 2 zuwa 4 a cikin Najeriya.' },
        { q: 'Ta yaya zan maido kaya idan ban gamsu ba?', a: 'Shiga "Ododina", zaɓi odar, sannan ka latsa "Maido Kaya".' },
        { q: 'Wadanne hanyoyin biyan kuɗi kuke karɓa?', a: 'Muna karɓar Canjin Banki (Transfer), Kati, ko Biyan Kudin Bayan Karɓar Kaya.' },
        { q: 'Ta yaya zan bi diddigin kayana?', a: 'Amfani da shafin "Bi Diddigin Oda" a cikin asusunka tare da lambar odarka.' }
      ]
    }
  };

  const t = content[lang] || content.en;

  const filteredFaqs = t.faqs.filter(
    (item) =>
      item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.a.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleTicketSubmit = (e) => {
    e.preventDefault();
    alert(t.ticketSuccess);
    setActiveTab('faq');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      {/* Top Header */}
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

      {/* Tabs */}
      <div className="bg-white border-b border-gray-200 px-4 py-2 flex justify-around text-xs font-bold text-gray-600">
        <button
          onClick={() => setActiveTab('faq')}
          className={`pb-1 ${activeTab === 'faq' ? 'text-emerald-800 border-b-2 border-emerald-800 font-extrabold' : ''}`}
        >
          {t.faqTab}
        </button>
        <button
          onClick={() => setActiveTab('contact')}
          className={`pb-1 ${activeTab === 'contact' ? 'text-emerald-800 border-b-2 border-emerald-800 font-extrabold' : ''}`}
        >
          {t.contactTab}
        </button>
        <button
          onClick={() => setActiveTab('ticket')}
          className={`pb-1 ${activeTab === 'ticket' ? 'text-emerald-800 border-b-2 border-emerald-800 font-extrabold' : ''}`}
        >
          {t.ticketTab}
        </button>
      </div>

      <div className="p-4 space-y-4">
        {activeTab === 'faq' && (
          <>
            {/* Search Input */}
            <div className="relative">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={t.searchPlaceholder}
                className="w-full p-3 pl-9 bg-white border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-800 shadow-sm"
              />
              <span className="absolute left-3 top-3 text-gray-400 text-xs">🔍</span>
            </div>

            {/* FAQs Accordion/List */}
            <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm space-y-3">
              {filteredFaqs.length === 0 ? (
                <p className="text-center text-xs text-gray-400 py-6">
                  {lang === 'ha' ? 'Babu amsar da ta dace da bincikenka.' : 'No matching help topics found.'}
                </p>
              ) : (
                filteredFaqs.map((faq, idx) => (
                  <div key={idx} className="border-b border-gray-100 pb-3 last:border-b-0 last:pb-0">
                    <h3 className="text-xs font-bold text-gray-900 flex items-start space-x-2">
                      <span className="text-emerald-800">Q:</span>
                      <span>{faq.q}</span>
                    </h3>
                    <p className="text-xs text-gray-600 mt-1 pl-5">
                      {faq.a}
                    </p>
                  </div>
                ))
              )}
            </div>
          </>
        )}

        {activeTab === 'contact' && (
          <div className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm space-y-4">
            <h2 className="text-xs font-bold text-gray-700 uppercase tracking-wider">{t.contactTitle}</h2>
            
            <button
              onClick={() => alert(lang === 'ha' ? 'Ana haɗawa da WhatsApp...' : 'Opening WhatsApp...')}
              className="w-full py-3.5 bg-emerald-800 text-white font-bold text-xs rounded-xl shadow flex items-center justify-center space-x-2 hover:bg-emerald-900 transition"
            >
              <span className="text-base">💬</span>
              <span>{t.whatsappBtn}</span>
            </button>

            <button
              onClick={() => alert('saniachibu@gmail.com')}
              className="w-full py-3.5 bg-gray-100 text-gray-800 font-bold text-xs rounded-xl border border-gray-200 flex items-center justify-center space-x-2 hover:bg-gray-200 transition"
            >
              <span className="text-base">✉️</span>
              <span>{t.emailBtn}</span>
            </button>
          </div>
        )}

        {activeTab === 'ticket' && (
          <form onSubmit={handleTicketSubmit} className="bg-white p-5 rounded-xl border border-gray-100 shadow-sm space-y-4">
            <h2 className="text-xs font-bold text-gray-700 uppercase tracking-wider">{t.ticketTitle}</h2>
            
            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">{t.subjectLabel}</label>
              <input
                type="text"
                required
                className="w-full p-3 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-800"
              />
            </div>

            <div>
              <label className="block text-xs font-bold text-gray-700 mb-1">{t.messageLabel}</label>
              <textarea
                rows="4"
                required
                className="w-full p-3 border border-gray-200 rounded-xl text-xs focus:outline-none focus:ring-2 focus:ring-emerald-800 resize-none"
              />
            </div>

            <button
              type="submit"
              className="w-full py-3.5 bg-emerald-800 text-white font-bold text-xs rounded-xl shadow hover:bg-emerald-900 transition"
            >
              {t.sendBtn}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default CustomerServicePage;
