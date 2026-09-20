import { Link } from 'react-router-dom';
import { useExchangeRate, NgnTousd } from '../../hooks/useExchangeRate';

export default function ProductCard({ product }) {
  const rate = useExchangeRate();
  const image = product.product_images?.sort((a, b) => a.sort_order - b.sort_order)[0]?.url;
  const outOfStock = (product.inventory?.quantity ?? 0) <= 0;

  // Lissafin farashi daga USD zuwa NGN, da kuma riƙe USD a matsayin tushe
  const priceNgn = usdToNgn(product.price, rate);
  const priceUsd = Number(product.price || 0).toFixed(2);
  const comparePriceUsd = product.compare_at_price ? usdToNgn(product.compare_at_price, rate) : null;

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
          <span className="font-semibold text-brand-green text-base block">
            ₦{priceNgn}
          </span>
          <span className="text-xs text-gray-400 block">
            Est. ${priceUsd} USD
          </span>
          {product.compare_at_price && (
            <span className="text-xs text-gray-400 line-through block">
              ₦{comparePriceUsd}
            </span>
          )}
        </div>
        {outOfStock && <span className="text-xs text-red-500 mt-1 block">Out of stock</span>}
      </div>
    </Link>
  );
}
