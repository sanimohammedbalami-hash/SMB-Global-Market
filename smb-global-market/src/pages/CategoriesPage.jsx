import React, { useState } from 'react';

function CategoriesPage({ onNavigate, onBack, lang }) {
  const [selectedMainCat, setSelectedMainCat] = useState('Featured');

  const mainCategories = [
    { id: 'Featured', name: 'Featured', nameHa: 'Mafi Shara' },
    { id: 'Shadda', name: 'Shadda', nameHa: 'Shadda' },
    { id: 'Atamfa', name: 'Atamfa & Lace', nameHa: 'Atamfa da Lace' },
    { id: 'Bags', name: 'Bags & Luggage', nameHa: 'Jatuka' },
    { id: 'Watches', name: 'Watches & Jewelry', nameHa: 'Agogo da Ado' },
    { id: 'Shoes', name: 'Shoes & Footwear', nameHa: 'Takalma' },
    { id: 'Beauty', name: 'Beauty & Cosmetics', nameHa: 'Kwalliya da Turare' },
    { id: 'Electronics', name: 'Phones & Gadgets', nameHa: 'Wayoyi da Na'ura' },
  ];

  const categoryItems = {
    Featured: [
      { name: 'Shadda Materials', nameHa: 'Kayan Shadda', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=150&auto=format&fit=crop&q=60' },
      { name: 'Swiss Watches', nameHa: 'Agogon Swiss', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=150&auto=format&fit=crop&q=60' },
      { name: 'Ladies Handbags', nameHa: 'Jakar Mata', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=150&auto=format&fit=crop&q=60' },
      { name: 'Perfumes & Fragrance', nameHa: 'Turaruka', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=150&auto=format&fit=crop&q=60' },
      { name: 'Atamfa Wax', nameHa: 'Atamfa Wax', image: 'https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=150&auto=format&fit=crop&q=60' },
      { name: 'Lace Fabric', nameHa: 'Kayan Lace', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=150&auto=format&fit=crop&q=60' },
      { name: 'Gentlemen Shoes', nameHa: 'Takalmin Maza', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150&auto=format&fit=crop&q=60' },
      { name: 'Smartphones & Accessories', nameHa: 'Wayoyi', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=150&auto=format&fit=crop&q=60' },
    ],
    Shadda: [
      { name: 'Getzner Shadda', nameHa: 'Shadda Getzner', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=150&auto=format&fit=crop&q=60' },
      { name: 'Cotton Shadda', nameHa: 'Shadda Cotton', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=150&auto=format&fit=crop&q=60' },
      { name: 'White Brocade', nameHa: 'Fara Shadda', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=150&auto=format&fit=crop&q=60' },
    ],
    Atamfa: [
      { name: 'Super Wax Atamfa', nameHa: 'Atamfa Super Wax', image: 'https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=150&auto=format&fit=crop&q=60' },
      { name: 'French Lace', nameHa: 'Lace French', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=150&auto=format&fit=crop&q=60' },
      { name: 'Polyester Yard', nameHa: 'Yardi Polyester', image: 'https://images.unsplash.com/photo-1618932260643-eee4a2f652a6?w=150&auto=format&fit=crop&q=60' },
    ],
    Bags: [
      { name: 'Leather Handbags', nameHa: 'Jakar Fata', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=150&auto=format&fit=crop&q=60' },
      { name: 'Travel Luggage', nameHa: 'Akwatunan Tafiya', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=150&auto=format&fit=crop&q=60' },
    ],
    Watches: [
      { name: 'Men Steel Watches', nameHa: 'Agogon Karfe', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=150&auto=format&fit=crop&q=60' },
      { name: 'Ladies Gold Jewelry', nameHa: 'Sarkar Zinari', image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=150&auto=format&fit=crop&q=60' },
    ],
    Shoes: [
      { name: 'Casual Sneakers', nameHa: 'Sneakers', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150&auto=format&fit=crop&q=60' },
      { name: 'Official Leather Shoes', nameHa: 'Takalmin Ofis', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=150&auto=format&fit=crop&q=60' },
    ],
    Beauty: [
      { name: 'Perfumes & Body Spray', nameHa: 'Turarukan Jiki', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=150&auto=format&fit=crop&q=60' },
      { name: 'Makeup Sets', nameHa: 'Kayan Kwalliya', image: 'https://images.unsplash.com/photo-1541643600914-78b084683601?w=150&auto=format&fit=crop&q=60' },
    ],
    Electronics: [
      { name: 'Android & iPhones', nameHa: 'Wayoyi', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=150&auto=format&fit=crop&q=60' },
      { name: 'Wireless Headphones', nameHa: 'Hansfree', image: 'https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?w=150&auto=format&fit=crop&q=60' },
    ],
  };

  const currentItems = categoryItems[selectedMainCat] || categoryItems.Featured;

  return (
    <div className="bg-white min-h-screen pb-20 max-w-md mx-auto flex flex-col">
      {/* Top Banner Badge */}
      <div className="bg-emerald-50 px-3 py-1.5 flex items-center justify-between text-[11px] text-emerald-900 font-semibold border-b border-emerald-100">
        <div className="flex items-center space-x-1">
          <span className="text-xs">✓</span>
          <span>{lang === 'ha' ? 'Ingantattun Kayayyaki (Guaranteed Quality)' : 'Guaranteed Quality'}</span>
        </div>
        <div className="flex items-center space-x-1 text-gray-500">
          <span>|</span>
          <span>{lang === 'ha' ? 'Isar da Sauri' : 'Fast Delivery'}</span>
        </div>
      </div>

      {/* Search Header */}
      <div className="p-3 bg-white border-b border-gray-100 sticky top-0 z-20 flex items-center space-x-2">
        <button onClick={onBack} className="text-gray-600 font-bold text-lg pr-1">
          ←
        </button>
        <div className="relative flex-1">
          <input
            type="text"
            placeholder={lang === 'ha' ? 'Nemi rukunin kaya...' : 'Search categories...'}
            className="w-full bg-gray-100 text-gray-800 text-xs py-1.5 pl-8 pr-3 rounded-full focus:outline-none"
          />
          <span className="absolute left-2.5 top-1.5 text-gray-400 text-xs">🔍</span>
        </div>
      </div>

      {/* Main Layout: Left Sidebar + Right Grid */}
      <div className="flex flex-1 overflow-hidden">
        {/* Left Sidebar */}
        <div className="w-1/3 bg-gray-50 border-r border-gray-100 overflow-y-auto text-xs">
          {mainCategories.map((cat) => {
            const isSelected = selectedMainCat === cat.id;
            return (
              <button
                key={cat.id}
                onClick={() => setSelectedMainCat(cat.id)}
                className={`w-full py-3 px-2 text-left font-semibold transition-all border-l-4 ${
                  isSelected
                    ? 'bg-white text-emerald-800 font-black border-emerald-800 shadow-sm'
                    : 'text-gray-600 border-transparent hover:bg-gray-100'
                }`}
              >
                {lang === 'ha' ? cat.nameHa : cat.name}
              </button>
            );
          })}
        </div>

        {/* Right Content Grid */}
        <div className="w-2/3 p-3 overflow-y-auto">
          <div className="flex justify-between items-center mb-3 border-b pb-2">
            <h2 className="text-xs font-black text-gray-800 uppercase">
              {lang === 'ha' ? 'Rukuni' : 'Shop by Category'}
            </h2>
            <span className="text-[10px] text-emerald-700 font-bold">SMB Global</span>
          </div>

          <div className="grid grid-cols-3 gap-2">
            {currentItems.map((item, idx) => (
              <div
                key={idx}
                onClick={() => onNavigate('home')}
                className="flex flex-col items-center text-center cursor-pointer group"
              >
                <div className="w-14 h-14 rounded-full bg-emerald-50 border border-emerald-100 flex items-center justify-center p-1 overflow-hidden shadow-xs group-hover:scale-105 transition">
                  <span className="text-2xl">🛍️</span>
                </div>
                <span className="text-[10px] font-bold text-gray-700 mt-1 line-clamp-2 leading-tight">
                  {lang === 'ha' ? item.nameHa : item.name}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom Navigation */}
      <div className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white border-t border-gray-200 px-4 py-2 flex justify-around items-center z-30">
        <button onClick={() => onNavigate('home')} className="flex flex-col items-center text-gray-400 font-medium">
          <span className="text-base">🏠</span>
          <span className="text-[10px]">Home</span>
        </button>
        <button onClick={() => onNavigate('categories')} className="flex flex-col items-center text-emerald-800 font-bold">
          <span className="text-base">📁</span>
          <span className="text-[10px]">Categories</span>
        </button>
        <button onClick={() => onNavigate('cart')} className="flex flex-col items-center text-gray-400 font-medium relative">
          <span className="text-base">🛒</span>
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[8px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">2</span>
          <span className="text-[10px]">Cart</span>
        </button>
        <button onClick={() => onNavigate('orders')} className="flex flex-col items-center text-gray-400 font-medium relative">
          <span className="text-base">📦</span>
          <span className="absolute -top-1 -right-2 bg-red-500 text-white text-[8px] font-bold w-3.5 h-3.5 rounded-full flex items-center justify-center">3</span>
          <span className="text-[10px]">Orders</span>
        </button>
        <button onClick={() => onNavigate('account')} className="flex flex-col items-center text-gray-400 font-medium">
          <span className="text-base">👤</span>
          <span className="text-[10px]">Account</span>
        </button>
      </div>
    </div>
  );
}

export default CategoriesPage;
