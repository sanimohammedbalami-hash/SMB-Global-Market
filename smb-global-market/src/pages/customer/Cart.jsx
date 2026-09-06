import { Link } from 'react-router-dom';
import { useCart } from '../../contexts/CartContext';
import { computeDisplayTotals } from '../../services/cartService';

export default function Cart() {
  const { items, loading, updateQuantity, removeItem } = useCart();

  if (loading) return <div className="p-8 text-center text-gray-400">Loading cart...</div>;
  if (items.length === 0) {
    return (
      <div className="p-16 text-center">
        <p className="text-gray-500 mb-4">Your cart is empty.</p>
        <Link to="/" className="btn-primary">Continue shopping</Link>
      </div>
    );
  }

  const { subtotal, total } = computeDisplayTotals(items, 0);

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-xl font-bold mb-6">Your Cart</h1>
      <div className="space-y-4">
        {items.map((item) => {
          const stock = item.product.inventory?.quantity ?? 0;
          return (
            <div key={item.id} className="card p-4 flex items-center gap-4">
              <div className="w-16 h-16 bg-gray-100 rounded-md flex-shrink-0" />
              <div className="flex-1">
                <p className="font-medium">{item.product.name}</p>
                <p className="text-sm text-gray-500">{item.product.vendor?.business_name}</p>
                {item.quantity > stock && <p className="text-xs text-red-500">Only {stock} left in stock</p>}
              </div>
              <input
                type="number"
                min={1}
                max={stock}
                value={item.quantity}
                onChange={(e) => updateQuantity(item.id, Number(e.target.value))}
                className="input w-16"
              />
              <p className="w-24 text-right font-medium">
                {item.product.currency} {(item.product.price * item.quantity).toLocaleString()}
              </p>
              <button onClick={() => removeItem(item.id)} className="text-red-500 text-sm">Remove</button>
            </div>
          );
        })}
      </div>

      <div className="card p-4 mt-6 max-w-sm ml-auto space-y-2">
        <div className="flex justify-between text-sm"><span>Subtotal</span><span>₦{subtotal.toLocaleString()}</span></div>
        <p className="text-xs text-gray-400">Delivery fee and final total are calculated at checkout.</p>
        <div className="flex justify-between font-semibold text-lg"><span>Estimated total</span><span>₦{total.toLocaleString()}</span></div>
        <Link to="/checkout" className="btn-primary w-full block text-center mt-2">Proceed to Checkout</Link>
      </div>
    </div>
  );
}
