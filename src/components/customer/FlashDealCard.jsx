// src/components/customer/FlashDealCard.jsx
import { Link } from 'react-router-dom';

export default function FlashDealCard({ product }) {
  const image = product.product_images?.sort((a, b) => a.sort_order - b.sort_order)[0]?.url;
  const price = Number(product.price);
  const wasPrice = Number(product.compare_at_price);
  const pctOff = wasPrice > 0 ? Math.round(((wasPrice - price) / wasPrice) * 100) : 0;

  return (
    <Link to={`/product/${product.id}`} className="card overflow-hidden hover:shadow-md transition block relative">
      {pctOff > 0 && (
        <span className="absolute top-2 left-2 z-10 bg-red-500 text-white text-xs font-semibold px-2 py-0.5 rounded">
          -{pctOff}%
        </span>
      )}
      <div className="aspect-square bg-gray-100 flex items-center justify-center overflow-hidden">
        {image ? (
          <img src={image} alt={product.name} className="w-full h-full object-cover" />
        ) : (
          <span className="text-gray-400 text-sm">No image</span>
        )}
      </div>
      <div className="p-3">
        <h3 className="font-medium text-gray-800 truncate text-sm">{product.name}</h3>
        <div className="flex items-center gap-2 mt-1 flex-wrap">
          <span className="font-semibold text-brand-green text-sm">
            {product.currency} {price.toLocaleString()}
          </span>
          {wasPrice > 0 && (
            <span className="text-xs text-gray-400 line-through">
              {product.currency} {wasPrice.toLocaleString()}
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}
