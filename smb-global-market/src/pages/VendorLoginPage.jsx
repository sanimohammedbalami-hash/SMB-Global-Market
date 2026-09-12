import React, { useState } from 'react';

function VendorLoginPage({ onNavigate, lang }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onNavigate('vendor-dashboard');
  };

  return (
    <div className="bg-gray-50 min-h-screen max-w-md mx-auto p-4 flex flex-col justify-between">
      <div>
        <div className="text-center mt-6 mb-8">
          <div className="inline-flex items-center space-x-2 bg-emerald-800 text-white px-3 py-1.5 rounded-lg font-black text-lg shadow-sm mb-2">
            <span>🛒</span>
            <span>SMB GLOBAL MARKET</span>
          </div>
          <h2 className="text-lg font-bold text-gray-800 mt-2">
            {lang === 'ha' ? 'Shiga Shafin Mai Siyarwa' : 'Vendor Login'}
          </h2>
          <p className="text-xs text-gray-500">
            {lang === 'ha' ? 'Shiga domin gudanar da shagonsa, kayayyaki da kuɗaɗe' : 'Access your vendor dashboard'}
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              {lang === 'ha' ? 'Imeel ko Lambar Waya *' : 'Email or Phone Number *'}
            </label>
            <input
              type="text"
              required
              placeholder={lang === 'ha' ? 'Sanya imeel ko lamba' : 'Email or Phone Number'}
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-lg p-2.5 text-xs text-gray-800 focus:outline-none focus:border-emerald-700"
            />
          </div>

          <div>
            <label className="block text-xs font-bold text-gray-700 mb-1">
              {lang === 'ha' ? 'Makarfin Sirri (Password) *' : 'Password *'}
            </label>
            <input
              type="password"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-white border border-gray-300 rounded-lg p-2.5 text-xs text-gray-800 focus:outline-none focus:border-emerald-700"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-800 text-white font-bold py-3 rounded-lg text-xs hover:bg-emerald-700 shadow-sm transition"
          >
            {lang === 'ha' ? 'Shiga (Login)' : 'Login'}
          </button>
        </form>
      </div>

      <div className="text-center py-4">
        <p className="text-xs text-gray-600">
          {lang === 'ha' ? 'Baka da asusu da mu?' : "Don't have an account?"}{' '}
          <button
            onClick={() => onNavigate('vendor-register')}
            className="text-emerald-800 font-bold hover:underline"
          >
            {lang === 'ha' ? 'Yi Rajista Anan' : 'Register here'}
          </button>
        </p>
        <button
          onClick={() => onNavigate('home')}
          className="text-xs text-gray-500 mt-2 hover:underline block mx-auto"
        >
          {lang === 'ha' ? '← Komawa Babban Shafi' : '← Back to Home'}
        </button>
      </div>
    </div>
  );
}

export default VendorLoginPage;
