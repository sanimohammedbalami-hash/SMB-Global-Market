import React, { useState } from 'react';

function CheckoutPage({ onNavigate, lang, setLang, user }) {
  const [paymentMethod, setPaymentMethod] = useState('card');
  const userName = user && user.name ? user.name : 'Sani Achibu';

  const content = {
    en: {
      title: 'Checkout & Payment',
      addressTitle: 'Delivery Address',
      methodTitle: 'Payment Method',
      cardPay: 'Card Payment',
      paystackPay: 'Pay with Paystack',
      bankTransfer: 'Bank Transfer',
      ussdPay: 'USSD Code',
      orderSummary: 'Order Summary',
      subtotal: 'Items (3)',
      shipping: 'Shipping',
      total: 'Total',
      payNow: 'Pay Now ₦855,000',
      free: 'Free'
    },
    ha: {
      title: 'Biya da Tabbatarwa',
      addressTitle: 'Adireshin Isar da Saƙo',
      methodTitle: 'Hanyar Biya',
      cardPay: 'Biyan Katin Banki',
      paystackPay: 'Biya ta Paystack',
      bankTransfer: 'Tura ta Banki',
      ussdPay: 'Lambar USSD',
      orderSummary: 'Taqaitaccen Bayani',
      subtotal: 'Kayayyaki (3)',
      shipping: 'Kudin Aikawa',
      total: 'Jimilla',
      payNow: 'Biya Yanzu ₦855,000',
      free: 'Kyauta'
    }
  };

  const t = content[lang] || content.en;

  const handlePayment = () => {
    if (onNavigate) {
      onNavigate('order_success');
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <div className="bg-emerald-900 text-white p-4 flex justify-between items-center sticky top-0 z-10 shadow-md">
        <button
          onClick={() => onNavigate && onNavigate('cart')}
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
        {/* Address Card */}
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm space-y-1">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">{t.addressTitle}</h3>
          <p className="text-xs font-bold text-gray-800">{userName}</p>
          <p className="text-xs text-gray-600">Kano, Nigeria</p>
        </div>

        {/* Payment Methods */}
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm space-y-3">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">{t.methodTitle}</h3>

          <div
            onClick={() => setPaymentMethod('card')}
            className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer ${
              paymentMethod === 'card' ? 'border-emerald-700 bg-emerald-50/50' : 'border-gray-200'
            }`}
          >
            <div className="flex items-center space-x-3">
              <span className="text-lg">💳</span>
              <span className="text-xs font-bold text-gray-800">{t.cardPay}</span>
            </div>
            <input type="radio" checked={paymentMethod === 'card'} readOnly className="accent-emerald-800" />
          </div>

          <div
            onClick={() => setPaymentMethod('paystack')}
            className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer ${
              paymentMethod === 'paystack' ? 'border-emerald-700 bg-emerald-50/50' : 'border-gray-200'
            }`}
          >
            <div className="flex items-center space-x-3">
              <span className="text-lg">🟢</span>
              <span className="text-xs font-bold text-gray-800">{t.paystackPay}</span>
            </div>
            <input type="radio" checked={paymentMethod === 'paystack'} readOnly className="accent-emerald-800" />
          </div>

          <div
            onClick={() => setPaymentMethod('transfer')}
            className={`p-3 rounded-xl border flex items-center justify-between cursor-pointer ${
              paymentMethod === 'transfer' ? 'border-emerald-700 bg-emerald-50/50' : 'border-gray-200'
            }`}
          >
            <div className="flex items-center space-x-3">
              <span className="text-lg">🏦</span>
              <span className="text-xs font-bold text-gray-800">{t.bankTransfer}</span>
            </div>
            <input type="radio" checked={paymentMethod === 'transfer'} readOnly className="accent-emerald-800" />
          </div>
        </div>

        {/* Order Summary */}
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm space-y-2">
          <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider">{t.orderSummary}</h3>
          <div className="flex justify-between text-xs text-gray-600">
            <span>{t.subtotal}</span>
            <span>₦855,000</span>
          </div>
          <div className="flex justify-between text-xs text-gray-600">
            <span>{t.shipping}</span>
            <span className="text-emerald-800 font-bold">{t.free}</span>
          </div>
          <div className="border-t pt-2 flex justify-between text-xs font-bold text-gray-900">
            <span>{t.total}</span>
            <span className="text-emerald-800 text-sm">₦855,000</span>
          </div>
        </div>

        <button
          onClick={handlePayment}
          className="w-full py-3.5 bg-emerald-800 text-white font-bold text-xs rounded-xl shadow-lg hover:bg-emerald-900 transition"
        >
          {t.payNow}
        </button>
      </div>
    </div>
  );
}

export default CheckoutPage;
