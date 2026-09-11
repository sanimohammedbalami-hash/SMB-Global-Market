import React, { useState } from 'react';

function WishlistPage({ onNavigate, lang, setLang }) {
  const [wishlistItems, setWishlistItems] = useState([
    { id: 1, name: 'iPhone 15 128GB', price: 650000, rating: 4.8, icon: '📱' },
    { id: 2, name: 'Nike Sneakers', price: 120000, rating: 4.7, icon: '👟' },
    { id: 3, name: 'Smart Watch', price: 85000, rating: 4.6, icon: '⌚' },
    { id: 4, name: 'Backpack', price: 45000, rating: 4.5, icon: '🎒' },
    { id: 5, name: 'Wireless Earbuds', price: 35000, rating: 4.4, icon: '🎧' }
  ]);

  const removeItem = (id) => {
    setWishlistItems(wishlistItems.filter(item => item.id !== id));
  };

  const content = {
    en: {
      title: 'My Wishlist',
      empty: 'Your wishlist is empty',
      addToCart: 'Add to Cart',
      remove: 'Remove'
    },
    ha: {
      title: 'Abubuwan Sha\'awa',
      empty: 'Babu komai a jerin sha\'awarka',
      addToCart: 'Zuba a Kwando',
      remove: 'Cire'
    }
  };

  const t = content[lang] || content.en;

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

      {/* Wishlist Items List */}
      <div className="p-4 space-y-3">
        {wishlistItems.length === 0 ? (
          <div className="text-center py-16 text-gray-400 text-xs">
            {t.empty}
          </div>
        ) : (
          wishlistItems.map((item) => (
            <div key={item.id} className="bg-white p-3 rounded-xl border border-gray-100 shadow-sm flex items-center justify-between">
              <div className="flex items-center space-x-3">
                <div className="w-14 h-14 bg-gray-50 rounded-lg flex items-center justify-center text-3xl">
                  {item.icon}
                </div>
                <div>
                  <h3 className="text-xs font-bold text-gray-800">{item.name}</h3>
                  <p className="text-emerald-800 font-extrabold text-xs mt-0.5">₦{item.price.toLocaleString()}</p>
                  <p className="text-[10px] text-yellow-500 mt-0.5">★ {item.rating}</p>
                </div>
              </div>

              <div className="flex flex-col space-y-1 items-end">
                <button
                  onClick={() => onNavigate && onNavigate('cart')}
                  className="px-2.5 py-1 bg-emerald-800 text-white rounded-lg text-[10px] font-bold"
                >
                  🛒 {t.addToCart}
                </button>
                <button
                  onClick={() => removeItem(item.id)}
                  className="text-[10px] text-red-500 font-medium hover:underline"
                >
                  {t.remove}
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

export default WishlistPage;
