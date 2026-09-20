import { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { getProductById } from '../../services/productService';
import { useCart } from '../../contexts/CartContext';
import { useAuth } from '../../contexts/AuthContext';
import { useExchangeRate, usdToNgn } from '../../hooks/useExchangeRate';

export default function ProductDetail() {
  const { id } = useParams();
  const { isAuthenticated } = useAuth();
  const { addItem } = useCart();
  const rate = useExchangeRate();
  const [product, setProduct] = useState(null);
  const [qty, setQty] = useState(1);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  useEffect(() => {
    setLoading(true);
    getProductById(id)
      .then(setProduct)
      .catch((e) => setError(e.message))
      .finally(() => setLoading(false));
  }, [id]);

  async function handleAddToCart() {
    if (!isAuthenticated) return setMessage('Please sign in to add items to your cart.');
    try {
      await addItem(product.id, qty);
      setMessage('Added to cart.');
    } catch (e) {
      setMessage(e.message);
    }
  }

  if (loading) return <div className="p-8 text-center text-gray-400">Loading product...</div>;
  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!product) return <div className="p-8 text-center text-gray-400">Product not found.</div>;

  const stock = product.inventory?.quantity ?? 0;
  const image = product.product_images?.[0]?.url;
  
  // Maida Dala ($) matsayin Babban Farashi da Naira (₦) matsayin Kiyasi
  const priceUsd = Number(product.price || 0).toFixed(2);
  const priceNgn = usdToNgn(product.price, rate);

  return (
    <div className="max-w-5xl mx-auto px-4 py-8 grid md:grid-cols-2 gap-8">
      <div className="aspect-square bg-gray-100 rounded-xl flex items-center justify-center overflow-hidden">
        {image ? <img src={image} alt={product.name} className="w-full h-full object-cover" /> : <span className="text-gray-400">No image</span>}
      </div>
      <div>
        <Link to={`/categories?cat=${product.category?.id}`} className="text-sm text-brand-green">{product.category?.name}</Link>
        <h1 className="text-2xl font-bold mt-1">{product.name}</h1>
        <p className="text-sm text-gray-500 mt-1">Sold by {product.vendor?.business_name}</p>
        
        <div className="mt-4">
          {/* Babban Farashi a Dala */}
          <p className="text-2xl font-semibold text-brand-green">
            ${priceUsd} USD
          </p>
          {/* Kiyasin Farashi a Naira */}
          <p className="text-sm text-gray-500 mt-0.5">
            Est. ₦{priceNgn}
          </p>
        </div>

        <p className="mt-4 text-gray-700 whitespace-pre-line">{product.description}</p>

        {stock <= 0 ? (
          <p className="mt-6 text-red-500 font-medium">Out of stock</p>
        ) : (
          <div className="mt-6 flex items-center gap-3">
            <input
              type="number"
              min={1}
              max={stock}
              value={qty}
              onChange={(e) => setQty(Math.max(1, Math.min(stock, Number(e.target.value))))}
              className="input w-20"
            />
            <button className="btn-primary" onClick={handleAddToCart}>Add to Cart</button>
            <Link to="/checkout" className="btn-secondary">Buy Now</Link>
          </div>
        )}
        {message && <p className="mt-3 text-sm text-gray-600">{message}</p>}
      </div>
    </div>
  );
}
