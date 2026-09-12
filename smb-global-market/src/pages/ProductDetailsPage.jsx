import React from 'react';

function ProductDetailsPage({ product, onNavigate, lang }) {
  const item = product || { name: 'Smartwatch', nameHa: 'Agogo', price: '₦25,000', image: '⌚' };

  return (
    <div className="bg-white min-h-screen pb-20">
      <div className="p-4 flex justify-between items-center border-b">
        <button onClick={() => onNavigate('home')} className="text-emerald-800 font-bold text-xs">
          ‹ {lang === 'ha' ? 'Koma' : 'Back'}
        </button>
        <span className="text-xs font-bold">{lang === 'ha' ? 'Bayanin Samfur' : 'Product Details'}</span>
        <button className="text-xs">❤️</button>
      </div>

      <div className="bg-gray-50 p-12 flex justify-center text-8xl">
        {item.image}
      </div>

      <div className="p-5 space-y-4">
        <h2 className="text-base font-extrabold text-gray-800">{lang === 'ha' ? item.nameHa || item.name : item.name}</h2>
        <div className="flex justify-between items-center">
          <span className="text-lg font-black text-emerald-800">{item.price}</span>
          <span className="text-xs text-yellow-500 font-bold">⭐ 4.8 (120 Reviews)</span>
        </div>
        <p className="text-xs text-gray-500 leading-relaxed">
          {lang === 'ha'
            ? 'Wannan samfur ne mai kyau da inganci wanda ke zo da garantin shekara guda da aminci.'
            : 'High quality product with official warranty and fast shipping options available.'}
        </p>

        <div className="pt-6 space-y-2">
          <button onClick={() => onNavigate('checkout')} className="w-full bg-emerald-800 text-white font-bold py-3.5 rounded-xl text-xs shadow-md">
            {lang === 'ha' ? 'Saya Yanzu' : 'Buy Now'}
          </button>
          <button onClick={() => onNavigate('cart')} className="w-full border border-emerald-800 text-emerald-800 font-bold py-3 rounded-xl text-xs">
            {lang === 'ha' ? 'Sanya a Kwamfa' : 'Add to Cart'}
          </button>
        </div>
      </div>
    </div>
  );
}

export default ProductDetailsPage;
