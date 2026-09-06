import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getOrderById } from '../../services/orderService';

const TIMELINE = ['pending', 'confirmed', 'processing', 'shipped', 'delivered'];

export default function OrderDetail() {
  const { id } = useParams();
  const [order, setOrder] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    getOrderById(id).then(setOrder).catch((e) => setError(e.message));
  }, [id]);

  if (error) return <div className="p-8 text-center text-red-500">{error}</div>;
  if (!order) return <div className="p-8 text-center text-gray-400">Loading order...</div>;

  const currentStep = TIMELINE.indexOf(order.order_status);

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-xl font-bold mb-1">Order #{order.id.slice(0, 8)}</h1>
      <p className="text-sm text-gray-500 mb-6">Sold by {order.vendor?.business_name}</p>

      {order.order_status !== 'cancelled' && order.order_status !== 'refunded' && (
        <div className="flex justify-between mb-8 text-xs">
          {TIMELINE.map((step, i) => (
            <div key={step} className={`flex-1 text-center ${i <= currentStep ? 'text-brand-green font-medium' : 'text-gray-300'}`}>
              <div className={`w-3 h-3 rounded-full mx-auto mb-1 ${i <= currentStep ? 'bg-brand-green' : 'bg-gray-200'}`} />
              {step}
            </div>
          ))}
        </div>
      )}

      <div className="card p-4 mb-4">
        <h2 className="font-medium mb-2">Items</h2>
        {order.order_items.map((item) => (
          <div key={item.id} className="flex justify-between text-sm py-1">
            <span>{item.product_name_snapshot} × {item.quantity}</span>
            <span>₦{Number(item.line_total).toLocaleString()}</span>
          </div>
        ))}
        <div className="border-t mt-2 pt-2 flex justify-between font-semibold">
          <span>Total</span><span>₦{Number(order.total_amount).toLocaleString()}</span>
        </div>
      </div>

      <div className="card p-4 mb-4 text-sm">
        <h2 className="font-medium mb-2">Delivery Address</h2>
        {order.address ? (
          <p>{order.address.full_name}, {order.address.street_address}, {order.address.city}, {order.address.state}</p>
        ) : (
          <p className="text-gray-400">No address on file.</p>
        )}
      </div>

      <div className="card p-4 text-sm flex justify-between">
        <span>Payment status</span>
        <span className="font-medium uppercase">{order.payment_status}</span>
      </div>
    </div>
  );
}
