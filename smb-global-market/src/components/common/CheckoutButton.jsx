import { usePaystackPayment } from 'react-paystack';

export default function CheckoutButton({ amount, email, onSuccess, publicKey }) {
  const config = {
    reference: (new Date()).getTime().toString(),
    email: email || 'customer@smbglobalmarket.com',
    amount: Math.round(Number(amount) * 100), // Paystack yana karbar kudi ne a kobo/cents
    publicKey: publicKey || import.meta.env.VITE_PAYSTACK_PUBLIC_KEY || 'pk_test_placeholder',
  };

  const initializePayment = usePaystackPayment(config);

  return (
    <div>
      <button
        type="button"
        onClick={() => {
          initializePayment({
            onSuccess: (reference) => {
              if (onSuccess) onSuccess(reference);
            },
            onClose: () => {
              alert('An soke biyan kuɗin.');
            },
          });
        }}
        className="btn-primary w-full py-3 font-semibold text-white bg-green-600 hover:bg-green-700 rounded-lg transition shadow-md"
      >
        Pay with Paystack (${amount})
      </button>
    </div>
  );
}
