import { useState } from 'react';
import { MessageCircle, X, Send } from 'lucide-react';

const FAQ = [
  { keywords: ['pay', 'payment', 'paystack', 'biya'], answer: 'We accept payments via Paystack (debit/credit cards, bank transfer). Your order total is confirmed securely before payment.' },
  { keywords: ['order', 'track', 'delivery', 'ina order'], answer: 'You can check your order status anytime under "My Orders" in your profile menu.' },
  { keywords: ['vendor', 'sell', 'become a vendor'], answer: 'To become a vendor, go to "Become a Vendor" from the login page and submit your business details. Approval usually takes a short review period.' },
  { keywords: ['password', 'forgot', 'reset'], answer: 'You can reset your password from the "Forgot password?" link on the sign-in page.' },
  { keywords: ['return', 'refund'], answer: 'Returns are accepted within the policy period stated on your order. Contact us for help with a specific order.' },
  { keywords: ['cancel'], answer: 'To cancel an order, please contact support with your order number as soon as possible.' }
];

function findAnswer(text) {
  const lower = text.toLowerCase();
  const match = FAQ.find((f) => f.keywords.some((k) => lower.includes(k)));
  return match ? match.answer : null;
}

export default function SupportChat() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { from: 'bot', text: 'Hi! Ask me about orders, payments, becoming a vendor, or returns.' }
  ]);
  const [input, setInput] = useState('');

  function handleSend(e) {
    e.preventDefault();
    if (!input.trim()) return;
    const userMsg = { from: 'user', text: input };
    const answer = findAnswer(input);
    const botMsg = {
      from: 'bot',
      text: answer || "I'm not sure about that one. Please reach out to us directly via email or WhatsApp on our Contact Us page and our team will help you."
    };
    setMessages((m) => [...m, userMsg, botMsg]);
    setInput('');
  }

  return (
    <>
      {open && (
        <div className="fixed bottom-20 right-4 w-72 bg-white rounded-xl shadow-2xl border border-gray-200 flex flex-col z-50 max-h-96">
          <div className="bg-brand-green text-white px-4 py-3 rounded-t-xl flex justify-between items-center">
            <span className="font-medium text-sm">SMB Support</span>
            <button onClick={() => setOpen(false)}><X className="w-4 h-4" /></button>
          </div>
          <div className="flex-1 overflow-y-auto p-3 space-y-2">
            {messages.map((m, i) => (
              <div key={i} className={`text-xs p-2 rounded-lg max-w-[85%] ${m.from === 'bot' ? 'bg-gray-100 text-gray-700' : 'bg-brand-green text-white ml-auto'}`}>
                {m.text}
              </div>
            ))}
          </div>
          <form onSubmit={handleSend} className="flex border-t border-gray-100 p-2 gap-1">
            <input
              className="flex-1 text-xs px-2 py-1.5 border border-gray-200 rounded-lg outline-none"
              placeholder="Type your question..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
            />
            <button type="submit" className="bg-brand-green text-white rounded-lg px-2">
              <Send className="w-4 h-4" />
            </button>
          </form>
        </div>
      )}
      <button
        onClick={() => setOpen(!open)}
        className="fixed bottom-20 right-4 bg-brand-green text-white rounded-full w-12 h-12 flex items-center justify-center shadow-lg z-50"
      >
        <MessageCircle className="w-5 h-5" />
      </button>
    </>
  );
          }
