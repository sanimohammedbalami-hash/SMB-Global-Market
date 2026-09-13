import React from 'react';
import { usePaystackPayment } from 'react-paystack';

const CheckoutButton = ({ amount = 5000, email = "customer@example.com" }) => {
  const config = {
    reference: (new Date()).getTime().toString(),
    email: email,
    amount: amount * 100,
    publicKey: import.meta.env.VITE_PAYSTACK_PUBLIC_KEY,
  };

  const onSuccess = (reference) => {
    alert("Biyan kuɗi ya yi nasara! Ref: " + reference.reference);
  };

  const onClose = () => {
    alert("Ka fasa yin biya.");
  };

  const initializePayment = usePaystackPayment(config);

  return (
    <button
      onClick={() => initializePayment(onSuccess, onClose)}
      style={{
        backgroundColor: '#09A5DB',
        color: '#ffffff',
        padding: '12px 24px',
        border: 'none',
        borderRadius: '6px',
        fontSize: '16px',
        fontWeight: 'bold',
        cursor: 'pointer',
        marginTop: '10px'
      }}
    >
      Biya Yanzu (Paystack Test)
    </button>
  );
};

export default CheckoutButton;

