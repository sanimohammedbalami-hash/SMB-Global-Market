import { Link } from 'react-router-dom';
import { useExchangeRate, usdToNgn } from '../../hooks/useExchangeRate';

export default function ProductCard({ product }) {
  const rate = useExchangeRate();
  const image = product.product_images?.sort((a, b) => a.sort_order - b.sort_order)[0]?.url;
  const outOfStock = (product.inventory?.quantity ?? 0) <= 0;

  // Tsara farashi a Dala ($) a matsayin babban kuɗi da Naira (₦) a matsayin kiyasi
  const priceUsd = Number(product.price || 0).toFixed(2);
  const priceNgn = usdToNgn(product.price, rate);

  const comparePriceUsd = product.compare_at_price ? Number(product.compare_at_price).toFixed(2) : null;

  return (
    <Link to={`/product/${product.id}`} className="card overflow-hidden hover:shadow-md transition block">
      <div className="aspect-square bg-gray-100 flex items-center justify-center overflow-hidden">
        {image ? (
          <img src={image} alt={product.name} className="w-full h-full object-cover" />
        ) : (
          <span className="text-gray-400 text-sm">No image</span>
        )}
      </div>
      <div className="p-3">
        <p className="text-sm text-gray-500 truncate">{product.vendor?.business_name}</p>
        <h3 className="font-medium text-brand-navy truncate">{product.name}</h3>
        <div className="mt-1">
          {/* Babban Farashi a Dala */}
          <span className="font-semibold text-brand-green text-base block">
            ${priceUsd} USD
          </span>
          {/* Kiyasin Farashi a Naira */}
          <span className="text-xs text-gray-500 block">
            Est. ₦{priceNgn}
          </span>
          {/* Tsohon Farashi/Ragi a Dala */}
          {comparePriceUsd && (
            <span className="text-xs text-gray-400 line-through block">
              ${comparePriceUsd} USD
            </span>
          )}
        </div>
        {outOfStock && <span className="text-xs text-red-500 mt-1 block">Out of stock</span>}
      </div>
    </Link>
  );
}
