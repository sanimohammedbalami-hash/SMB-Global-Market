import React, { useState } from 'react';

function CheckoutPage({ onNavigate, lang, setLang, user }) {
  const userName = user && user.name ? user.name : 'Customer';
  const [paymentMethod, setPaymentMethod] = useState('transfer');
  const [address, setAddress] = useState({
    fullName: userName,
    phone: '',
    city: 'Kano',
    streetAddress: ''
  });

  const content = {
    en: {
      title: 'Checkout',
      shippingTitle: 'Shipping Address',
      fullName: 'Full Name',
      phone: 'Phone Number',
      city: 'City / State',
      street: 'Street Address',
      paymentTitle: 'Payment Method',
      transfer: 'Bank Transfer',
      card: 'Debit / Credit Card',
      cod: 'Pay on Delivery',
      orderSummary: 'Order Summary',
      subtotal: 'Subtotal',
      delivery: 'Delivery Fee',
      total: 'Total',
      placeOrder: 'Place Order via WhatsApp'
    },
    ha: {
      title: 'Kammala Biya',
      shippingTitle: 'Adireshin Isar da Saƙo',
      fullName: 'Cikakken Suna',
      phone: 'Lambar Waya',
      city: 'Bayanin Garin',
      street: 'Adireshin Gida ko Kanti',
      paymentTitle: 'Hanyar Biya',
      transfer: 'Turawar Banki (Transfer)',
      card: 'Katin Banki (ATM Card)',
      cod: 'Biya Yayin Karɓar Kaya',
      orderSummary: 'Bayanin Odarku',
      subtotal: 'Jimillar Kaya',
      delivery: 'Kudin Isarwa',
      total: 'Cikakken Kudin',
      placeOrder: 'Tura Odar ta WhatsApp'
    }
  };

  const t = content[lang] || content.en;

  const handleOrder = (e) => {
    e.preventDefault();
    const message = `Hello SMB Global Market! I want to place an order:%0A- Name: ${address.fullName}%0A- Phone: ${address.phone}%0A- Location: ${address.streetAddress}, ${address.city}%0A- Payment Method: ${paymentMethod}%0A- Total Amount: ₦337,000`;
    window.open(`https://wa.me/?text=${message}`, '_blank');
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
        <h1 className="text-lg font-bold">{t.title}</h1>
        <button
          onClick={() => setLang(lang === 'en' ? 'ha' : 'en')}
          className="px-2.5 py-1 bg-emerald-800 text-emerald-100 rounded-lg text-xs font-semibold"
        >
          {lang === 'en' ? '🇳🇬 HA' : '🇬🇧 EN'}
        </button>
      </div>

      <form onSubmit={handleOrder} className="p-4 space-y-4">
        {/* Shipping Address */}
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm space-y-3">
          <h2 className="text-xs font-bold text-gray-800 uppercase tracking-wider">{t.shippingTitle}</h2>
          
          <div>
            <label className="block text-[11px] font-medium text-gray-600 mb-1">{t.fullName}</label>
            <input
              type="text"
              required
              value={address.fullName}
              onChange={(e) => setAddress({ ...address, fullName: e.target.value })}
              className="w-full p-2.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-gray-600 mb-1">{t.phone}</label>
            <input
              type="tel"
              required
              placeholder="08012345678"
              value={address.phone}
              onChange={(e) => setAddress({ ...address, phone: e.target.value })}
              className="w-full p-2.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-gray-600 mb-1">{t.city}</label>
            <input
              type="text"
              required
              value={address.city}
              onChange={(e) => setAddress({ ...address, city: e.target.value })}
              className="w-full p-2.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700"
            />
          </div>

          <div>
            <label className="block text-[11px] font-medium text-gray-600 mb-1">{t.street}</label>
            <input
              type="text"
              required
              placeholder="e.g. No. 12 Sabon Gari Road"
              value={address.streetAddress}
              onChange={(e) => setAddress({ ...address, streetAddress: e.target.value })}
              className="w-full p-2.5 text-xs border border-gray-300 rounded-lg focus:outline-none focus:ring-1 focus:ring-emerald-700"
            />
          </div>
        </div>

        {/* Payment Methods */}
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm space-y-2">
          <h2 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-2">{t.paymentTitle}</h2>
          
          <label className={`flex items-center justify-between p-3 border rounded-xl cursor-pointer ${paymentMethod === 'transfer' ? 'border-emerald-700 bg-emerald-50' : 'border-gray-200'}`}>
            <div className="flex items-center space-x-3">
              <span className="text-lg">🏦</span>
              <span className="text-xs font-bold text-gray-800">{t.transfer}</span>
            </div>
            <input
              type="radio"
              name="payment"
              checked={paymentMethod === 'transfer'}
              onChange={() => setPaymentMethod('transfer')}
              className="accent-emerald-700"
            />
          </label>

          <label className={`flex items-center justify-between p-3 border rounded-xl cursor-pointer ${paymentMethod === 'card' ? 'border-emerald-700 bg-emerald-50' : 'border-gray-200'}`}>
            <div className="flex items-center space-x-3">
              <span className="text-lg">💳</span>
              <span className="text-xs font-bold text-gray-800">{t.card}</span>
            </div>
            <input
              type="radio"
              name="payment"
              checked={paymentMethod === 'card'}
              onChange={() => setPaymentMethod('card')}
              className="accent-emerald-700"
            />
          </label>

          <label className={`flex items-center justify-between p-3 border rounded-xl cursor-pointer ${paymentMethod === 'cod' ? 'border-emerald-700 bg-emerald-50' : 'border-gray-200'}`}>
            <div className="flex items-center space-x-3">
              <span className="text-lg">💵</span>
              <span className="text-xs font-bold text-gray-800">{t.cod}</span>
            </div>
            <input
              type="radio"
              name="payment"
              checked={paymentMethod === 'cod'}
              onChange={() => setPaymentMethod('cod')}
              className="accent-emerald-700"
            />
          </label>
        </div>

        {/* Summary */}
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm space-y-2">
          <h2 className="text-xs font-bold text-gray-800 uppercase tracking-wider mb-1">{t.orderSummary}</h2>
          <div className="flex justify-between text-xs text-gray-600">
            <span>{t.subtotal}</span>
            <span>₦335,000</span>
          </div>
          <div className="flex justify-between text-xs text-gray-600">
            <span>{t.delivery}</span>
            <span>₦2,000</span>
          </div>
          <hr />
          <div className="flex justify-between text-sm font-bold text-gray-900">
            <span>{t.total}</span>
            <span className="text-emerald-800">₦337,000</span>
          </div>
        </div>

        <button
          type="submit"
          className="w-full py-3.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-bold rounded-xl shadow-lg transition"
        >
          📲 {t.placeOrder}
        </button>
      </form>
    </div>
  );
}

export default CheckoutPage;
