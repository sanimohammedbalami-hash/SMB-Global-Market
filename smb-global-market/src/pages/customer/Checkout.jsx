import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabaseClient';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import { initializeCheckout } from '../../services/paymentService';

export default function Checkout() {
  const { profile } = useAuth();
  const { items } = useCart();
  const [addresses, setAddresses] = useState([]);
  const [selectedAddress, setSelectedAddress] = useState('');
  const [newAddress, setNewAddress] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!profile) return;
    supabase.from('addresses').select('*').eq('profile_id', profile.id).then(({ data }) => setAddresses(data || []));
  }, [profile]);

  async function handlePay() {
    setError(null);
    let addressId = selectedAddress;
    try {
      if (!addressId && newAddress) {
        const { data, error: addrErr } = await supabase
          .from('addresses')
          .insert({ profile_id: profile.id, ...newAddress })
          .select()
          .single();
        if (addrErr) throw addrErr;
        addressId = data.id;
      }
      if (!addressId) return setError('Please select or add a delivery address.');

      setSubmitting(true);
      // Everything about the amount charged is recalculated server-side here —
      // this call sends only the address, never a price.
      const { authorization_url } = await initializeCheckout(addressId);
      window.location.href = authorization_url;
    } catch (e) {
      setError(e.message);
    } finally {
      setSubmitting(false);
    }
  }

  if (items.length === 0) return <div className="p-16 text-center text-gray-500">Your cart is empty.</div>;

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      <h1 className="text-xl font-bold mb-6">Checkout</h1>

      <h2 className="font-medium mb-2">Delivery Address</h2>
      {addresses.map((a) => (
        <label key={a.id} className="card p-3 flex items-center gap-3 mb-2 cursor-pointer">
          <input type="radio" name="address" checked={selectedAddress === a.id} onChange={() => { setSelectedAddress(a.id); setNewAddress(null); }} />
          <span className="text-sm">{a.full_name}, {a.street_address}, {a.city}, {a.state}</span>
        </label>
      ))}

      <details className="mt-3">
        <summary className="text-brand-green cursor-pointer text-sm">+ Add a new address</summary>
        <AddressForm onChange={(a) => { setNewAddress(a); setSelectedAddress(''); }} />
      </details>

      <div className="card p-4 mt-6">
        <h2 className="font-medium mb-2">Order Summary</h2>
        {items.map((i) => (
          <div key={i.id} className="flex justify-between text-sm py-1">
            <span>{i.product.name} × {i.quantity}</span>
            <span>₦{(i.product.price * i.quantity).toLocaleString()}</span>
          </div>
        ))}
        <p className="text-xs text-gray-400 mt-2">Final total (including delivery and any fees) is verified by the server before payment is created.</p>
      </div>

      {error && <p className="text-red-500 text-sm mt-3">{error}</p>}
      <button className="btn-primary w-full mt-4" disabled={submitting} onClick={handlePay}>
        {submitting ? 'Preparing payment...' : 'Pay with Paystack'}
      </button>
    </div>
  );
}

function AddressForm({ onChange }) {
  const [form, setForm] = useState({ full_name: '', phone: '', country: 'Nigeria', state: '', city: '', street_address: '' });

  function update(field, value) {
    const next = { ...form, [field]: value };
    setForm(next);
    onChange(next);
  }

  return (
    <div className="grid grid-cols-2 gap-2 mt-2">
      <input className="input col-span-2" placeholder="Full name" value={form.full_name} onChange={(e) => update('full_name', e.target.value)} />
      <input className="input col-span-2" placeholder="Phone" value={form.phone} onChange={(e) => update('phone', e.target.value)} />
      <input className="input" placeholder="State" value={form.state} onChange={(e) => update('state', e.target.value)} />
      <input className="input" placeholder="City" value={form.city} onChange={(e) => update('city', e.target.value)} />
      <input className="input col-span-2" placeholder="Street address" value={form.street_address} onChange={(e) => update('street_address', e.target.value)} />
    </div>
  );
}
