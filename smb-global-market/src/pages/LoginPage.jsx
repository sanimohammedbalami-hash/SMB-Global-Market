import React, { useState } from 'react';

function LoginPage({ onLogin, onGoToRegister, lang }) {
  const [identifier, setIdentifier] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (identifier && password) {
      onLogin(identifier);
    } else {
      alert(lang === 'ha' ? 'Tabbatar ka cika lambar waya/email da password' : 'Please enter phone/email and password');
    }
  };

  return (
    <div className="min-h-screen bg-emerald-900 flex flex-col justify-center p-6 max-w-md mx-auto text-white">
      <div className="bg-white text-gray-800 p-6 rounded-3xl shadow-2xl space-y-5">
        <div className="text-center">
          <div className="w-16 h-16 bg-emerald-100 text-emerald-800 rounded-2xl flex items-center justify-center text-3xl font-bold mx-auto mb-3">
            🛒
          </div>
          <h2 className="text-xl font-black text-gray-800">
            {lang === 'ha' ? 'Shiga Barka da Zuwa' : 'Welcome Back'}
          </h2>
          <p className="text-xs text-gray-400 mt-1">SMB Global Market</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-xs font-bold text-gray-600 block mb-1">
              {lang === 'ha' ? 'Lambar Waya ko Email' : 'Phone Number or Email'}
            </label>
            <input
              type="text"
              value={identifier}
              onChange={(e) => setIdentifier(e.target.value)}
              placeholder="09025777951"
              className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-emerald-800 bg-gray-50 text-gray-900"
              required
            />
          </div>

          <div>
            <label className="text-xs font-bold text-gray-600 block mb-1">
              {lang === 'ha' ? 'Mabuɗi (Password)' : 'Password'}
            </label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
              className="w-full border border-gray-200 rounded-xl px-3.5 py-2.5 text-xs focus:outline-none focus:border-emerald-800 bg-gray-50 text-gray-900"
              required
            />
          </div>

          <button
            type="submit"
            className="w-full bg-emerald-800 text-white font-bold py-3.5 rounded-xl text-xs shadow-lg hover:bg-emerald-900 transition"
          >
            {lang === 'ha' ? 'Shiga (Sign In)' : 'Sign In'}
          </button>
        </form>

        <div className="text-center pt-2 border-t border-gray-100">
          <p className="text-xs text-gray-500">
            {lang === 'ha' ? 'Baka da asusu?' : "Don't have an account?"}{' '}
            <button onClick={onGoToRegister} className="text-emerald-800 font-bold hover:underline">
              {lang === 'ha' ? 'Yi Rijista Yanzu' : 'Register Now'}
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
