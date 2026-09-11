import React from 'react';

function OrderSuccessPage({ onNavigate, lang, setLang }) {
  const content = {
    en: {
      successTitle: 'Order Placed Successfully!',
      successSub: 'Your order #SMB123456 has been placed. You will receive a confirmation email and SMS shortly.',
      viewDetails: 'View Order Details',
      continueShopping: 'Continue Shopping',
      orderSummary: 'Order Summary',
      totalAmount: 'Total Amount'
    },
    ha: {
      successTitle: 'An Sanya Odar Cikin Nasara!',
      successSub: 'Odarka ta #SMB123456 ta sanya. Zaka sami saƙon tabbatarwa ta email da SMS nan ba da jimawa ba.',
      viewDetails: 'Duba Cikakken Bayani',
      continueShopping: 'Ci Gaba da Sayayya',
      orderSummary: 'Taqaitaccen Bayani',
      totalAmount: 'Jimillar Farashi'
    }
  };

  const t = content[lang] || content.en;

  return (
    <div className="min-h-screen bg-gray-50 pb-20 flex flex-col justify-between">
      {/* Top Header */}
      <div className="bg-emerald-900 text-white p-4 flex justify-between items-center shadow-md">
        <h1 className="text-sm font-bold">SMB Global Market</h1>
        <button
          onClick={() => setLang(lang === 'en' ? 'ha' : 'en')}
          className="px-2.5 py-1 bg-emerald-800 text-emerald-100 rounded-lg text-xs font-semibold"
        >
          {lang === 'en' ? '🇳🇬 HA' : '🇬🇧 EN'}
        </button>
      </div>

      {/* Main Content */}
      <div className="p-6 text-center space-y-6 flex-1 flex flex-col justify-center items-center">
        {/* Success Icon */}
        <div className="w-20 h-20 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center text-4xl shadow-inner animate-bounce">
          ✓
        </div>

        <div className="space-y-2 max-w-xs">
          <h2 className="text-base font-extrabold text-gray-900">{t.successTitle}</h2>
          <p className="text-xs text-gray-500 leading-relaxed">{t.successSub}</p>
        </div>

        {/* Buttons */}
        <div className="w-full space-y-2.5 pt-2">
          <button
            onClick={() => onNavigate && onNavigate('orders')}
            className="w-full py-3 bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-md hover:bg-emerald-900 transition"
          >
            {t.viewDetails}
          </button>
          <button
            onClick={() => onNavigate && onNavigate('home')}
            className="w-full py-3 bg-white text-emerald-800 border border-emerald-800 font-bold text-xs rounded-xl hover:bg-emerald-50 transition"
          >
            {t.continueShopping}
          </button>
        </div>

        {/* Order Summary Box */}
        <div className="w-full bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex justify-between items-center text-xs">
          <span className="text-gray-500 font-medium">{t.totalAmount}</span>
          <span className="font-extrabold text-emerald-800 text-sm">₦855,000</span>
        </div>
      </div>
    </div>
  );
}

export default OrderSuccessPage;
