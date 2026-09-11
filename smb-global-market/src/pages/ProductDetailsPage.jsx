import React, { useState } from 'react';

function ProductDetailsPage({ onNavigate, lang, setLang, product }) {
  const [selectedColor, setSelectedColor] = useState('Black');
  const [quantity, setQuantity] = useState(1);

  // Default product details if none provided
  const currentProduct = product || {
    id: 1,
    name: 'Samsung Galaxy A55 5G',
    price: 320000,
    oldPrice: 380000,
    rating: 4.8,
    reviews: 124,
    inStock: true,
    icon: '📱',
    description: lang === 'ha' 
      ? 'Kyakkyawar wayar hannu mai gudun 5G, ram 8GB da wajen ajiya 256GB. Tana da kyakkyawar kamara da baturi mai dorewa.'
      : 'High-performance 5G smartphone with 8GB RAM and 256GB storage. Features a crystal-clear camera and long-lasting battery.',
    colors: ['Black', 'Navy', 'Awesome Lilac']
  };

  const handleAddToCart = () => {
    alert(lang === 'ha' ? `An ƙara ${currentProduct.name} a kwandonku!` : `Added ${currentProduct.name} to cart!`);
    if (onNavigate) onNavigate('cart');
  };

  const handleBuyNow = () => {
    if (onNavigate) onNavigate('checkout');
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-24">
      {/* Top Bar */}
      <div className="bg-emerald-900 text-white p-4 flex justify-between items-center sticky top-0 z-10 shadow-md">
        <button
          onClick={() => onNavigate && onNavigate('home')}
          className="text-sm font-bold bg-emerald-800 px-3 py-1 rounded-lg"
        >
          ‹ {lang === 'ha' ? 'Koma' : 'Back'}
        </button>
        <h1 className="text-sm font-bold truncate max-w-[200px]">{currentProduct.name}</h1>
        <button
          onClick={() => setLang(lang === 'en' ? 'ha' : 'en')}
          className="px-2.5 py-1 bg-emerald-800 text-emerald-100 rounded-lg text-xs font-semibold"
        >
          {lang === 'en' ? '🇳🇬 HA' : '🇬🇧 EN'}
        </button>
      </div>

      {/* Product Image Banner */}
      <div className="bg-white p-8 flex justify-center items-center border-b border-gray-100">
        <div className="w-40 h-40 bg-emerald-50 rounded-2xl flex items-center justify-center text-7xl shadow-inner">
          {currentProduct.icon}
        </div>
      </div>

      {/* Product Details Content */}
      <div className="p-4 space-y-4">
        {/* Title and Rating */}
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm space-y-2">
          <div className="flex justify-between items-start">
            <h2 className="text-base font-bold text-gray-900">{currentProduct.name}</h2>
            <span className="bg-emerald-100 text-emerald-800 text-[10px] font-bold px-2 py-0.5 rounded-full">
              {currentProduct.inStock ? (lang === 'ha' ? 'Akwai shi' : 'In Stock') : 'Out of Stock'}
            </span>
          </div>

          <div className="flex items-center space-x-2 text-xs">
            <span className="text-yellow-500 font-bold">★ {currentProduct.rating}</span>
            <span className="text-gray-400">({currentProduct.reviews} {lang === 'ha' ? 'Bincike' : 'Reviews'})</span>
          </div>

          <div className="flex items-baseline space-x-2 mt-2">
            <span className="text-xl font-extrabold text-emerald-800">
              ₦{currentProduct.price.toLocaleString()}
            </span>
            {currentProduct.oldPrice && (
              <span className="text-xs text-gray-400 line-through">
                ₦{currentProduct.oldPrice.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        {/* Color Selection */}
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm space-y-2">
          <h3 className="text-xs font-bold text-gray-700">{lang === 'ha' ? 'Zaɓi Launi (Color)' : 'Select Color'}</h3>
          <div className="flex space-x-2">
            {currentProduct.colors.map((color) => (
              <button
                key={color}
                onClick={() => setSelectedColor(color)}
                className={`px-3 py-1.5 rounded-lg text-xs font-semibold border transition ${
                  selectedColor === color
                    ? 'border-emerald-700 bg-emerald-50 text-emerald-900'
                    : 'border-gray-200 text-gray-600'
                }`}
              >
                {color}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity */}
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm flex justify-between items-center">
          <h3 className="text-xs font-bold text-gray-700">{lang === 'ha' ? 'Yawa (Quantity)' : 'Quantity'}</h3>
          <div className="flex items-center space-x-3">
            <button
              onClick={() => setQuantity(Math.max(1, quantity - 1))}
              className="w-8 h-8 bg-gray-100 rounded-lg text-gray-700 font-bold text-sm"
            >
              -
            </button>
            <span className="text-xs font-bold">{quantity}</span>
            <button
              onClick={() => setQuantity(quantity + 1)}
              className="w-8 h-8 bg-emerald-800 text-white rounded-lg font-bold text-sm"
            >
              +
            </button>
          </div>
        </div>

        {/* Description */}
        <div className="bg-white p-4 rounded-xl border border-gray-100 shadow-sm space-y-2">
          <h3 className="text-xs font-bold text-gray-700">{lang === 'ha' ? 'Bayanin Samfuri' : 'Product Description'}</h3>
          <p className="text-xs text-gray-600 leading-relaxed">{currentProduct.description}</p>
        </div>
      </div>

      {/* Action Buttons Fixed at Bottom */}
      <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-3 flex space-x-2 z-50">
        <button
          onClick={handleAddToCart}
          className="flex-1 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold text-xs rounded-xl transition"
        >
          🛒 {lang === 'ha' ? 'Saka a Kwando' : 'Add to Cart'}
        </button>
        <button
          onClick={handleBuyNow}
          className="flex-1 py-3 bg-emerald-800 hover:bg-emerald-900 text-white font-bold text-xs rounded-xl shadow-md transition"
        >
          ⚡ {lang === 'ha' ? 'Siya Yanzu' : 'Buy Now'}
        </button>
      </div>
    </div>
  );
}

export default ProductDetailsPage;
